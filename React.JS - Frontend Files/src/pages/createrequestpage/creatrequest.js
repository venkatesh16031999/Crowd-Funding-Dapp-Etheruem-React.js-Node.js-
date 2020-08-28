import React,{Component} from 'react';

import { withRouter,Link } from 'react-router-dom';
import { Row,Col,Card } from 'react-bootstrap';

import styles from './request.module.css';

import Campaign from '../../etheruem/campaign';

import { Button, Message,Icon, Form } from 'semantic-ui-react'

import web3 from '../../etheruem/web3';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';


class Requestpage extends Component{

    state={
        recipient:"",
        amount:"",
        description:"",
        loading:false
    }

    createRequest= async ()=>{

        this.setState({
            loading:true
        });

        try{


            const accounts= await web3.eth.getAccounts();

            const CampaignContract=Campaign(this.props.match.params.address);
    
            const contract=await CampaignContract.methods.createRequest(this.state.description,web3.utils.toWei(this.state.amount,'ether'),this.state.recipient).send({
                from:accounts[0]
            });
    
            this.props.history.push(`http://localhost:3000/campaign/view/${this.props.match.params.address}/request`);


        }catch(e){
            console.log(e.message);
        }

        this.setState({
            loading:false
        });

    }

    render(){

        return (
            
            <Row className="justify-content-center">    
                <Col md={12} xs={11} >
                    <Row className={styles.description}>
                        <Col md={12}>
                            <p className={styles.descriptionText}>Create Request - Requirements Are Raised For Project Need.</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col md={11}>
                        <Card className={styles.card}>
                            <Card.Body className={styles.head}>
                               <Row className="justify-content-center">
                                   <Col md={6}>
                                       <br/>
                                   <p>Create Requests</p>
                                    <hr />
                                    <Form>
                                        <Form.Field>
                                        <label>Recipient Address</label>
                                        <input placeholder='Recipient Address'
                                        onChange={event=>{this.setState({recipient:event.target.value})}}
                                        />
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Transfer Amount</label>
                                        <input placeholder='Transfer Amount' 
                                        onChange={event=>{this.setState({amount:event.target.value})}}
                                        />
                                        </Form.Field>
                                        <Form.TextArea label='Description' placeholder='Tell us more about your Requirement...' 
                                        onChange={event=>{this.setState({description:event.target.value})}}
                                        />
                                        <Button loading={this.state.loading} type='submit' onClick={this.createRequest}>Create Request</Button>

                                        {this.state.loading ? <Message icon>
                                        <Icon name='circle notched' loading />
                                        <Message.Content>
                                        <Message.Header>Wait Patiently!.</Message.Header>
                                         Your Transaction might take 20 secs    
                                        </Message.Content>
                                    </Message> : null }

                                    </Form>
                                    <br/>
                                   </Col>
                                   <Col md={5} className={styles.side}>

                                   </Col>
                               </Row>

                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

        );
    }
}


const mapStateToProps=state=>{
    return {
        userid:state.user.userid,
        email:state.user.email,
        name:state.user.name,
        number:state.user.number,
        loggedIn:state.user.loggedIn,
        trusted:state.user.trusted
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        updateContractContribution:(data)=>dispatch(actions.updateUserContractContribution(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Requestpage));


