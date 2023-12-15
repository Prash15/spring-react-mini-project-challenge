import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import SessionList from './SessionList';
import SessionEdit from './SessionEdit';
import RestaurantList from './RestaurantList';
import RestaurantEdit from './RestaurantEdit';

const App = () => {
  return (
    <Router>
      <Routes>
      	<Route path="/register" element= { <Register/>} />
      	<Route path="/login" element= { <Login/>} />
      
        <Route exact path="/" element={<Home/>}/>
        <Route path="/sessions" exact={true} element={<SessionList/>}/>
        <Route path="/sessions/:id" element={<SessionEdit/>}/>
        <Route path="/restaurants" exact={true} element={<RestaurantList/>}/>
        <Route path="/restaurants/:id" element={<RestaurantEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;