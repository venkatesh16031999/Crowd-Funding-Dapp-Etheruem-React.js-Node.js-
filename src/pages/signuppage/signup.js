import React, { Component } from 'react';
import styles from  './signup.module.css'
import {Container,Row,Col} from 'react-bootstrap';
import { Form, Input , Button } from 'semantic-ui-react'
import { Link , Redirect } from "react-router-dom"; 
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Signup extends Component{
    state={
        name:"",
        number:"",
        email:"",
        password:"",
        userData:""
    }

    register= ()=>{
        
        const data={
            name:this.state.name,
            email:this.state.email,
            number:this.state.number,
            trusted:0,
            contracts:{
                campaigns:[]
            },
            password:this.state.password
        }

        this.props.userRegiter(data);
    }

    render(){


        const component=this.props.email!="" ? <Redirect to={`/campaign`} /> : null;

    return (

        

       <div className={styles.wrapper}>
           {component}
            <Container>
                <Row className="justify-content-center" >
                    <Col md={6} xs={10} className={styles.formwrapper}>
                        <Row  className="justify-content-center">
                            <Col md={10} className="justify-content-center">
                            <br />
                            
                            <Button.Group size='large'>
                            <Link to="/login"><Button >Sign In</Button></Link>
                                <Button.Or />
                                <Link to="/register"><Button active inverted color='red' >Sign Up</Button></Link>
                            </Button.Group>
                            <br />
                            <br />
                            </Col>
                           <Col md={10}>
                           <Form>
                           <Form.Field className={styles.field}>
                            <Input icon='address book' iconPosition='left' placeholder='Name' onChange={(event)=>{ this.setState({name:event.target.value}) }} />
                            </Form.Field>
                            <Form.Field className={styles.field}>
                            <Input icon='phone' iconPosition='left' placeholder='Phone Number' onChange={(event)=>{ this.setState({number:event.target.value}) }} />
                            </Form.Field>
                            <Form.Field className={styles.field}>
                            <Input icon='users' iconPosition='left' placeholder='Email Id' onChange={(event)=>{ this.setState({email:event.target.value}) }} />
                            </Form.Field>
                            <Form.Field className={styles.field}>
                            <Input icon='keyboard' iconPosition='left' placeholder='Password' onChange={(event)=>{ this.setState({password:event.target.value}) }} />
                            </Form.Field>
                            </Form>
                           </Col>
                           <Col md={10}>
                                <br />
                                <Button inverted color='red' className={styles.loginbutton} onClick={this.register}>Register</Button>
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
        userRegiter: (data) => dispatch(actions.userRegisteration(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);