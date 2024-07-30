import React from "react";
import "./RecipeList.css";
import { useApi } from "../context/ApiContext";
import EditRecipe from "../editrecipe/EditRecipe";

const RecipeList = ({ replist, deleteRecipe, editRecipe }) => {
  const { editingRecipe, saveEditedRecipe, cancelEditingRecipe } = useApi();
  return (
    <>
      {editingRecipe !== null && (
        <EditRecipe
          id={editingRecipe.id}
          recipe={editingRecipe}
          editRecipe={saveEditedRecipe}
          cancelEdit={cancelEditingRecipe}
        />
      )}
      <div className="recipe-list-container">
        <h2>My Recipes</h2>
        <ul>
          {replist.map((recipe) => (
            <li key={recipe.id}>
              <div>
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <div>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </div>
              <div className="buttons">
                <button onClick={() => editRecipe(recipe.id)}>Edit</button>
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecipeList;
