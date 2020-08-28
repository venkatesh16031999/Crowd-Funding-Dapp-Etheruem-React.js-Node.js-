import React,{Component} from 'react';
import { Row,Col,Card } from 'react-bootstrap';
import styles from './discuss.module.css';
import { Form } from 'semantic-ui-react'
import axios from '../../axios';
import { connect } from 'react-redux';
import socketConnect from 'socket.io-client';

class Discuss extends Component{

    state={
        descriptionPost:"",
        messages:[]
    }

    componentDidMount(){

        console.log(this.props.match.params.address);

        axios.post('/getAllMessages',{contractAddress:this.props.match.params.address})
        .then(res=>{
            
            this.setState({
                messages:res.data.messages.messages
            });

        })
        .catch(err=>{
            console.log(err.message);
        });

        const socket= socketConnect('http://localhost:3001');

        socket.on('post',data=>{
            
            const mes=[...this.state.messages];

            mes.push(data.post);

            this.setState({
                messages:mes
            });

        });

    }

    createMessage=()=>{

        const data={
            name:this.props.name,
            email:this.props.email,
            image:this.props.image,
            description:this.state.descriptionPost,
            contractAddress:this.props.match.params.address
        }


        axios.post('/discussAdd',data).then(res=>{
            console.log(res.data);
        }).catch(e=>{
            console.log(e.message);
        })

    }

     msToHMS= ms => {
       
        var seconds = ms / 1000;
 
        var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
   
        var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  
        seconds = seconds % 60;
        return hours/24;
    }
     
    msToh= ms => {
       
        var seconds = ms / 1000;
        
        var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour

        return hours;
    }

    msTom= ms => {
       
        var seconds = ms / 1000;
 
        var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute

        return seconds;
    }
       

    render(){

        let messagesCard;

        if(this.state.messages.length>0){

            messagesCard=this.state.messages.map(data=>{

                let date=this.msToHMS( (new Date())-(new Date(data.date)) )

                return (
                    <Card className={styles.card}>
                    <Row >
                    <Col md={2} className="text-md-center">
                        <img src={`http://localhost:3001/${data.image}`} style={{height: "70px",width: "70px",borderRadius: "50%"}} />
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={10}>
                            <b>{data.name} Posted This Message</b>
                            </Col>
                            <Col md={2}>
                                {
                                    <b>{`${ parseInt(date)!=0 ? `${parseInt(date)} Days Ago` : 'Today' } `}</b>
                                }
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={12}>
                            {data.description}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </Card>
                );

            })

        }else{

            messagesCard=(
                <Card className={styles.card}>
                <h2 className="text-center">No Messages Found</h2>
                </Card>
            );

        }

        return (

            <React.Fragment>

            <Row className={styles.description}>
                <Col md={12}>
                    <p className={styles.descriptionText}>Discussions</p>
                </Col>
            </Row>

            <Row className="justify-content-center">

                <Col md={3}>
                    <Card className={styles.post}>
                        <Form>
                            <Form.TextArea 
                            onChange={(event)=>{this.setState({descriptionPost:event.target.value})}}
                            label='Type Your Message..' placeholder='Type Your Opinions and thoughts...' />
                            <Form.Button onClick={this.createMessage} color="green">Post</Form.Button>
                        </Form>
                    </Card>
                </Col>

                 <Col md={8}>
                    
                

                    {messagesCard}

                

                </Col>
              
            </Row>

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
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Discuss);