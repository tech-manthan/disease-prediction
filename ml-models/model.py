# Step 0: Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE, RandomOverSampler
import warnings
warnings.filterwarnings('ignore')

# Step 1: Load and preprocess dataset
df = pd.read_csv("disaster_dataset_updated.csv")

# Step 2: Label Encoding
df['Disaster_Type_Encoded'] = LabelEncoder().fit_transform(df['Disaster_Type'])
df['Disease_Type_Encoded'] = LabelEncoder().fit_transform(df['Disease_Type'])
le_disaster = LabelEncoder().fit(df['Disaster_Type'])
le_disease = LabelEncoder().fit(df['Disease_Type'])
df['Disaster_Type_Encoded'] = le_disaster.transform(df['Disaster_Type'])
df['Disease_Type_Encoded'] = le_disease.transform(df['Disease_Type'])

# Step 3: Feature list
features = ['Disaster_Type_Encoded', 'Temperature', 'Rainfall', 'Humidity',
            'Population_Density', 'Healthcare_Access']

# Step 4: Train Disease Predictor (with SMOTE)
df_disease = df[df['Disease_Reported'] == 1]
X_disease = df_disease[features]
y_disease = df_disease['Disease_Type_Encoded']
scaler_disease = StandardScaler()
X_disease_scaled = X_disease.copy()
X_disease_scaled[features[1:]] = scaler_disease.fit_transform(X_disease[features[1:]])
smote = SMOTE(random_state=42)
X_d_bal, y_d_bal = smote.fit_resample(X_disease_scaled, y_disease)
disease_model = RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42, max_depth=20)
disease_model.fit(X_d_bal, y_d_bal)

# Step 5: Ensure both classes exist for outbreak prediction
df['Disease_Encoded'] = df['Disease_Type_Encoded']
outbreak_features = features + ['Disease_Encoded']
X_outbreak = df[outbreak_features]
y_outbreak = df['Disease_Reported']
print("Outbreak class distribution:")
print(y_outbreak.value_counts())

# Manually add synthetic rows if only one class is present
if y_outbreak.nunique() == 1:
    print("⚠️ Only one class present in outbreak data. Adding synthetic rows.")
    synthetic_df = df.sample(10).copy()
    synthetic_df['Disease_Reported'] = 1 - synthetic_df['Disease_Reported']
    df = pd.concat([df, synthetic_df], ignore_index=True)
    X_outbreak = df[outbreak_features]
    y_outbreak = df['Disease_Reported']

# Now proceed with scaling and training
scaler_outbreak = StandardScaler()
X_outbreak_scaled = X_outbreak.copy()
X_outbreak_scaled[features[1:]] = scaler_outbreak.fit_transform(X_outbreak[features[1:]])
ros = RandomOverSampler(random_state=42)
X_o_bal, y_o_bal = ros.fit_resample(X_outbreak_scaled, y_outbreak)
outbreak_model = RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42,max_depth=25)
outbreak_model.fit(X_o_bal, y_o_bal)

# Step 6: Add Symptom-Based Disease Classifier
symptom_map = {
    "fever": ["Dengue", "Malaria", "Typhoid", "Leptospirosis", "Hepatitis A"],
    "vomiting": ["Cholera", "Typhoid", "Leptospirosis", "Heat Stroke"],
    "rash": ["Dengue"],
    "jaundice": ["Hepatitis A", "Leptospirosis"],
    "diarrhea": ["Cholera", "Typhoid", "Hepatitis A"],
    "chills": ["Malaria", "Leptospirosis"],
    "body pain": ["Dengue", "Malaria", "Leptospirosis"],
    "dehydration": ["Cholera", "Heat Stroke", "Dehydration"],
    "cough": ["Respiratory Infection"],
    "shortness of breath": ["Respiratory Infection"],
    "wound infection": ["Injury-related Infection"],
    "fatigue": ["Typhoid", "Hepatitis A", "Dehydration"],
    "high body temperature": ["Heat Stroke"],
    "muscle pain": ["Dengue", "Malaria", "Leptospirosis"]
}

def predict_disease_from_symptoms(symptoms):
    disease_votes = {}
    for symptom in symptoms:
        for disease in symptom_map.get(symptom.lower(), []):
            disease_votes[disease] = disease_votes.get(disease, 0) + 1
    if not disease_votes:
        return []
    # Sort diseases by vote count descending
    sorted_diseases = sorted(disease_votes.items(), key=lambda x: x[1], reverse=True)
    return [d for d, _ in sorted_diseases]

