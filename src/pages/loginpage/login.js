import React,{ Component } from 'react';
import styles from  './login.module.css'
import {Container,Row,Col} from 'react-bootstrap';
import { Form, Input , Button } from 'semantic-ui-react'
import { Link } from "react-router-dom"; 

class Login extends Component{

login=()=>{



}

render(){
    return (
       
       <div className={styles.wrapper}>
           
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
                            <Input icon='users' iconPosition='left' placeholder='Email Id' />
                            </Form.Field>
                            <Form.Field className={styles.field}>
                            <Input icon='keyboard' iconPosition='left' placeholder='Password' />
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
                                <button className={styles.forgetpassword}>Forgrt password ?</button>
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

export default Login;