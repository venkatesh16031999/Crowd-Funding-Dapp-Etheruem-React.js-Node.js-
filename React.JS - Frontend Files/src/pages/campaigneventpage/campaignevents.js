import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import {Row,Col } from 'react-bootstrap';
import styles from './campaign.module.css';
import { Button, Icon , Pagination } from 'semantic-ui-react'





import Campaigncard from '../../components/CampaignCard/Campaigncard';

class Campaignevent extends Component{

    state = { activePage: 1 }

    handleInputChange = (e, { value }) => {
    
    this.setState({ activePage: value })


    }

    handlePaginationChange = (e, { activePage }) =>{
        this.setState({ activePage })
    }

    render(){
        
        return (
            <React.Fragment>
                <Row className="justify-content-center" style={{boxShadow:"0px 1px 5px grey"}}>
                    <Col className={styles.descriptionpic} md={8} xs={12}>
                        &nbsp;
                    </Col>
                    <Col className={styles.descriptionsection} md={4} xs={12}>
                        <h2 className={styles.headtop}>Instructions</h2>
                        <br />
                        <p className={styles.instructions}>Step 1: Choose the best Campaign.</p>
                        <p className={styles.instructions}>Step 2: Verify the Campaign.</p>
                        <p className={styles.instructions}>Step 3: Contribute to the Campaign.</p>
                        <p className={styles.instructions}>Step 4: Approves the actions of Campaign.</p>
                        <p className={styles.instructions}>Step 5: Get Shares from the final product.</p>
                        <br />
                    </Col>
                </Row>
                <hr />
                <Row className="justify-content-center mt-4">
                    <Col md={8} xs={6}>
                    <p className={styles.head}>Campaigns </p>
                    </Col>
                    <Col md={2} xs={6}>
                        <Link to="/campaign/create">
                            <Button icon labelPosition='right'>
                                Create Campaign
                                <Icon name='add' />
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <hr />
                <Row className={styles.cardscomponent}>
                        <Col md={10} className="justify-content-center">
                            <Row>
                                <Campaigncard pages={this.state.activePage}  />
                            </Row>
                        </Col>
                </Row>
                <Row className={styles.pagination}>
                    <Col className="justify-content-center text-center" md={8} xs={12}>
                            <Pagination 
                            defaultActivePage={5} 
                            totalPages={10}
                            siblingRange={0}
                            activePage={this.state.activePage}
                            onPageChange={this.handlePaginationChange}
                            />
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Campaignevent;