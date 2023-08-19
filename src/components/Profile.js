import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import LineChart from './LineChart';
import moment from 'moment';

function Profile() {
  const [userRecipes, setUserRecipes] = useState([]);
  const userid = localStorage.getItem('userid');
   const [creationData, setCreationData] = useState({labels:[], data:[]});
  // console.log(userRecipes)

  useEffect(() => {
    if (userid) {
      axios.get(`${API_BASE_URL}/recipes/user/${localStorage.userid}`)
        .then(response => {

          const userCreatedList = [];

          // setUserRecipes(response.data);
          response.data.filter(recipe => {
            if (userid === recipe.creator)
            {
              userCreatedList.push(recipe)
            }
          } )
          setUserRecipes(userCreatedList);
         })

        .catch(error => {
          console.error('Error fetching user recipes:', error);
        });
    }
  }, [userid]);

  useEffect(() => {
    // Extract creation dates and counts for line chart
    const counts = {};

    userRecipes.forEach(recipe => {
     // console.log('RAW CREATEDAT:', recipe.createdAt);
      const createdAt = moment(recipe.createdAt).format('YYYY-MM-DD'); // Format the date

      if (counts[createdAt]) {
        counts[createdAt] += 1;
      } else {
        counts[createdAt] = 1;
      }
    });
    // Prepare data for line chart
    const labels = Object.keys(counts);
    const data = Object.values(counts);

    setCreationData({ labels, data });
  }, [userRecipes]);


  const handleDeleteRecipe = (recipeId) => {
    axios.delete(`${API_BASE_URL}/recipes/${recipeId}/${userid}`)
      .then(response => {
        // Update the userRecipes state after successful deletion
        console.log(response);
        setUserRecipes(userRecipes.filter(recipe => recipe._id !== recipeId));
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 403) {
          window.alert(error.response.data.message);
        } else {
          console.error('Delete error:', error);
        }
      });
  };

  return (
    <div>
      <h2>Your Profile</h2>
      {Object.keys(creationData).length > 0 && (
        <LineChart labels={creationData.labels} data={creationData.data} />
      )}
      {localStorage.userLoggedIn ? (
        <div >
          <h3>Hello, {localStorage.username}!</h3>
          <h4> Your Recipes</h4>
          <div className='d-flex flex-wrap justify-content-center' >
          
          {userRecipes.length > 0 ? (
            userRecipes.map(recipe => (
              <div key={recipe._id} className='card mb-3 mr-3' style={{width: '300px'}}>
                {recipe.image && <img className='card-img-top' src={recipe.image} alt={recipe.title} width="298.67" height="224" />}
               <div className='card-body'>
                <h5 className='card-title'>{recipe.title}</h5>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Instructions: {recipe.instructions}</p>
                <p>Cooking Time: {recipe.cookingtime} minutes</p>
                <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
              </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
        </div>
        
      ) : (
        <p>Please log in to view your profile.</p>
      )}
      </div>
    
  );
}

export default Profile;


