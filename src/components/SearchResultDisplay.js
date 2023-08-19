import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';


function SearchResultDisplay() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate= useNavigate();
  
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
    
        if (searchQuery) {
          axios.get(`${API_BASE_URL}/recipes/search`, {
            params: { q: searchQuery },
          })
          .then(response => {
            setSearchResults(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Search error:', error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }, []);
    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (searchResults.length === 0) {
        return <p>Recipe not found</p>;
      }

      const handleSaveRecipe =async (recipeId) =>{
        try{
          if(!localStorage.userLoggedIn){
            //Redirect to login
            navigate('/login');
            return;
          }
         // const token =localStorage.getItem('accessToken');
const userid = localStorage.getItem('userid')
      const response = await axios.post(
        `${API_BASE_URL}/save`,
        { recipeId, userid},
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
      <h2>Search Results</h2>
      <div className='d-flex flex-wrap justify-content-center'>
     
        {searchResults.map(recipe => (
          <div key={recipe._id} className='card mb-3 mr-3' style={{width:'3000px'}}>
             <p>{recipe.image && <img  className="card-image-top "  src={recipe.image} alt ={recipe.title} width="298.67" height="224"/>}</p>
            <div className='card-body'>
            <h4 className='card-title'>{recipe.title}</h4>
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Instructions: {recipe.instructions}</p>
                    <p>cooking time: {recipe.cookingtime} minutes</p>
                 {localStorage.userLoggedIn && <button onClick={()=>handleSaveRecipe(recipe._id)}>Save</button>}  
          </div>
       </div>
        ))}
        
     
      </div>
    </div>
  );
}

export default SearchResultDisplay;

