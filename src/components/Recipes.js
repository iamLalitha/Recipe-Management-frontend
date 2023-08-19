import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    axios.get(`${API_BASE_URL}/recipes`)  
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  const handleSaveRecipe = async (recipeId) => {
    try {
      if (!localStorage.userLoggedIn) {
        // Redirect to login
        navigate('/login');
        return;
      }
//const token =localStorage.getItem('accessToken');
const userid = localStorage.getItem('userid')
      const response = await axios.post(
        `${API_BASE_URL}/save`,
        { recipeId, userid},
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      if (response.status === 200) {
        console.log('Recipe saved successfully');
      } else {
        console.log('Recipe save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };
  return (
    <div>
    <h2>Recipes</h2>
    <div className='d-flex flex-wrap justify-content-center'>
      {recipes.map(recipe => (
        <div key={recipe._id} className="card mb-3 mr-3" style={{ maxWidth: '300px' }}>
          {recipe.image && <img className="card-img-top" src={recipe.image} alt={recipe.title} width="298.67" height="224"/>}
          <div className="card-body">
            <h3 className='card-title'>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Cooking Time: {recipe.cookingtime} minutes</p>
            {localStorage.userLoggedIn && <button onClick={() => handleSaveRecipe(recipe._id)}>Save</button>}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Recipes;
