import React from 'react';
import { Link } from 'react-router-dom';



function Home() {
  
  // const [ isLoggedIn , setIsLoggedIn ] = useState(false);

  // if (localStorage.userLoggedIn){
  //   setIsLoggedIn(true)
  // }


  console.log(localStorage.userLoggedIn,localStorage.username)
  return (
    
    <div className="card mx-auto class" style={{width:'600px'}} >
      <div className='card-body'>
      <h1 className='card-title'>Welcome to RecipeFinder!</h1>
     
      {localStorage.userLoggedIn ? (
        <p>Hello, {localStorage.username} You are already logged in.</p>
      ) : (
        <div>
          <p>If you're new here, register to get started:</p>
          <Link to="/register" className="btn btn-danger mx-2">Register</Link>
          <p>If you're already registered, you can log in:</p>
          <Link to="/login" className="btn btn-danger mx-2">Login</Link>
          {/* <RecipeChart/> */}
        </div>
      )}
    </div>
    </div>

  );
}

export default Home;
