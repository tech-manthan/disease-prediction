import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface ClassificationMetric {
  precision: number;
  recall: number;
  "f1-score": number;
  support: number;
}

type ClassificationReport = Record<string, ClassificationMetric>;

const MODEL_OPTIONS = [
  { label: "Disease Prediction Model", value: "disease" },
  { label: "Outbreak Prediction Model", value: "outbreak" },
];

export default function ModelsAccuracyPage() {
  const [model, setModel] = useState("disease");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ClassificationReport | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    const fetchModelAccuracy = async () => {
      setLoading(true);
      try {
        const endpoint =
          model === "disease"
            ? "http://127.0.0.1:5000/disease/accuracy"
            : "http://127.0.0.1:5000/outbreak/accuracy";

        const response = await axios.get(endpoint);
        setReport(response.data.report);
        setAccuracy(response.data.accuracy);
      } catch (error) {
        console.error("Failed to fetch model accuracy", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModelAccuracy();
  }, [model]);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Model Accuracy & Classification Report
      </Typography>

      <FormControl fullWidth sx={{ mt: 4, mb: 4 }}>
        <InputLabel>Select Model</InputLabel>
        <Select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          label="Select Model"
        >
          {MODEL_OPTIONS.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        report && (
          <>
            <Typography variant="h6" gutterBottom>
              Accuracy:
              <strong>{accuracy && (accuracy * 100).toFixed(2)}%</strong>
            </Typography>

            <Paper elevation={3} sx={{ overflowX: "auto", mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell align="right">Precision</TableCell>
                    <TableCell align="right">Recall</TableCell>
                    <TableCell align="right">F1-Score</TableCell>
                    <TableCell align="right">Support</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(report).map(([label, metrics]) => {
                    if (typeof metrics !== "object") return null;
                    return (
                      <TableRow key={label}>
                        <TableCell>{label}</TableCell>
                        <TableCell align="right">
                          {metrics.precision.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {metrics.recall.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {metrics["f1-score"].toFixed(2)}
                        </TableCell>
                        <TableCell align="right">{metrics.support}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </>
        )
      )}
    </Container>
  );
}
