import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import {Route,Switch} from 'react-router-dom';
import Navbar from './MyComponents/Navbar';
import Home from './MyComponents/Home';
import Contact from './MyComponents/Contact';
import About from './MyComponents/About';
import Login from './MyComponents/Login';
import Signup from './MyComponents/Signup';
import Errorpage from './MyComponents/Errorpage'
const App = () => {
  return (
    <>
      <Navbar />
    <Switch>  
      <Route exact path = "/">
        <Home />
      </Route>
      <Route  path = "/about">
        <About />
      </Route>
      <Route path = "/contact">
        <Contact />
      </Route>
      <Route path = "/login">
        <Login />
      </Route>
      <Route path = "/signup">
        <Signup />
      </Route>

      <Route>
        <Errorpage/>
      </Route>
    </Switch>  
    </>
  )
}

export default App
