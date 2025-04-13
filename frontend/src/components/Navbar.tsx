import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Container,
  Drawer,
  MenuItem,
  Divider,
  Avatar,
  Menu,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router";
import { ColorModeIconDropdown } from "../theme";
import { useState } from "react";
import { useUserStore } from "../store/useAuthStore";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const navItems = [
  { title: "Home", to: "/" },
  {
    title: "Disease Outbreak Prediction",
    to: "/auth/disease-outbreak-prediction",
  },
  { title: "Helpline", to: "/helpline" },
  { title: "About Project", to: "/about-project" },
  { title: "Contact Us", to: "/contact-us" },
  { title: "FAQs", to: "/faq" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, clearUser } = useUserStore();

  const handleLogout = () => {
    clearUser();
    handleCloseMenu();
    navigate("/");
  };

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const userInitial = user?.fullName?.[0]?.toUpperCase() || "?";

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to={"/"}>
              <Box
                component="img"
                src="/images/raahat.png"
                alt="My Image"
                sx={{
                  width: "120px",
                  mt: 1,
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            </Link>
          </Box>

          {/* Large screen nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                color="info"
                variant="text"
                size="small"
                onClick={() => navigate(item.to)}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                  >
                    {userInitial}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2">{user.fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  size="small"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </>
            )}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <ColorModeIconDropdown />
            </Box>
            {/* Mobile menu icon */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </StyledToolbar>

        {/* Small screen Drawer */}
        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer(false)}
          slotProps={{
            paper: { sx: { top: "var(--template-frame-height, 0px)" } },
          }}
        >
          <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            {navItems.map((item) => (
              <MenuItem key={item.to} onClick={() => navigate(item.to)}>
                {item.title}
              </MenuItem>
            ))}
            <Divider sx={{ my: 2 }} />
            {user ? (
              <>
                <MenuItem disabled>
                  <Typography variant="body2">{user.fullName}</Typography>
                </MenuItem>
                <MenuItem>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </MenuItem>
              </>
            )}
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
}
