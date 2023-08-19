import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CreateRecipe from './components/CreateRecipe';
import SavedRecipes from './components/SavedRecipes';
import Home from './components/Home';
import Recipes from './components/Recipes';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import SearchResultDisplay from './components/SearchResultDisplay';

function AppRoutes() {
  
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path ="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:token" element={<ResetPassword />} /> 
    {localStorage.userLoggedIn && (
      <>
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/saved" element={<SavedRecipes />} />
        <Route path="/profile" element={<Profile/>} />
      </>
    )}
     <Route path="/search" element={<SearchResultDisplay />} />
    <Route path="/recipes" element={<Recipes />} />
  </Routes>
  );
}

export default AppRoutes;
