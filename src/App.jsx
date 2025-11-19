import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listing";
import JobPage from "./pages/job";
import PostJob from "./pages/post-job";
import SaveJob from "./pages/saved-job";
import MyJob from "./pages/my-job";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/onboarding',
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        )
      },
      {
        path: '/jobs',
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        )
      },
      {
        path: '/job/:id',
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>)
      },
      {
        path: '/post-job',
        element: (<ProtectedRoute>
          <PostJob />
        </ProtectedRoute>)
      },
      {
        path: '/saved-job',
        element: (<ProtectedRoute>
          <SaveJob />
        </ProtectedRoute>)
      },
      {
        path: '/my-jobs',
        element: (<ProtectedRoute>
          <MyJob />
        </ProtectedRoute>)
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}


export default App;
