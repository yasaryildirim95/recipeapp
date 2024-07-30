import React from "react";
import "./home.css";
import { useApi } from "../context/ApiContext";
import RecipeList from "../recipe-list/RecipeList";
import EditRecipe from "../editrecipe/EditRecipe";

const Home = () => {
  const {
    recipes,
    editingRecipe,
    deleteRecipeById,
    saveEditedRecipe,
    cancelEditingRecipe,
    startEditingRecipe,
  } = useApi();
  return (
    <>
      <div className="home">
        <h1>Welcome to the Recipe Sharing Platform</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          incidunt.
        </p>
      </div>
      <RecipeList
        replist={recipes}
        deleteRecipe={deleteRecipeById}
        editRecipe={startEditingRecipe}
      />
    </>
  );
};

export default Home;
