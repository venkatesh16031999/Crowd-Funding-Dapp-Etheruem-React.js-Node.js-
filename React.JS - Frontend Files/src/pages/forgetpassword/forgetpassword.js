import React,{ Component } from 'react';
import styles from  './forget.module.css'
import {Container,Row,Col} from 'react-bootstrap';
import { Form, Input , Button } from 'semantic-ui-react'
import { Link , Redirect } from "react-router-dom"; 

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import axios from '../../axios';

class Login extends Component{

    state={
        email:"",
    }

getMail=()=>{

    const data={
        email:this.state.email
    }

    axios.post('/ForgetPassword',data).then(res=>{
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
                                <h2>Forget Password</h2>
                                <hr />
                            </Col>
                           <Col md={10}>
                           <Form>
                            <Form.Field className={styles.field}>
                            <Input icon='users' iconPosition='left' 
                            onChange={event=>this.setState({email:event.target.value})}
                            placeholder='Email Id' />
                            </Form.Field>
                            </Form>
                           </Col>
                           <Col md={10}>
                                <br />
                                <Button inverted color='red' className={styles.loginbutton} onClick={this.getMail} >Get Mail</Button>
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