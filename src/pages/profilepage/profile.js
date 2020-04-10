import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  Image , Label , Tab } from 'semantic-ui-react'
import { Container,Row,Col } from 'react-bootstrap';
import styles from './profile.module.css';

import Crowdfunding from '../../homepic.jpg';

class Profile extends Component{
    render(){

        const panes = [
            {
                menuItem: {  icon: 'users', content: 'Contributions' },
              render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
            },
            {
                menuItem: {  icon: 'users', content: 'Your Campaign' },
              render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
            },
          ]


        return (
            
            <React.Fragment>

            <Container >
                <Row className={styles.profilewrapper}>
                    <Col md={3} className={styles.center} >
                        <Image src='https://fistosports.com/uploads/author/643f9badc71308b739b6307ae6b26552.png' size='small' rounded />
                    </Col>
                    <Col  md={9}  >
                        <p className={styles.profileheading}>Profile Detail : </p>
                        <hr />
                        <Label size="medium">
                        <p style={{fontSize:"14px"}} >Name : {this.props.name}</p>
                        </Label>
                        
                        <Label size="medium">
                            <p style={{fontSize:"14px"}} >Email : {this.props.email}</p>
                        </Label>
                        
                        <Label size="medium">
                            <p style={{fontSize:"14px"}} >Number : {this.props.number}</p>
                        </Label>
                        
                        <Label size="medium">
                            <p style={{fontSize:"14px"}} >Trusted By : {this.props.trusted} peoples</p>
                        </Label>
                        
                    </Col>
                </Row>
            </Container>
            <br />
            <Container-fluid >
                <Row className="justify-content-center">
                    <Col md={10} xs={11} >
                        <Tab menu={{ color:'red' , secondary: true }} panes={panes} />   
                    </Col>
                </Row>
            </Container-fluid>
            

            </React.Fragment>

        );
    }
}

const mapStateToProps=state=>{
    return {
        email:state.user.email,
        name:state.user.name,
        number:state.user.number,
        loggedIn:state.user.loggedIn,
        trusted:state.user.trusted
    }
}

const mapDispatchToProps=dispatch=>{
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);