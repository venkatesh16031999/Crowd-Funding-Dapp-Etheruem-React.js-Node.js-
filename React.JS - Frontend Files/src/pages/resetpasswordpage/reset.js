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
        password:"",
    }

  setpassword=()=>{

    const data={
        hash:this.props.match.params.token,
        password:this.state.password,
        date:Date.now()
    };
    axios.post('/ResetPassword',data).then(res=>{
        console.log(res.data);
    }).catch(e=>{
        console.log(e.message);
    })

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
                                <h2>Reset Password</h2>
                                <hr />
                            </Col>
                           <Col md={10}>
                           <Form>
                            <Form.Field className={styles.field}>
                            <Input icon='users' iconPosition='left' 
                            onChange={event=>this.setState({password:event.target.value})}
                            placeholder='Password' />
                            </Form.Field>
                            </Form>
                           </Col>
                           <Col md={10}>
                                <br />
                                <Button inverted color='red' className={styles.loginbutton} onClick={this.setpassword} >Set Password</Button>
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