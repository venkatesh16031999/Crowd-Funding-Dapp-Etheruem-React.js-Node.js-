import React,{Component} from 'react';

import { withRouter,Link } from 'react-router-dom';
import { Row,Col,Card as Bcard } from 'react-bootstrap';

import styles from './viewcampaign.module.css';

import Campaign from '../../etheruem/campaign';

import { Button, Input, Form,Message,Icon,Statistic,List,Image } from 'semantic-ui-react'

import web3 from '../../etheruem/web3';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import axios from '../../axios';

import MessageBox from '../../components/message/message';

class Viewpage extends Component{


    state={
          minimumContribution:0,
          balance:0,
          requests:0,
          approversCount:0,
          manager:"",
          contribute:0,
          loading:false,
          contributorsList:[]
    }

    async componentDidMount(){

        const CampaignContract=Campaign(this.props.match.params.address.split("&")[0]);

      try{

        const summaryData=await CampaignContract.methods.getSummary().call();
        

        this.setState({
            minimumContribution:web3.utils.fromWei(summaryData[0],'ether'),
            balance:web3.utils.fromWei(summaryData[1],'ether'),
            requests:summaryData[2],
            approversCount:summaryData[3],
            manager:summaryData[4],
        });

        const contributorsListArray=[];

        for(let i=0;i<this.state.approversCount;i++){
            let contributorList=await CampaignContract.methods.approversList(i).call();
            contributorsListArray.push(contributorList);
        }

        this.setState({
            contributorsList:contributorsListArray
        });

      }catch(e){
        console.log(e.message);
      }

    }

    submitContribute= async ()=>{

        const CampaignContract=Campaign(this.props.match.params.address.split("&")[0]);

        let error=false;

        this.setState({
            loading:true
        });

       try{

        const accounts=await  web3.eth.getAccounts();

        await CampaignContract.methods.contribute().send({
            from:accounts[0],
            value:web3.utils.toWei(this.state.contribute,'ether')
        });

       }catch(e){
            console.log(e.message);
            error=true;
       }

       if(!error){

        const data={
            userid:this.props.userid,
            contractAddress:this.props.match.params.address.split("&")[0],
            contributedAmount:this.state.contribute,
            title:this.props.match.params.address.split("&")[1]
        } 

        this.props.updateContractContribution(data);

       }

       this.setState({
        loading:false
    });

    }


