import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const userid = localStorage.getItem('userid')
  console.log(recipes)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/recipes/${localStorage.userid}`)
      .then(response => {
        // Create a Set to track unique recipe IDs
        const uniqueRecipeIds = new Set();
  
        // Filter out duplicates and create a new array of recipes
        const uniqueRecipes = response.data.filter(recipe => {
          if (uniqueRecipeIds.has(recipe._id)) {
            return false; // Skip duplicate recipe
          }
          uniqueRecipeIds.add(recipe._id);
          return true; // Include unique recipe
        });
  
        // Set the unique recipes in the state
        setRecipes(uniqueRecipes);
      })
      .catch(error => console.error(error));
  }, [userid]);
  
    const handleDeleteRecipe =(recipeId) =>{

      axios.put(`${API_BASE_URL}/recipes/${localStorage.userid}` , {recipeId})
      .then(response => { 

        console.log(response)
        window.location.reload();


      })
      .catch(error => console.error(error));

    };
  
return (
    <div>
      <h2>Your Saved Recipes</h2>
      <div className='d-flex flex-wrap justify-content-center'>
    
      {recipes.map(recipe => (
        <div key={recipe._id} className='card mb-3 mr-3' style={{width:'300px'}}>
           {recipe.image && <img className ="card-img-top" src={recipe.image} alt={recipe.title} width="298.67" height="224" />}
          <div className='card-body'>
          <h3 className='card-title'>{recipe.title}</h3>
          <p>Ingredients: {recipe.ingredients}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Cokoing Time: {recipe.cookingtime} minutes</p>
          <button onClick={()=> handleDeleteRecipe(recipe._id)}>Remove</button>
        </div>
        </div>
      ))}
      </div>
      </div>
    
  );
}

export default SavedRecipes;
