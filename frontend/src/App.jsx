import React from 'react';
import Registration from './Registration/Registration';
import Home from './Home/Home';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import Movie_Add from './Movie_Add/Movie_Add'
import Forget_password from './Forget_password/Forget_password';
import Films from './Films/Films';
import Lists from './Lists/Lists';
import Reviews from "./Reviews/Reviews"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './GlobalContext/GlobalContext';
import Search from './Search/Search';
import Profile from './Profile/Profile';
import ReviewsBox from './ReviewsBox/ReviewsBox';
import Admin from './Admin/Admin';
import Users_Info from './Users_Info/Users_Info';
import Films_Info from './Films_Info/Films_Info';

function App() {
  return (
    <>
      <Router>
        <div className='content'>
          <Navbar/>
            <Switch>
            <Route exact path="/"> <Home/> </Route>
            <Route exact path="/registration"> <Registration/></Route>
            <Route exact path="/Login"> <Login/></Route>
            <Route exact path="/Admin/Movie_Add"> <Movie_Add/></Route>
            <Route exact path="/Forget_password"> <Forget_password/></Route>
            <Route exact path="/Films"> <Films/></Route>
            <Route exact path="/Lists"> <Lists/></Route>
            <Route exact path="/Search"> <Search/></Route>
            <Route exact path="/Profile"><Profile/></Route>
            <Route exact path="/Admin"><Admin></Admin></Route>
            <Route exact path="/Admin/Users_Info"><Users_Info></Users_Info></Route>
            <Route exact path="/Admin/Films_Info"><Films_Info></Films_Info></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;