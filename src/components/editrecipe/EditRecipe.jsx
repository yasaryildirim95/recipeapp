import React, { useState } from 'react';
import './EditRecipe.css';



const EditRecipe = ({ id, recipe, editRecipe, cancelEdit }) => {
  window.scrollTo(0, 0)
  const [editedTitle, setEditedTitle] = useState(recipe.title);
  const [editedDesc, setEditedDesc] = useState(recipe.description);
  console.log(recipe);
  const [editedImage, setEditedImage] = useState(recipe.image);

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      editRecipe(id, editedTitle, editedDesc, editedImage);
    }
  };

  return (
    
        <form className='edit-recipe-form' onSubmit={handleSave}>
        <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        required
      />

      <label>Description:</label>
      <textarea
        value={editedDesc}
        onChange={(e) => setEditedDesc(e.target.value)}
        required
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={editedImage}
        onChange={(e) => setEditedImage(e.target.value)}
        required
      />
      <button type='submit'>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
        </form>
    
  );
};

export default EditRecipe;
