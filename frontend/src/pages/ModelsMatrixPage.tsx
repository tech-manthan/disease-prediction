import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const MODEL_OPTIONS = [
  { label: "Disease Prediction Model", value: "disease" },
  { label: "Outbreak Prediction Model", value: "outbreak" },
];

const imageMap: Record<string, string> = {
  disease: "/images/disease_confusion_matrix.png",
  outbreak: "/images/outbreak_confusion_matrix.png",
};

export default function ModelsMatrixPage() {
  const [model, setModel] = useState("disease");

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Confusion Matrix (Image View)
      </Typography>

      <FormControl fullWidth sx={{ mt: 4, mb: 4 }}>
        <InputLabel>Select Model</InputLabel>
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          label="Select Model"
        >
          {MODEL_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="center">
        <img
          src={imageMap[model]}
          alt={`${model} confusion matrix`}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>
    </Container>
  );
}
