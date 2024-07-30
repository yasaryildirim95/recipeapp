import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import NewRecipeForm from "./components/newrecipe/NewRecipe";
import RecipeList from "./components/recipe-list/RecipeList";
import { useApi } from "./components/context/ApiContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login-page/LoginPage";
import PrivateRoute from "./services/PrivateRoute";
import Settings from "./components/settings/Settings";

function App() {
  const { get, recipes, isLoading, deleteRecipeById, startEditingRecipe } =
    useApi();

  useEffect(() => {
    get();
  }, []);

  return (
    <Router>
      <div className="App">
        {!isLoading && (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/recipes"
                element={
                  <RecipeList
                    replist={recipes}
                    deleteRecipe={deleteRecipeById}
                    editRecipe={startEditingRecipe}
                  />
                }
              />
              <Route path="/new" element={<NewRecipeForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/settings"
                element={<PrivateRoute element={<Settings />} />}
              />
            </Routes>
          </>
        )}
        {isLoading && (
          <div
            id="loading"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.8)",
              zIndex: 1000,
            }}
          >
            <img src="./src/assets/loading.gif" alt="Loading..." />
          </div>
        )}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
