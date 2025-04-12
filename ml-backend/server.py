from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

from sklearn.metrics import classification_report, accuracy_score,confusion_matrix,precision_score,recall_score,f1_score


# Load models and encoders
disease_model = joblib.load("assets/disease_model.pkl")
outbreak_model = joblib.load("assets/outbreak_model.pkl")
le_disaster = joblib.load("assets/le_disaster.pkl")
le_disease = joblib.load("assets/le_disease.pkl")
scaler_disease = joblib.load("assets/scaler_disease.pkl")
scaler_outbreak = joblib.load("assets/scaler_outbreak.pkl")
X_d_test, y_d_test = joblib.load("assets/disease_test_data.pkl")
X_o_test,y_o_test = joblib.load("assets/outbreak_test_data.pkl")

# Define required features
features = ['Disaster_Type_Encoded', 'Temperature', 'Rainfall', 'Humidity', 'Population_Density', 'Healthcare_Access']

# Create Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/disaster-types", methods=["GET"])
def get_disaster_types():
    disaster_types = list(le_disaster.classes_)
    return jsonify({
        "disaster_types": disaster_types
    })

@app.route("/predict-disease", methods=["POST"])
def predict_disease():
    data = request.json

    # Validate input
    if "Disaster_Type" not in data:
        return jsonify({"error": "Disaster_Type is required"}), 400

    try:
        # Encode Disaster Type
        disaster_type = data["Disaster_Type"]
        if disaster_type not in le_disaster.classes_:
            return jsonify({"error": f"Invalid Disaster_Type: {disaster_type}"}), 400

        encoded_disaster = le_disaster.transform([disaster_type])[0]

        # Default values for other features
        temp_df = pd.DataFrame([{
            'Disaster_Type_Encoded': encoded_disaster,
            'Temperature': data.get('Temperature', 30),
            'Rainfall': data.get('Rainfall', 200),
            'Humidity': data.get('Humidity', 70),
            'Population_Density': data.get('Population_Density', 1000),
            'Healthcare_Access': data.get('Healthcare_Access', 3)
        }])

        # Scale non-categorical features
        temp_df[features[1:]] = scaler_disease.transform(temp_df[features[1:]])

        # Predict top 5 diseases
        probs = disease_model.predict_proba(temp_df)[0]
        top_indices = np.argsort(probs)[-5:][::-1]
        top_diseases = le_disease.inverse_transform(top_indices)

        return jsonify({
            "Disaster_Type": disaster_type,
            "Predicted_Diseases": top_diseases.tolist()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/predict-outbreak", methods=["POST"])
def predict_outbreak():
    data = request.get_json()

    required_fields = ["Disaster_Type", "Temperature", "Rainfall", "Humidity",
                       "Population_Density", "Healthcare_Access", "Disease_Type"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    # Get values
    disaster = data["Disaster_Type"]
    disease = data["Disease_Type"]

    if disaster not in le_disaster.classes_:
        return jsonify({"error": f"Invalid Disaster_Type: {disaster}"}), 400
    if disease not in le_disease.classes_:
        return jsonify({"error": f"Invalid Disease_Type: {disease}"}), 400

    # Encode categorical fields
    encoded_disaster = le_disaster.transform([disaster])[0]
    encoded_disease = le_disease.transform([disease])[0]

    try:
        temp = float(data["Temperature"])
        rain = float(data["Rainfall"])
        hum = float(data["Humidity"])
        pop = float(data["Population_Density"])
        health = float(data["Healthcare_Access"])
    except:
        return jsonify({"error": "Temperature, Rainfall, Humidity, Population_Density, and Healthcare_Access must be numeric."}), 400

    input_df = pd.DataFrame([{
        'Disaster_Type_Encoded': encoded_disaster,
        'Temperature': temp,
        'Rainfall': rain,
        'Humidity': hum,
        'Population_Density': pop,
        'Healthcare_Access': health,
        'Disease_Encoded': encoded_disease
    }])

    # Scale features (except encoded categorical)
    input_df[features[1:]] = scaler_outbreak.transform(input_df[features[1:]])

    # Predict
    if 1 in outbreak_model.classes_:
        pred = outbreak_model.predict(input_df)[0]
        prob = outbreak_model.predict_proba(input_df)[0][list(outbreak_model.classes_).index(1)]
        return jsonify({
            "Disease": disease,
            "Disaster_Type": disaster,
            "Prediction": "Outbreak Likely" if pred == 1 else "No Outbreak",
            "Probability": round(prob, 2)
        })
    else:
        return jsonify({"error": "Outbreak model is not trained on both classes."}), 500
    
@app.route('/disease/accuracy', methods=['GET'])
def disease_model_report_accuracy():
    y_d_pred = disease_model.predict(X_d_test)

    report = classification_report(
        y_d_test,
        y_d_pred,
        target_names=le_disease.inverse_transform(sorted(set(y_d_test))),
        output_dict=True
    )
    accuracy = accuracy_score(y_d_test, y_d_pred)

    return jsonify({
        "accuracy": accuracy,
        "report": report
    })
    
@app.route('/outbreak/accuracy', methods=['GET'])
def outbreak_model_report_accuracy():
    y_o_pred = outbreak_model.predict(X_o_test)

    report = classification_report(
        y_o_test,
        y_o_pred,
        target_names=["No Outbreak", "Outbreak"],
        output_dict=True
    )
    accuracy = accuracy_score(y_o_test, y_o_pred)

    return jsonify({
        "accuracy": accuracy,
        "report": report
    })
    

if __name__ == "__main__":
    app.run(debug=True)
