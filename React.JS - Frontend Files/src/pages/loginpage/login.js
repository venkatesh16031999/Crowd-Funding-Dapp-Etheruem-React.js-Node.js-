import React,{ Component } from 'react';
import styles from  './login.module.css'
import {Container,Row,Col} from 'react-bootstrap';
import { Form, Input , Button } from 'semantic-ui-react'
import { Link , Redirect } from "react-router-dom"; 

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import axios from '../../axios';

class Login extends Component{

    state={
        email:"",
        password:""
    }

login=()=>{

    

    const data={
        email:this.state.email,
        password:this.state.password
    }

    this.props.userLogin(data);
}

forgetPassword=()=>{

this.props.history.push("/forgetpassword");

}

render(){
    return (
       
       <div className={styles.wrapper}>

           {this.props.loggedIn ? <Redirect to="/campaign" /> : null}
           
            <Container>
                <Row className="justify-content-center" >
                    <Col md={6} xs={10} className={styles.formwrapper}>
                        <Row  className="justify-content-center">
                            <Col md={10} className="justify-content-center">
                            <br />
                            <Button.Group size='large'>
                                <Link to="/login"><Button active inverted color='red' >Sign In</Button></Link>
                                <Button.Or />
                                <Link to="/register"><Button  >Sign Up</Button></Link>
                            </Button.Group>
                            <br />
                            <br />
                            </Col>
                           <Col md={10}>
                           <Form>
                            <Form.Field className={styles.field}>
                            <Input icon='users' iconPosition='left' 
                            onChange={event=>this.setState({email:event.target.value})}
                            placeholder='Email Id' />
                            </Form.Field>
                            <Form.Field className={styles.field}>
                            <Input icon='keyboard' 
                            iconPosition='left' 
                            placeholder='Password'
                            type="password"
                            onChange={event=>this.setState({password:event.target.value})}
                            />
                            </Form.Field>
                            </Form>
                           </Col>
                           <Col md={10}>
                                <br />
                                <Button inverted color='red' className={styles.loginbutton} onClick={this.login} >Login</Button>
                                <br />
                            </Col>
                            <Col md={10}>
                            <br />
                                <button 
                                className={styles.forgetpassword}
                                onClick={this.forgetPassword}
                                >Forgrt password ?</button>
                            <br />
                            <br />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div>

    );
    }
}

const mapStateToProps= state =>{
    return {
        email:state.user.email,
        name:state.user.name,
        number:state.user.number,
        loggedIn:state.user.loggedIn
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        userLogin: (data) => dispatch(actions.userLoginRedirect(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);