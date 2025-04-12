import {
  Box,
  Button,
  TextField,
  Typography,
  Card as MuiCard,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "550px",
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(12),
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ContactContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  position: "relative",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Message submitted! (Frontend only, no backend yet 😄)");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <ContactContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: "center", fontSize: "clamp(2rem, 10vw, 2.2rem)" }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          We'd love to hear from you! Fill the form below and we'll get back.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="name"
            label="Your Name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Your Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="subject"
            label="Subject"
            fullWidth
            required
            value={formData.subject}
            onChange={handleChange}
          />
          <TextField
            name="message"
            label="Message"
            fullWidth
            required
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Box>
      </Card>
    </ContactContainer>
  );
}
