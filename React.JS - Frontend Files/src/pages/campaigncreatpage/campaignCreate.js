import React,{Component} from 'react';
import { connect } from 'react-redux';

import {Row,Col,Card } from 'react-bootstrap';
import { Button, Form ,Icon,Message,Input,Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import styles from './createcampaign.module.css'

import Factory from '../../etheruem/factory';
import web3 from '../../etheruem/web3';

import * as actions from '../../store/actions/index';

import ipfs from '../../IPFS/ipfs';

import axios from '../../axios';


class CampaignCreate extends Component {

    state={
        minimumAmout:"",
        tag:"",
        description:"",
        title:"",
        loading:false,
        hashIpfs:""
    }

    uploadIPFS= async (file)=>{
    
       
        const reader=new window.FileReader();

        await reader.readAsArrayBuffer(file[0]);

         reader.onloadend= async ()=>{
            
           console.log(Buffer(reader.result));

           await ipfs.files.add(Buffer(reader.result),(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("result",result[0].hash);
                this.setState({
                    hashIpfs:result[0].hash
                });
            }
        })

        }

    }

    createContract=async()=>{


        this.setState({
            loading:true
        });


        if(this.state.hashIpfs){
            console.log(this.state.hashIpfs);


            const accounts=await web3.eth.getAccounts();

            const { minimumAmout , tag , description , title, hashIpfs } =this.state;
            let contract;
            let contractCount;
            let contractAddressAfterDeployed;
            try{
    
                 contract = await Factory.methods.createCampaign(web3.utils.toWei(minimumAmout,'ether'),tag,title,description,hashIpfs).send({
                    from:accounts[0]
                });
    
                contractCount=await Factory.methods.getDeployedCampaigns().call()
                contractAddressAfterDeployed=await Factory.methods.deployedCampaigns(contractCount-1).call();
    
    
                const data={
                    userid:this.props.userid,
                    contractAddress:contractAddressAfterDeployed.contractAddress,
                    tag:this.state.tag,
                    description:this.state.description,
                    title:this.state.title
                };
        
                this.props.updateContract(data);
        
                const dataDiscuss={
                    contractAddress:contractAddressAfterDeployed.contractAddress
                }
               
                axios.post('/initialDiscussCreate',dataDiscuss).then(res=>{
                    console.log(res.data);
                }).catch(e=>{
                    console.log(e.message);
                })

        
                this.props.history.push('/campaign');
    
            }
            catch(e){
                console.log(e.message);
            }


        }else{
            console.log("No Image added to ipfs");
        }


        this.setState({
            loading:false
        });
     
       
    }

    handleChange = (e, { value }) => this.setState({ tag:value })

    render(){
        const options = [
            { key: 'm', text: 'Technology', value: 'Technology' },
            { key: 'f', text: 'Personel Development', value: 'Personel Development' },
            { key: 'o', text: 'Science', value: 'Science' },
            { key: 'd', text: 'Gadgets', value: 'Gadgets' },
            { key: 'w', text: 'Others', value: 'Others' },
          ]

        return (
            <React.Fragment>
                <Row>
                    
                    <Col md={12} xs={12} className={styles.description}>
                        <p className={styles.descriptiontext}>Create Campaign - We help you to rule the future with your innovative idea </p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col md={11} xs={11} >
                    <Card style={{boxShadow:"1px 1px 3px grey"}}>
                        <Card.Body>
                        <Row>
                            <Col md={12} xs={12}>
                                <p className={styles.text}>Create Campaign</p>
                                <hr />
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={5}  className={styles.createpic}>
                                &nbsp;
                            </Col>
                            <Col md={6} xs={12}>
                                <Form>
                                    <Form.Field>
                                    <label>Minimum Amount To Join Your Campaign: </label>
                                    <Input 
                                    label={{ basic: true, content: 'Wei' }}
                                    labelPosition='right'
                                    placeholder='Minimum Amount' 
                                    onChange={(event)=>this.setState({minimumAmout:event.target.value})} />
                                    </Form.Field>
                                    <Form.Field>
                                    <label>Title Of Your Campaign: </label>
                                    <input placeholder='Title ' onChange={(event)=>this.setState({title:event.target.value})} />
                                    </Form.Field>
                                    <Form.Field>
                                    <label>Image Of The Campaign: </label>
                                    <input type="file" onChange={(event)=>this.uploadIPFS(event.target.files)} />
                                    </Form.Field>
                                    <Form.Select
                                        fluid
                                        label='Category Of Your Campaign: '
                                        options={options}
                                        placeholder='Select Category'
                                        onChange={this.handleChange}
                                    />
                                    <Form.TextArea label='Description' onChange={(event)=>this.setState({description:event.target.value})} placeholder='Tell us more about your project...' />
                                    <Button loading={this.state.loading} onClick={this.createContract} type='button'>Create Campaign</Button> 
                                   
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
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
              <br/><br/>

            </React.Fragment>
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
        updateContract:(data)=>dispatch(actions.updateUserContract(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CampaignCreate);