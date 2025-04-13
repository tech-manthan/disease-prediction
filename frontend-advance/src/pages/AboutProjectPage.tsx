import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const AboutProjectPage = () => {
  return (
    <Box
      id="about-project"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        paddingTop: theme.spacing(10),
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        id="faq"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            🧠 About the Project: Post-Disaster Disease Outbreak Prediction
            System
          </Typography>
          <Typography variant="body1">
            This project focuses on building a machine learning-based predictive
            system to anticipate disease outbreaks following a natural disaster.
            After a disaster strikes—be it floods, earthquakes, or
            cyclones—regions often experience sudden outbreaks of diseases due
            to changes in environmental and socio-economic factors.
          </Typography>
          <Typography variant="body1">
            Our model uses historical post-disaster health and environmental
            data to predict whether a disease outbreak is likely to occur in a
            given region. The goal is to assist emergency responders and public
            health officials in proactive planning and targeted intervention,
            potentially saving lives and resources.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            🔍 Problem Statement
          </Typography>
          <Typography variant="body1">
            After a natural disaster, healthcare systems are often overwhelmed,
            and limited resources must be used wisely. Anticipating where and
            when a disease outbreak might occur can help prioritize aid
            distribution, deploy mobile clinics, and raise early public health
            warnings. This system is designed to fill that critical gap using
            data-driven insights.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            🧪 Model Overview
          </Typography>
          <Typography variant="body1">
            <strong>Data Used:</strong> The dataset includes environmental
            features like temperature, humidity, rainfall, population density,
            healthcare access, disaster type, and region.
          </Typography>
          <Typography variant="body1">
            <strong>Target:</strong> The binary classification task is to
            predict whether a disease was reported (
            <code>Disease_Reported</code> column).
          </Typography>

          <Box>
            <Typography variant="body1" gutterBottom>
              <strong>Preprocessing:</strong>
            </Typography>

            <List>
              <ListItem disableGutters>
                <ListItemText primary="Added slight noise to numerical features to reduce overfitting." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Standard scaling of numerical data and one-hot encoding for categorical features." />
              </ListItem>
            </List>
          </Box>

          <Typography variant="body1">
            <strong>Model Used:</strong> DecisionTreeClassifier with limited
            depth (<code>max_depth=5</code>) to ensure generalization and
            interpretability.
          </Typography>
          <Typography variant="body1">
            <strong>Pipeline:</strong> Complete scikit-learn pipeline with
            preprocessing + model in one clean workflow.
          </Typography>

          <Box>
            <Typography variant="body1" gutterBottom>
              <strong>Evaluation:</strong>
            </Typography>

            <List>
              <ListItem disableGutters>
                <ListItemText primary="Accuracy and classification report for basic performance check." />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="5-fold cross-validation for robustness." />
              </ListItem>
            </List>
          </Box>

          <Typography variant="body1">
            Results show good baseline performance, and the model is
            interpretable and lightweight—suitable for deployment even in
            low-resource environments.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            ✅ Outcomes
          </Typography>
          <List>
            <ListItem disableGutters>
              <ListItemText primary="🚑 Helps in early disease outbreak detection" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="🗺️ Can guide resource allocation post-disaster" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="🔍 Encourages data-informed disaster response planning" />
            </ListItem>
          </List>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutProjectPage;
