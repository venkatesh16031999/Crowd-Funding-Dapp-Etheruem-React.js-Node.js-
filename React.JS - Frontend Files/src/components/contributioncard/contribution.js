import React,{Component} from 'react';
import { Button,Icon, Item,Image, Label } from 'semantic-ui-react'
import { Row,Col,Card }  from 'react-bootstrap';
import {Link} from 'react-router-dom';

import styles from './card.module.css';

class ContributionCard extends Component{
    render(){

        

        const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

        return (

                <Card className={styles.card}>
                <Card.Body>
                    <Row>
                        <Col md={2}>
                        <p><b>Contributed Amount: {this.props.contracts.contributedAmount} </b></p>
                        </Col>
                        <Col md={6}>
                            <p><b>Contract Address :</b>{this.props.contracts.contractAddress}</p>
                        </Col>
                        <Col md={2}>
                        <p><b>Campaign Title: {this.props.contracts.title} </b></p>
                        </Col>
                        <Col md={2}>
                            <Link to={`/campaign/view/${this.props.contracts.contractAddress}&${this.props.contracts.title.replace(/\s/g,"_")}`} ><Button primary>Go To Campaign</Button></Link>
                        </Col>
                    </Row>

                </Card.Body>
                </Card>

        );
    }
}

export default ContributionCard;