import React,{useState} from 'react';
import { Link } from 'react-router-dom';
//import { useAuth } from '../authContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import SearchResultDisplay from './SearchResultDisplay';
// import Logout from './Logout';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); 
 // const { user } = useAuth();
  const navigate = useNavigate();

  //console.log(user);

  function logout(){
    localStorage.removeItem('userLoggedIn');
    navigate('/login');
  }
  

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // Do nothing if the search query is empty
      return;
    }

    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    axios.get(`${API_BASE_URL}/recipes/search`,{
      params:{q:searchQuery}
    })
      .then(response => {
        setSearchResults(response.data);
        setSearchPerformed(true);
      })
      .catch(error => {
        console.error('Search error:', error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{color:'white'}}>RecipeFinder</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className='input-group'>
              <div className='form-outline'>
                <input
                size={13}
                  type="search"
                  placeholder="Search recipes"
                  className='form-control'
                  aria-label="Search" aria-describedby="search-addon"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
                <button type ="button" style={{width:'30%'}} className='btn btn-outline-danger' onClick={handleSearch}>Search</button>
              </div>
              
              
              <div>
                {searchPerformed && (
                  <SearchResultDisplay searchResults={searchResults} />
                )}
              </div>
              <div>
                <ul>
                  {searchResults.map(recipe => (
                    <li key={recipe._id}>
                    <h4>{recipe.title}</h4>
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Instructions: {recipe.instructions}</p>
                    <p>cooking time: {recipe.cookingtime}</p>
                    <p>image:{recipe.image}</p>
                  </li>

                  ))}
                </ul>
              </div>
            </li>
            
            <li className="nav-item" >
              <Link className="nav-link" to="/"  style={{color:'white'}}  >Home</Link>
            </li>

            <li className="nav-item">
           {localStorage.userLoggedIn && (
           <Link className="nav-link" to="/create"  style={{color:'white'}}>Create Recipes</Link>
              )}
             </li>
            <li className="nav-item">
              {localStorage.userLoggedIn && (
              <Link className="nav-link" to="/saved"  style={{color:'white'}}>Saved Recipes</Link>
               )}
          </li>
          <li className="nav-item">
           {localStorage.userLoggedIn && (
           <Link className="nav-link" to="/profile"  style={{color:'white'}}>Profile</Link>
              )}
             </li>
            <li className="nav-item">
              {localStorage.userLoggedIn ? (
                <button className="nav-link" onClick={logout}  style={{color:'white'}}>Logout</button>
              ) : (
                <Link className="nav-link" to="/login"  style={{color:'white'}}>Login</Link>
              )}
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
