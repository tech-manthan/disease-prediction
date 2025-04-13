import { RouterProvider } from "react-router";
import { AppTheme } from "./theme";
import router from "./routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AppTheme>
      <RouterProvider router={router} />
      <Toaster />
    </AppTheme>
  );
};

export default App;
