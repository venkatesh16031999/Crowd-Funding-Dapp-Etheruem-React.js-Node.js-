import React,{Component} from 'react';
import { Button, Icon, Image, Item, Label , Card } from 'semantic-ui-react'

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/contractsAction';

import styles from './cards.module.css';

import { Col } from 'react-bootstrap';

import Spinner from '../spinner/spinner'; 
 
class Campaigncard extends Component{

    componentDidMount(){
           this.props.contractFetch(this.props.pages);
   }

   componentDidUpdate(prevProps) {
  
    if (this.props.pages !== prevProps.pages) {

        this.props.contractFetch(this.props.pages);
    }
  }

    render(){

        console.log(this.props.pages);

        let cards;

        if(this.props.contract.contracts.length==0){
            cards=<Spinner />
        }else{

               cards=this.props.contract.contracts.map(data=>{
            return (
                <Col md={3} xs={12}  className={styles.center}>
                        <Card className={styles.card}>
                        <div>
                        <Image src={`https://ipfs.io/ipfs/${data.imageHash}`} style={{height:"250px",width:"100%"}} />
                        </div>
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
                            <Link to={`/campaign/view/${data.address}&${data.title.replace(/\s/g,"_")}`}>
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


        }


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
        contractFetch:(pages)=> dispatch(actions.setContractData(pages)),
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)(Campaigncard);
