import React,{Component} from 'react';
import {Row,Col,Card } from 'react-bootstrap';
import { Button, Form ,Icon,Message,Input,Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import styles from './createcampaign.module.css'

import Factory from '../../etheruem/factory';
import web3 from '../../etheruem/web3';


class CampaignCreate extends Component {

    state={
        minimumAmout:"",
        tag:"",
        description:"",
        title:"",
        loading:false
    }

    createContract=async()=>{
        this.setState({
            loading:true
        });
        console.log(this.state);

       const accounts=await web3.eth.getAccounts();

        const { minimumAmout , tag , description , title } =this.state;
        let contract;
        try{

             contract = await Factory.methods.createCampaign(web3.utils.toWei(minimumAmout,'ether'),tag,title,description).send({
                from:accounts[0]
            });

        }
        catch(e){
            console.log(e.message);
        }

       console.log("Contract deployed: ",contract);

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
              

            </React.Fragment>
        );
    }
}

export default CampaignCreate;