import { Container, Typography, Box, Card, CardMedia } from "@mui/material";

export default function ReportsPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Model Evaluation Reports
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Card
          elevation={3}
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image="/images/disease_classification_report.png"
            alt="Disease Prediction Model"
          />
        </Card>

        <Card
          elevation={3}
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image="/images/outbreak_classification_report.png"
            alt="Disease Outbreak Prediction Model"
          />
        </Card>
      </Box>
    </Container>
  );
}
