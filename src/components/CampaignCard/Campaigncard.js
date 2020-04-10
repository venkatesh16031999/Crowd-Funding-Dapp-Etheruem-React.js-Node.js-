import React,{Component} from 'react';
import { Button, Icon, Image, Item, Label , Card } from 'semantic-ui-react'

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/contractsAction';

import styles from './cards.module.css';

import { Col } from 'react-bootstrap';
 
class Campaigncard extends Component{

    componentDidMount(){
           this.props.contractFetch();
   }

    render(){

        const cards=this.props.contract.contracts.map(data=>{
            return (
                <Col md={3} xs={12}  className={styles.center}>
                        <Card className="justify-content-center">
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{data.title}</Card.Header>
                        <hr />
                        <Item.Extra>
                        <Label>#{data.tag}</Label>
                        </Item.Extra>
                        <br />
                        <Card.Description>
                        {data.description}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Link to={`/campaign/${data.address}`}>
                            <Button primary floated='right'>
                                View Campaign
                                <Icon name='right chevron' />
                            </Button>
                            </Link>
                        </Card.Content>
                    </Card>
            </Col>

            );
        })

        return (

            <React.Fragment>
                {cards}
            </React.Fragment>

        );
    }
}

const mapPropsToState=state=>{
    return {
        contract:state.contract
    }
}

const mapPropsToDispatch=dispatch=>{
    return {
        contractFetch:()=> dispatch(actions.setContractData()),
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)(Campaigncard);
