import React from 'react';
import Registration from './Registration/Registration';
import Home from './Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <div className='content'>
          <Switch>
            <Route exact path="/"> <Home/> </Route>
            <Route exact path="/registration"> <Registration/> </Route> 
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;