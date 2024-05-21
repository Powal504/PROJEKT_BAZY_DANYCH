import React from 'react';
import Registration from './Registration/Registration';
import Home from './Home/Home';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import Movie_Add from './Movie_Add/Movie_Add'
import Forget_password from './Forget_password/Forget_password';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <div className='content'>
          <Navbar/>
            <Switch>
            <Route exact path="/"> <Home/> </Route>
            <Route exact path="/registration"> <Registration/></Route>
            <Route exact path="/login"> <Login/></Route>
            <Route exact path="/Movie_Add"> <Movie_Add/></Route>
            <Route exact path="/Forget_password"> <Forget_password/></Route>

          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;