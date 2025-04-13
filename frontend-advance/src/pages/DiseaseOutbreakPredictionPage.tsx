import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "500px",
    marginTop: theme.spacing(8),
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(10),
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const PageContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(6),
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const DisasterOutbreakPredictionPage = () => {
  const [disasterType, setDisasterType] = useState("");
  const [disasterOptions, setDisasterOptions] = useState([]);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Temperature: "",
    Rainfall: "",
    Humidity: "",
    Population_Density: "",
    Healthcare_Access: "",
    Disease_Type: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisasterTypes = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/disaster-types");
        setDisasterOptions(res.data.disaster_types || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error("Failed to fetch disaster types");
        }
      }
    };
    fetchDisasterTypes();
  }, []);

  const handleDisasterSubmit = async () => {
    if (!disasterType) {
      toast.error("Please select a disaster type");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict-disease", {
        Disaster_Type: disasterType,
      });
      setDiseaseOptions(res.data.Predicted_Diseases || []);
      setStep(2);
      toast.success("Diseases fetched successfully!");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    }
  };

  const handleOutbreakSubmit = async () => {
    const {
      Temperature,
      Rainfall,
      Humidity,
      Population_Density,
      Healthcare_Access,
      Disease_Type,
    } = formData;

    if (
      !Temperature ||
      !Rainfall ||
      !Humidity ||
      !Population_Density ||
      !Healthcare_Access ||
      !Disease_Type
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const healthAccess = parseFloat(Healthcare_Access);
    if (isNaN(healthAccess) || healthAccess < 1 || healthAccess > 5) {
      toast.error("Healthcare Access must be a number between 1 and 5");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict-outbreak", {
        Disaster_Type: disasterType,
        ...formData,
      });
      navigate("/auth/disease-outbreak-prediction/result", { state: res.data });
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "Something went wrong");
      }
    }
  };

  return (
    <PageContainer>
      <Card variant="outlined">
        <Typography variant="h5" fontWeight={600}>
          Disease Outbreak Prediction
        </Typography>

        {step === 1 && (
          <>
            <FormControl fullWidth>
              <FormLabel>Disaster Type</FormLabel>
              <TextField
                select
                value={disasterType}
                onChange={(e) => setDisasterType(e.target.value)}
                placeholder="Select disaster type"
              >
                {disasterOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Button variant="contained" onClick={handleDisasterSubmit}>
              Get Diseases
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <FormControl fullWidth>
              <FormLabel>Disease Type</FormLabel>
              <TextField
                select
                value={formData.Disease_Type}
                onChange={(e) =>
                  setFormData({ ...formData, Disease_Type: e.target.value })
                }
              >
                {diseaseOptions.map((disease) => (
                  <MenuItem key={disease} value={disease}>
                    {disease}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <Stack gap={2}>
              {[
                ["Temperature", "Temperature (°C)"],
                ["Rainfall", "Rainfall (mm)"],
                ["Humidity", "Humidity (%)"],
                ["Population_Density", "Population Density (/km²)"],
                ["Healthcare_Access", "Healthcare Access Score (0-1)"],
              ].map(([key, label]) => (
                <TextField
                  key={key}
                  label={label}
                  type="number"
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  fullWidth
                />
              ))}
            </Stack>

            <Button variant="contained" onClick={handleOutbreakSubmit}>
              Predict Outbreak
            </Button>
          </>
        )}
      </Card>
    </PageContainer>
  );
};

export default DisasterOutbreakPredictionPage;
