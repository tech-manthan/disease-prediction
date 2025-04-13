import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useTheme,
  Button,
  Box,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Data, useNotificationStore } from "../store/useNotificationStore";
import { useNavigate } from "react-router";

const RealtimeDisasterPage = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications
  );
  const clearReadNotifications = useNotificationStore(
    (state) => state.clearReadNotifications
  );
  const navigate = useNavigate();
  const theme = useTheme();

  function handleNotificationClick(data: Data, id: string) {
    markAsRead(id);
    navigate("/auth/predictions", { state: data });
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 16, mb: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Realtime Disaster Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Typography>No notifications yet.</Typography>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={clearReadNotifications}
            >
              Clear Read
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={clearNotifications}
            >
              Clear All
            </Button>
          </Box>

          <Paper sx={{ mt: 3, overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Disaster</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Temp (°C)</TableCell>
                  <TableCell>Rainfall (mm)</TableCell>
                  <TableCell>Humidity (%)</TableCell>
                  <TableCell>Pop Density</TableCell>
                  <TableCell>Healthcare Access</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((n) => {
                  const isRead = n.read;
                  return (
                    <TableRow
                      key={n.id}
                      onClick={() => handleNotificationClick(n.message, n.id)}
                      hover
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <TableCell>
                        {isRead && (
                          <CheckCircle
                            fontSize="small"
                            sx={{ color: "green", verticalAlign: "middle" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{n.message.Date}</TableCell>
                      <TableCell>{n.message.Disaster_Type}</TableCell>
                      <TableCell>{n.message.Region}</TableCell>
                      <TableCell>{n.message.Temperature}</TableCell>
                      <TableCell>{n.message.Rainfall}</TableCell>
                      <TableCell>{n.message.Humidity}</TableCell>
                      <TableCell>{n.message.Population_Density}</TableCell>
                      <TableCell>{n.message.Healthcare_Access}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default RealtimeDisasterPage;
