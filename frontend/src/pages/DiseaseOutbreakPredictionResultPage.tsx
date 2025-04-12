import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const DiseaseOutbreakPredictionResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state || {};
  const isOutbreak = result.Prediction?.toLowerCase().includes("yes");

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(190, 100%, 92%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 14%), transparent)",
        }),
      })}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 6,
            p: 3,
            backgroundColor: "background.paper",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              🧪 Prediction Result
            </Typography>

            <Typography variant="body1" mt={2}>
              <strong>🌊 Disaster Type:</strong> {result.Disaster_Type}
            </Typography>

            <Typography variant="body1" mt={1}>
              <strong>🦠 Disease:</strong> {result.Disease}
            </Typography>

            <Typography
              variant="body1"
              mt={1}
              sx={{
                color: isOutbreak ? "error.main" : "success.main",
                fontWeight: "bold",
              }}
            >
              <strong>🔍 Prediction:</strong> {result.Prediction}
            </Typography>

            <Typography variant="body1" mt={1}>
              <strong>📊 Probability:</strong>{" "}
              {(result.Probability * 100).toFixed(2)}%
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => navigate("/auth/disease-outbreak-prediction")}
            >
              🔁 Predict Again
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DiseaseOutbreakPredictionResultPage;
