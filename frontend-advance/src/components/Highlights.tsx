import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Dual-Model Architecture",
    description:
      "Built two robust machine learning models — one for predicting whether a disease will be reported after a disaster and another to classify the disease type — ensuring comprehensive outbreak forecasting.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Disaster-Aware Predictions",
    description:
      "Integrates disaster type, environmental factors (e.g., rainfall, temperature), and regional context to deliver localized and disaster-sensitive health risk insights.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Feature Engineering & Seasonal Context",
    description:
      "Enriches raw data using domain-relevant features such as Rainfall-to-Humidity, Temp × Humidity, and dynamically extracted Season from the date to enhance model accuracy.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "SMOTE + XGBoost Pipeline",
    description:
      "Tackles class imbalance with SMOTE and leverages XGBoost’s power for both classification tasks — optimizing performance on skewed datasets with high variance.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Hyperparameter Tuning for Optimization",
    description:
      "Uses RandomizedSearchCV for efficient hyperparameter tuning, improving the generalization and predictive power of both models.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "User-Friendly Output & Explainability",
    description:
      "Provides clear predictions along with probability distributions, helping stakeholders understand not just the “what” but also the “how confident” of each prediction.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "grey.900",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Discover why our Disease Outbreak Prediction Dashboard stands out:
            powered by dual intelligent models, it blends adaptability with
            real-time insights, offering precise forecasts across regions and
            disaster types. With a user-friendly interface, innovative feature
            engineering, and reliable performance even on imbalanced data, it
            delivers both accuracy and trust. Backed by strong optimization and
            explainable outputs, it's built for impact, clarity, and resilience.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  backgroundColor: "grey.800",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
