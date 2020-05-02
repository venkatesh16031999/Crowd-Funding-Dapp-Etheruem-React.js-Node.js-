import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import Main from './pages/mainpage/main';
import Login from './pages/loginpage/login';
import Register from './pages/signuppage/signup';
import ResetPassword from './pages/resetpasswordpage/reset';
import ForgetPassword from './pages/forgetpassword/forgetpassword';
import axios from './axios';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component{

  componentDidMount(){

    if(localStorage.getItem('token') && Date.now() < localStorage.getItem('expiresIn')){
      this.props.loginLoad();
    }else{
      this.props.logout();
    }

  }


  render(){

    return (
      <div>
        <Switch>
        <Route path="/resetpassword/:token"  component={ResetPassword} />
        <Route path="/forgetpassword"  component={ ForgetPassword} />
          <Route path="/register"  component={Register} />
          <Route path="/login"  component={Login} />
          <Route path="/campaign"  component={Main} />
          <Route path="/" exact component={HomePage} />
          </Switch>
      </div>
    );

  }
}

const mapStateToProps=state=>{
  return {

  }
}

const mapDispatchToProps=dispatch=>{
  return {
      loginLoad:()=> dispatch(actions.loginLoadUsingJWT()),
      logout:()=> dispatch(actions.logoutRedirect())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
