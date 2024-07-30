import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Create a context for API related data and functions
const ApiContext = createContext();

// Custom hook to use ApiContext
export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [message, setMessage] = useState('');

    const get = () => {
        axios.get("http://localhost:3001/recipes")
    .then(response => {
      const orderedRecipes = response.data.sort((a, b) => {
        return new Date(a.addedDate) - new Date(b.addedDate);
      });
      setRecipes(orderedRecipes);
      console.log(isLoading);
    })
    .catch(error => console.log("There was an error while fetching data!", error))
    .finally(setIsLoading(false));
    }

    const addRecipe = (newRecipe) => {
        setMessage(newRecipe.title + " adding.");
        
        // Using toast.promise to await the completion of the toast
        const toastPromise = toast.promise(
            axios.post("http://localhost:3001/recipes", newRecipe)
          .then(response => {
            setRecipes([...recipes,response.data]);
            setMessage(newRecipe.title + " added successfully!");
            return { success: true };
          })
          .catch(error => {
            setMessage(newRecipe.title + " adding failed!");
            console.error("There was an error while adding the recipe!", error);
            return { success: false };
          }),
        {
          pending: "Adding...",
          success: newRecipe.title + " added successfully!",
          error: "Failed to add",
        }
        );
      
        toastPromise.then(() => {
          // Code to execute after the toast is closed
          setMessage("");
        });
      };


      const deleteRecipeById = (id) => {
        const recipeToDelete = recipes.find(recipe => recipe.id === id);
        if (!recipeToDelete) {
          console.error("Recipe not found for deletion.");
          return;
        }
      
        setMessage(recipeToDelete.title + " deleting.");
      
        const toastPromise = toast.promise(
          axios.delete(`http://localhost:3001/recipes/${id}`)
            .then(() => {
              setRecipes(recipes.filter(recipe => recipe.id !== id));
              setMessage(recipeToDelete.title + " deleted successfully!");
              return { success: true };
            })
            .catch(error => {
              console.error("There was an error while deleting the recipe!", error);
              setMessage(recipeToDelete.title + " deletion failed!");
              return { success: false };
            }),
          {
            pending: "Deleting...",
            success: recipeToDelete.title + " deleted successfully! 👌",
            error: "Failed to delete 🤯",
          }
        );
      
        toastPromise.then(() => {
          // Code to execute after the toast is closed
          setMessage("");
        });
      };
      
      
      
      const startEditingRecipe = (id) => {
        const recipeToEdit = recipes.find(recipe => recipe.id === id);
        setEditingRecipe({
          id,
          title: recipeToEdit.title,
          description: recipeToEdit.description,
          image: recipeToEdit.image
        });
        
      };
      
      const cancelEditingRecipe = () => {
        setEditingRecipe(null);
      };
      
      const saveEditedRecipe = (id, updatedTitle, updatedDescription, updatedImageUrl) => {
        // Assuming you have an API endpoint for updating recipes
        axios.put(`http://localhost:3001/recipes/${id}`, {
          title: updatedTitle,
          description: updatedDescription,
          image: updatedImageUrl
        })
          .then(response => {
            // Assuming your API returns the updated recipe
            const updatedRecipe = response.data;
            
            setRecipes(
              recipes.map(recipe => (recipe.id === id ? updatedRecipe : recipe))
            );
            
            setEditingRecipe(null);
          })
          .catch(error => {
            console.error("Error updating recipe:", error);
            // Handle error state, e.g., show an error message to the user
          });
      };
    
  
    return (
      <ApiContext.Provider value={{ get,recipes,setRecipes,editingRecipe,setEditingRecipe,isLoading,setIsLoading,message,setMessage,addRecipe,deleteRecipeById,saveEditedRecipe,cancelEditingRecipe,startEditingRecipe }}>
        {children}
      </ApiContext.Provider>
    );
};