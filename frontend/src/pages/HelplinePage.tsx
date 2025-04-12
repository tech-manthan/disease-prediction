import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PublicIcon from "@mui/icons-material/Public";

const helplines = {
  world: [
    {
      country: "United Nations OCHA",
      number: "+41 22 917 1234",
      description: "UN Office for the Coordination of Humanitarian Affairs",
    },
    {
      country: "Red Cross International",
      number: "+41 22 730 4222",
      description: "Emergency assistance, disaster relief, and education",
    },
    {
      country: "IFRC (International Federation of Red Cross)",
      number: "+41 22 730 42 22",
      description: "Global disaster response and recovery",
    },
  ],
  india: [
    {
      state: "National Disaster Management Authority (NDMA)",
      number: "011-26701700",
      description: "Central disaster support and coordination",
    },
    {
      state: "NDRF Emergency Helpline",
      number: "9711077372",
      description: "National Disaster Response Force",
    },
    {
      state: "India Meteorological Department (IMD)",
      number: "1800 180 1717",
      description: "Weather updates and alerts",
    },
    {
      state: "State Emergency Operation Centre (SEOC)",
      number: "1070",
      description: "Available in all states",
    },
    {
      state: "Police / Fire / Ambulance",
      number: "112",
      description: "All-in-one emergency helpline",
    },
  ],
};

export default function HelplinePage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        <PublicIcon fontSize="large" sx={{ verticalAlign: "middle", mr: 1 }} />
        Disaster Helpline Numbers
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
        Reach out immediately for assistance during natural disasters and
        emergencies
      </Typography>

      {/* Global Helplines */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
          🌍 Global Helplines
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.light" }}>
              <TableRow>
                <TableCell>
                  <strong>Organization</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {helplines.world.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>
                    <LocalPhoneIcon
                      fontSize="small"
                      sx={{ verticalAlign: "middle", mr: 1 }}
                    />
                    {item.number}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* India Helplines */}
      <Box>
        <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
          🇮🇳 India Specific Helplines
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.light" }}>
              <TableRow>
                <TableCell>
                  <strong>Department / Service</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {helplines.india.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>
                    <LocalPhoneIcon
                      fontSize="small"
                      sx={{ verticalAlign: "middle", mr: 1 }}
                    />
                    {item.number}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
