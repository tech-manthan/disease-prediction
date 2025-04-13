export type DiseasePrediction = {
  Disease: string;
  Prediction: "Outbreak Likely" | "No Outbreak";
  Probability: number;
};

export type DiseaseOutbreak = {
  Disaster_Type: string;
  Region: string;
  Predictions: DiseasePrediction[];
};
