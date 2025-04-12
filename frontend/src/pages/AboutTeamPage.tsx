import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";

const teamMembers = [
  {
    name: "Radha Sha",
    role: "Team Lead / Full-Stack Developer",
    bio: "Leads the development and architecture of the application. Handles backend APIs and frontend UI/UX.",
    image: "/images/user.png",
  },
  {
    name: "Aayushi Patel",
    role: "Data Scientist",
    bio: "Built and trained the machine learning model for disease outbreak prediction and data analysis.",
    image: "/images/user.png",
  },
  {
    name: "Rahul Verma",
    role: "DevOps Engineer",
    bio: "Managed deployment, CI/CD pipelines, and server infrastructure for seamless delivery.",
    image: "/images/user.png",
  },
  {
    name: "Sneha Mehra",
    role: "UI/UX Designer",
    bio: "Designed wireframes, user interfaces, and worked on responsive design with MUI.",
    image: "/images/user.png",
  },
];

export default function AboutTeamPage() {
  return (
    <Container sx={{ py: 6, my: 10 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Meet Our Team
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
        Passionate individuals working together to build smarter health
        solutions
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            elevation={3}
            sx={{
              width: { xs: "100%", sm: "45%", md: "22%" },
              borderRadius: 4,
              textAlign: "center",
              py: 3,
              px: 2,
              flexGrow: 1,
            }}
          >
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{ width: 80, height: 80 }}
              />
            </Box>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {member.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                {member.role}
              </Typography>
              <Typography variant="body2">{member.bio}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
