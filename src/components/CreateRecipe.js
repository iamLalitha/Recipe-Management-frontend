import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';


function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingtime, setCookingtime] = useState('');
  const [image, setImage] = useState('');
  const [creationMessage, setCreationMessage] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(localStorage)

    const newRecipe = {
      title,
      ingredients,
      instructions,
      cookingtime,
      image,
      creator: localStorage.userid,
    };

    axios.post(`${API_BASE_URL}/recipes/create`, newRecipe) 
      .then(response => {
        console.log('Recipe created:', response.data);
        setCreationMessage('Recipe created successfully.');

        // Clear form fields after successful creation
        setTitle('');
        setIngredients('');
        setInstructions('');
        setCookingtime('');
        setImage('');
      })
      .catch(error => {
        console.error('Error creating recipe:', error);
      });
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      {creationMessage && <p>{creationMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="form-control"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-control"
            rows="6"
            required
          />
        </div>
        <div className="form-group">
          <label>Cooking Time (minutes):</label>
          <input
            type="number"
            value={cookingtime}
            onChange={(e) => setCookingtime(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-danger">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