# Step 7: Final Input and Prediction Flow
def interactive_prediction():
    use_symptoms = input("Do you want to enter symptoms to predict the disease? (yes/no): ").strip().lower()
    encoded_disaster = 0  # Default value if not provided

    if use_symptoms == 'yes':
        symptoms = input("Enter symptoms separated by commas (e.g., fever,vomiting): ").strip().split(',')
        predicted_diseases = predict_disease_from_symptoms([s.strip() for s in symptoms])
        if not predicted_diseases:
            print("❌ Unable to identify diseases from given symptoms.")
            return

        print("\n✅ Predicted Diseases from Symptoms:")
        for i, disease in enumerate(predicted_diseases, 1):
            print(f"{i}. {disease}")
        selected_disease = input("\nEnter disease from the above list: ").strip()
        if selected_disease not in predicted_diseases:
            print("❌ Invalid disease selection.")
            return

        # (Optional) Let user optionally pick disaster type even if using symptoms
        print("\n🌪️ Optional: Select Disaster Type (or press Enter to skip)")
        for dt in le_disaster.classes_:
            print("-", dt)
        disaster_type = input("\nEnter disaster type (optional): ").strip()
        if disaster_type in le_disaster.classes_:
            encoded_disaster = le_disaster.transform([disaster_type])[0]

    else:
        print("\n🌪️ Available Disaster Types:")
        for dt in le_disaster.classes_:
            print("-", dt)
        disaster_type = input("\nEnter disaster type: ").strip()
        if disaster_type not in le_disaster.classes_:
            print("❌ Invalid disaster type.")
            return

        encoded_disaster = le_disaster.transform([disaster_type])[0]
        temp_df = pd.DataFrame([{
            'Disaster_Type_Encoded': encoded_disaster,
            'Temperature': 30,
            'Rainfall': 250,
            'Humidity': 75,
            'Population_Density': 1000,
            'Healthcare_Access': 3
        }])
        temp_df[features[1:]] = scaler_disease.transform(temp_df[features[1:]])
        probs = disease_model.predict_proba(temp_df)[0]
        top_indices = np.argsort(probs)[-5:][::-1]
        top_diseases = le_disease.inverse_transform(top_indices)

        print(f"\n🔮 Predicted Diseases Likely After {disaster_type}")
        for i, disease in enumerate(top_diseases, 1):
            print(f"{i}. {disease}")

        selected_disease = input("\nEnter disease from above list: ").strip()
        if selected_disease not in le_disease.classes_:
            print("❌ Invalid disease name.")
            return

    encoded_disease = le_disease.transform([selected_disease])[0]

    try:
        temp = float(input("🌡️ Temperature (°C): "))
        rain = float(input("🌧️ Rainfall (mm): "))
        hum = float(input("💧 Humidity (%): "))
        pop = float(input("👥 Population Density (/km²): "))
        health = float(input("🏥 Healthcare Access (1–5): "))
    except:
        print("❌ Please enter valid numeric inputs.")
        return

    final_input = pd.DataFrame([{
        'Disaster_Type_Encoded': encoded_disaster,
        'Temperature': temp,
        'Rainfall': rain,
        'Humidity': hum,
        'Population_Density': pop,
        'Healthcare_Access': health,
        'Disease_Encoded': encoded_disease
    }])
    final_input[features[1:]] = scaler_outbreak.transform(final_input[features[1:]])

    if outbreak_model and 1 in outbreak_model.classes_:
        pred = outbreak_model.predict(final_input)[0]
        prob = outbreak_model.predict_proba(final_input)[0][list(outbreak_model.classes_).index(1)]
        print(f"\n🚨 Outbreak Prediction for {selected_disease}:")
        print(f"Prediction: {'✅ Likely Outbreak' if pred == 1 else '❌ No Outbreak'} (Probability: {prob:.2f})")
    else:
        print("⚠️ Outbreak model not trained due to single-class issue.")

# Run the prediction flow
interactive_prediction()

X_d_train, X_d_test, y_d_train, y_d_test = train_test_split(X_d_bal, y_d_bal, test_size=0.2, random_state=42)
y_d_pred = disease_model.predict(X_d_test)

# ===============================
# 📊 Evaluation for Disease Type Prediction Model
# ===============================
print("\n📈 Classification Report for Disease Type Prediction:")
print(classification_report(
    y_d_test,
    y_d_pred,
    target_names=le_disease.inverse_transform(sorted(set(y_d_test)))
))

print("✅ Accuracy:", accuracy_score(y_d_test, y_d_pred))

# ===============================
# 📊 Evaluation for Outbreak Prediction Model
# ===============================
X_o_train, X_o_test, y_o_train, y_o_test = train_test_split(X_o_bal, y_o_bal, test_size=0.2, random_state=42)
y_o_pred = outbreak_model.predict(X_o_test)

print("\n📈 Classification Report for Disease Outbreak Prediction:")
print(classification_report(
    y_o_test,
    y_o_pred,
    target_names=["No Outbreak", "Outbreak"]
))

print("✅ Accuracy:", accuracy_score(y_o_test, y_o_pred))

import pickle

# Save disease model
with open("disease_model.pkl", "wb") as f:
    pickle.dump(disease_model, f)

# Save outbreak model
with open("outbreak_model.pkl", "wb") as f:
    pickle.dump(outbreak_model, f)

# Save label encoders
with open("le_disaster.pkl", "wb") as f:
    pickle.dump(le_disaster, f)

with open("le_disease.pkl", "wb") as f:
    pickle.dump(le_disease, f)

# Save scalers
with open("scaler_disease.pkl", "wb") as f:
    pickle.dump(scaler_disease, f)

with open("scaler_outbreak.pkl", "wb") as f:
    pickle.dump(scaler_outbreak, f)
