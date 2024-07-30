import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserPreferencesProvider } from "./components/context/UserPreferencesContext.jsx";
import { ApiProvider } from "./components/context/ApiContext.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";

const removeLoadingElement = () => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.remove();
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <UserPreferencesProvider>
          <App />
        </UserPreferencesProvider>
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>
),
  removeLoadingElement();
