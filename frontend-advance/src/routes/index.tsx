import { createBrowserRouter } from "react-router";
import {
  AuthenticatedRoutes,
  NonAuthenticatedRoutes,
  RootLayout,
} from "../layout";
import {
  AboutProjectPage,
  AboutTeamPage,
  ContactUsPage,
  DiseaseOutbreakPredictionPage,
  DiseaseOutbreakPredictionResultPage,
  FAQPage,
  HelplinePage,
  HomePage,
  LoginPage,
  ModelsAccuracyPage,
  ModelsMatrixPage,
  RealtimeDisasterPage,
  RegisterPage,
} from "../pages";
import PredictionResultPage from "../pages/PredictionResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <NonAuthenticatedRoutes />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "about-project",
            element: <AboutProjectPage />,
          },
          {
            path: "about-team",
            element: <AboutTeamPage />,
          },
          {
            path: "helpline",
            element: <HelplinePage />,
          },
          {
            path: "reports",
            element: <ModelsMatrixPage />,
          },
          {
            path: "accuracies",
            element: <ModelsAccuracyPage />,
          },
          {
            path: "faq",
            element: <FAQPage />,
          },
          {
            path: "contact-us",
            element: <ContactUsPage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticatedRoutes />,
        children: [
          {
            path: "disease-outbreak-prediction",
            element: <DiseaseOutbreakPredictionPage />,
          },
          {
            path: "disease-outbreak-prediction/result",
            element: <DiseaseOutbreakPredictionResultPage />,
          },
          {
            path: "realtime-disaster",
            element: <RealtimeDisasterPage />,
          },
          {
            path: "predictions",
            element: <PredictionResultPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
