import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from "@mui/material";
import axios from "axios";
import { Data } from "../store/useNotificationStore";
import { DiseaseOutbreak } from "../types";
import { useLocation, useNavigate } from "react-router";

const PredictionResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as Data | undefined;

  const [result, setResult] = useState<DiseaseOutbreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) {
      navigate("/auth/realtime-disaster");
      return;
    }

    const fetchPrediction = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/predict-disease-outbreak",
          {
            Disaster_Type: data.Disaster_Type,
            Region: data.Region,
            Temperature: data.Temperature,
            Rainfall: data.Rainfall,
            Humidity: data.Humidity,
            Population_Density: data.Population_Density,
            Healthcare_Access: data.Healthcare_Access,
          }
        );
        setResult(res.data);
      } catch (error) {
        console.error("Prediction error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [data, navigate]);

  if (loading) {
    return (
      <Container sx={{ mt: 16, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Predicting diseases...
        </Typography>
      </Container>
    );
  }

  if (!result) {
    return (
      <Container sx={{ mt: 16, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Failed to load prediction.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 16, pb: 10 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Prediction for {result.Region} ({result.Disaster_Type})
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Disease</strong>
                </TableCell>
                <TableCell>
                  <strong>Outbreak</strong>
                </TableCell>
                <TableCell>
                  <strong>Probability (%)</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.Predictions.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.Disease}</TableCell>
                  <TableCell>{row.Prediction}</TableCell>
                  <TableCell>{row.Probability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PredictionResultPage;
