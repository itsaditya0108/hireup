import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";
import App from "./App.jsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const FRONTEND_API = import.meta.env.VITE_CLERK_FRONTEND_API;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}
if (!FRONTEND_API) {
  throw new Error("Missing VITE_CLERK_FRONTEND_API");
}

function ClerkWithRouter({ children }) {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      frontendApi={FRONTEND_API}
      appearance={{ baseTheme: shadesOfPurple }}
      navigate={(to) => navigate(to)}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRouter>
        <App />
      </ClerkWithRouter>
    </BrowserRouter>
  </React.StrictMode>
);
