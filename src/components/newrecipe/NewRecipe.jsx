import React, { useState } from "react";
import "./NewRecipe.css";
import { useApi } from "../context/ApiContext";

const NewRecipeForm = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { addRecipe } = useApi();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecipe = {
      title,
      description,
      image: imageUrl,
      addedDate: new Date().toISOString(),
    };

    // Call the addRecipe function from props to add the new recipe to the list in App.jsx
    addRecipe(newRecipe);

    // Reset form fields
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form className="new-recipe-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="Recipe Title"
        required
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Recipe Description"
        required
        rows={7}
      ></textarea>
      <input
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        type="text"
        placeholder="Image URL"
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default NewRecipeForm;
