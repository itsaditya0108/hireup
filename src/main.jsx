import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const FRONTEND_API = import.meta.env.VITE_CLERK_FRONTEND_API;

console.log("CLERK PUBLISHABLE KEY present?", Boolean(PUBLISHABLE_KEY));
console.log("CLERK FRONTEND_API present?", Boolean(FRONTEND_API));

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{ baseTheme: shadesOfPurple }}
      publishableKey={PUBLISHABLE_KEY}
      // add frontendApi if available (Clerk v5)
      frontendApi={FRONTEND_API}
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
