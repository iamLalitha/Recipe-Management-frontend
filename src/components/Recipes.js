import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import {BsSend } from 'react-icons/bs';

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

  const handleShareRecipe = (recipe) => {
    const recipeUrl = `${window.location.origin}/recipe/${recipe._id}`;
    
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this recipe: ${recipe.title}`,
        url: recipeUrl,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Share failed:', error));
    } else {

      console.log('Share API not supported, implement your own sharing logic here');
    }
  };

  const handleAddComment = (e, recipe) => {
    e.preventDefault();
    const commentInput = e.target.querySelector('input');
    const newComment = commentInput.value;
  

    axios.post(`${API_BASE_URL}/${recipe._id}/comments`, { comment: newComment })
      .then(response => {
        // Update the local state with the new comment
        setRecipes(prevRecipes => {
          return prevRecipes.map(prevRecipe => {
            if (prevRecipe._id === recipe._id) {
              return { ...prevRecipe, comments: [...prevRecipe.comments, newComment] };
            }
            return prevRecipe;
          });
        });
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  
    // Clear the comment input field
    commentInput.value = '';
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
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   
             <div onClick={()} => handleShareRecipe(recipe)}>
              <BsSend size={20} />
              </div>

            <div >
            <br></br>
              <form onSubmit={(e) => handleAddComment(e, recipe)}>
                <input
                  type="text"
                  placeholder="Add a comment"
                  style={{ width: '120px', fontSize: '14px' }}
                />
              </form>
              <button
                type="submit"
                style={{ fontSize: '15px' }}
              >
                Comment
              </button>
            </div>

              {recipe.comments && recipe.comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Recipes;
