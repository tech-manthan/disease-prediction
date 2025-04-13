import { Divider } from "@mui/material";
import {
  FAQ,
  Features,
  Footer,
  Hero,
  Highlights,
  Pricing,
  Testimonials,
} from "../components";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div>
        <Features />
        <Divider />
        <Highlights />
      </div>
    </div>
  );
};

export default HomePage;
