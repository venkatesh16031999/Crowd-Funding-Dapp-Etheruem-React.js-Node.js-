import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import Main from './pages/mainpage/main';
import Login from './pages/loginpage/login';
import Register from './pages/signuppage/signup';

class App extends Component{

  render(){

    return (
      <div>
        <Switch>
          <Route path="/register"  component={Register} />
          <Route path="/login"  component={Login} />
          <Route path="/campaign"  component={Main} />
          <Route path="/" exact component={HomePage} />
          </Switch>
      </div>
    );

  }
}

export default App;