    render(){

        let contributorCard;

        if(this.state.contributorsList.length!=0){

            contributorCard=this.state.contributorsList.map((data,index)=>{
                return (

            <Bcard style={{padding:"15px",borderRadius:"0px",borderLeft:"4px solid #2185d0"}}>
                <List.Item>
                    <List.Content>
                        <List.Header as='a'> {data}</List.Header>
                        <List.Description>
                        </List.Description>
                    </List.Content>
                </List.Item>
            </Bcard>

                );
            })

        }else{
            contributorCard=(
            <Bcard className="text-center" style={{padding:"20px"}}>
                <h4>No Contributors Found</h4>
            </Bcard>)
        }

        return (
            
            <Row >    
                <Col md={12} xs={12} >
                    <Row className={styles.description}>
                        <Col md={12}>
                            <p className={styles.descriptionText}>Welcome {this.props.name}</p>
                        </Col>
                        <Col md={10} >
                            <Row className="justify-content-center">
                                <Col md={3} className={styles.carddesc}>
                                <Bcard className={styles.cardItem}>
                                <Bcard.Body >
                                    <p><b>Contributers</b></p>
                                    <hr />
                                    <Statistic horizontal>
                                        <Statistic.Value>{this.state.approversCount}</Statistic.Value>
                                        <Statistic.Label>Contributors</Statistic.Label>
                                    </Statistic>
                                    
                                </Bcard.Body>
                                </Bcard>
                                </Col>
                                <Col md={3} className={styles.carddesc}>
                                <Bcard  className={styles.cardItem}>
                                <Bcard.Body>
                                <p><b>Balance:</b></p>
                                <hr />
                                    
                                    <Statistic horizontal>
                                        <Statistic.Value>{this.state.balance}</Statistic.Value>
                                        <Statistic.Label>Balance</Statistic.Label>
                                    </Statistic>
                                </Bcard.Body>
                                </Bcard>
                                </Col>
                                <Col md={3} className={styles.carddesc}>
                                <Bcard  className={styles.cardItem}>
                                <Bcard.Body>
                                <p><b>Minimum Amount: </b></p>
                                <hr />
                                    
                                    <Statistic horizontal>
                                        <Statistic.Value>{this.state.minimumContribution}</Statistic.Value>
                                        <Statistic.Label>Minimum Amount</Statistic.Label>
                                    </Statistic>
                                </Bcard.Body>
                                </Bcard>
                                </Col>
                                <Col md={3} className={styles.carddesc}>
                                <Bcard  className={styles.cardItem}>
                                <Bcard.Body>
                                <p><b>Campaign Title</b></p>
                                <hr />
                                <Statistic horizontal>
                                        <Statistic.Label>{this.props.match.params.address.split("&")[1]}</Statistic.Label>
                                </Statistic>
                                </Bcard.Body>
                                </Bcard>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row className={styles.contribute}>
                        <Col md={7} xs={11} >
                            <Row>

                                <Col md={12}>
                                
                                <Row>
                                    <Col md={10}>
                                    <p className={styles.heading}>Contribute To This Campaign</p>
                                    </Col>
                                    <Col md={2}>
                                    <Link to={`/campaign/view/${this.props.match.params.address.split("&")[0]}/discussions`}>
                                    <Button color="green" type='button'>Discussion</Button>
                                    </Link>
                                    </Col>
                                </Row>
                            <hr />
                            <Bcard className={styles.bcard}>
                            <Bcard.Body>
                                
                                <Row>
                                    <Col md={3} xs={12} >
                                        <b>Contribution Amount : </b>
                                    </Col>
                                    <Col md={7} xs={12} >
                                    <Form >
                                        <Form.Field>
                                        <label>Enter above {this.state.minimumContribution} Ether :</label>
                                        <Input placeholder='Ether' 
                                        
                                        label={{ basic: true, content: 'Wei' }}
                                        labelPosition='right'
                                        onChange={(event=>this.setState({contribute:event.target.value}))}
                                        
                                        />
                                        </Form.Field>
                                        <Button type='button' loading={this.state.loading} onClick={this.submitContribute}>Contribute</Button>
                                        {this.state.loading ? <Message icon>
                                        <Icon name='circle notched' loading />
                                        <Message.Content>
                                        <Message.Header>Wait Patiently!.</Message.Header>
                                         Your Transaction might take 20 secs    
                                        </Message.Content>
                                        </Message> : null }
                                    </Form>
                                    </Col>
                                </Row>


                            </Bcard.Body>
                            </Bcard>
                                
                                </Col>
                                        
                                <Col md={12} className="mt-4">

                                <Bcard className={styles.bcard} >
                                    <Bcard.Body className="text-center" >
                                    <label><b>Click here to approve requests :</b> &nbsp;</label>        
                                    <Link to={`/campaign/view/${this.props.match.params.address.split("&")[0]}/request`}><Button primary type='button'>View Requests</Button></Link>
                                    </Bcard.Body>
                                </Bcard>

                                </Col>

                            </Row>
                        </Col>
                        <Col md={4} xs={12} >
                            
                                <Bcard className={styles.bcard} >
                                    <Bcard.Body className="text-center" >
                                    <label><b>Contributors of this campaign:</b> &nbsp;</label>
                                    <hr />


                                <List>
                                    {contributorCard}
                                </List>


                                    </Bcard.Body>
                                </Bcard>
                        </Col>
                    </Row>
                    <br/>
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Viewpage));


