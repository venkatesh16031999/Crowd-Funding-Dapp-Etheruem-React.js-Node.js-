import React,{Component} from 'react';

import { Row,Col,Card } from 'react-bootstrap';

import styles from './request.module.css';

import { Button,Icon } from 'semantic-ui-react'

import web3 from '../../etheruem/web3';

import { Link } from 'react-router-dom';

import Campaign from '../../etheruem/campaign';

class Request extends Component{

    state={
        request:[],
        approveloading:-1,
        finalizeloading:-1
    }

    async componentDidMount(){


            try{

                const accounts=await web3.eth.getAccounts();
                const CampaignContract=Campaign(this.props.match.params.address);

        const requestCount=await CampaignContract.methods.getRequestsCount().call();
        const approversCount=await CampaignContract.methods.approversCount().call();

        if(requestCount>0){

            let requestdata=[];

            for(let i=0;i<requestCount;i++){

                await CampaignContract.methods.requests(i).call()
                .then(requestList=>{


                    const data={
                        recipient:requestList[2],
                        amount:web3.utils.fromWei(requestList[1],'ether'),
                        description:requestList[0],
                        approved:requestList[4],
                        pending:approversCount,
                        complete:requestList[3]
                    }
                    console.log(requestList);
                    requestdata.push(data);

                })

            }

            this.setState({
                request:requestdata
            });


            }
        }catch(e){
            console.log(e.message)
        }

        }

    

    approve=async (index)=>{

        this.setState({
            approveloading:index
        });
        
       try{

        const accounts=await web3.eth.getAccounts();

        const CampaignContract=Campaign(this.props.match.params.address);

        await CampaignContract.methods.approveRequest(index).send({
            from:accounts[0]
        });


       }catch(e){
           console.log(e.message);
       }

        this.setState({
            approveloading:-1
        });
        

    }

    finalize=async (index)=>{


        this.setState({
            finalizeloading:index
        });
        
       try{

        const accounts=await web3.eth.getAccounts();

        const CampaignContract=Campaign(this.props.match.params.address);

        await CampaignContract.methods.finalizeRequest(index).send({
            from:accounts[0]
        });


       }catch(e){
           console.log(e.message);
       }

        this.setState({
            finalizeloading:-1
        });


    }


    render(){


        const requestsCard=this.state.request.map((data,index)=>{
            return (

                <Card className={styles.card} >
                <Card.Body className={`${styles.cardbody} ${ data.approved>=data.pending ? styles.cardbodygreen : null} ${data.complete ? styles.cardbodyred : null} `}>
                    <Row >
                        <Col md={3} className="text-center">
                        {data.recipient}
                        </Col>
                        <Col md={3} className="text-center">
                        {data.description}
                        </Col>
                        <Col md={2} className="text-center">
                        {data.amount}
                        </Col>
                        <Col md={2} className="text-center">
                        {data.pending} / {data.approved}
                        </Col>
                        <Col md={1} className="text-center">
                            <Button disabled={data.complete} loading={this.state.approveloading==index} onClick={()=>this.approve(index)} content='Approve' primary />
                        </Col>
                        <Col md={1} className="text-center">
                            <Button disabled={data.approved<data.pending || data.complete} loading={this.state.finalizeloading==index} onClick={()=>this.finalize(index)} content='Finalize' primary />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            );
        })


        return(

        <Row className="justify-content-center mt-4">
            <Col md={11} xs={11}>
            <Card className={styles.cardwrapper}>
                <Card.Body>

                <Row className="justify-content-center ">
                    <Col md={8} xs={6}>
                        <p className={styles.head}>Requests</p>
                    </Col>
                    <Col md={2} xs={6}>
                        <Link to={`/campaign/view/${this.props.match.params.address}/createrequest`}>
                            <Button icon labelPosition='right'>
                                Create Request
                                <Icon name='add' />
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12}>
                    
                    <Card className={styles.card}>
                        <Card.Body className={styles.cardhead}>
                            <Row>
                                <Col md={3} className="text-center">
                                    Recipient Address
                                </Col>
                                <Col md={3} className="text-center">
                                    Description
                                </Col>
                                <Col md={2} className="text-center">
                                    Transfer Amount
                                </Col>
                                <Col md={2} className="text-center">
                                    Pending / Approved
                                </Col>
                                <Col md={1} className="text-center">
                                    Approve
                                </Col>
                                <Col md={1} className="text-center">
                                    Finalize
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                            {requestsCard}
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </Col>
        </Row>            

        );
    }

}


export default Request;