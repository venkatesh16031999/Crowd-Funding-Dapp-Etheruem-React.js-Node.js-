import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  Image , Label , Tab} from 'semantic-ui-react'
import { Container,Row,Col } from 'react-bootstrap';
import styles from './profile.module.css';
import * as actions from '../../store/actions/index';



import Contributecard from '../../components/contributioncard/contribution';

import Crowdfunding from '../../homepic.jpg';

import Card from '../../components/profilecard/card';

class Profile extends Component{

    uploadImage=(name,file)=>{

     this.props.imageUploadFunc(file,this.props.email);

      }

    render(){

        let cards=<h2><b>No Campaigns Found</b></h2>;

        let contributioncards=<h2><b>No Contributions Found</b></h2>;


        if(this.props.contracts.campaigns.length>0){

        cards=this.props.contracts.campaigns.map(data=>{
            return <Card contracts={data} />
        });

        }


        if(this.props.contributedContracts.campaigns.length>0){

            contributioncards=this.props.contributedContracts.campaigns.map(data=>{
            return <Contributecard contracts={data} />
        });
    
        }


        const panes = [
            {
                menuItem: {  icon: 'users', content: 'Contributions' },
              render: () => <Tab.Pane attached={false} className="text-center">
                        {contributioncards}

                  </Tab.Pane>,
            },
            {
                menuItem: {  icon: 'users', content: 'Your Campaign' },
              render: () => <Tab.Pane attached={false} >

                        {cards}

              </Tab.Pane>,
            },
          ]

         

        return (
            
            <React.Fragment>

            <Container >
                <Row className={styles.profilewrapper}>
                    <Col md={3} className={styles.center} >
                        <Row className="justify-content-center">
                            <Col md={12} xs={12} className="justify-content-center text-center">
                                <div  className=" d-flex justify-content-center text-center">
                                <Image style={{width:"150px",height:"150px"}} src={"https://crowdfunding-dapp-backend.herokuapp.com/"+this.props.image} size="small" />
                                </div>
                            </Col>
                            
                            <Col md={12} xs={12} className="justify-content-center text-center mt-3">
                            <input className={styles.customfileinput} type="file" onChange={(event)=>this.uploadImage(event.target.value,event.target.files)} />
                            </Col>
                        </Row>

                    </Col>
                    <Col  md={9}  >
                        <p className={styles.profileheading}>Profile Detail : </p>
                        <hr />

                        <Row>
                            <Col md={3}>
                            <Label size="medium">
                            <p style={{fontSize:"14px"}} >Name : {this.props.name}</p>
                            </Label>
                            </Col>
                     
                            <Col md={3}>
                            <Label size="medium">
                            <p style={{fontSize:"14px"}} >Email : {this.props.email}</p>
                        </Label>
                            </Col>
                       
                            <Col md={3}>
                            <Label size="medium">
                            <p style={{fontSize:"14px"}} >Number : {this.props.number}</p>
                        </Label>
                            </Col>
                        
                        
                            <Col md={3}>
                            <Label size="medium">
                            <p style={{fontSize:"14px"}} >Trusted By : {this.props.trusted} peoples</p>
                            </Label>
                            </Col>
                        </Row>
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
        trusted:state.user.trusted,
        contracts:state.user.contracts,
        contributedContracts:state.user.contributedContracts,
        image:state.user.image
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        imageUploadFunc: (file,email)=> dispatch(actions.imageUploader(file,email))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);