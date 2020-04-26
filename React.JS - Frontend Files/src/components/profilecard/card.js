import React,{Component} from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

import { Link } from 'react-router-dom';

class Card extends Component{
    render(){

        const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

        return (

            <Item.Group divided>
        
            <Item>
              <Item.Image  style={{width:"125px",height:"120px"}} src='https://fistosports.com/uploads/author/643f9badc71308b739b6307ae6b26552.png' />
        
              <Item.Content>
                <Item.Header as='a'>{this.props.contracts.title}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>{this.props.contracts.tag}</span>
                </Item.Meta>
                <Item.Description>{this.props.contracts.description}</Item.Description>
                <Link to={`/campaign/view/${this.props.contracts.contractAddress}&${this.props.contracts.title.replace(/\s/g,"_")}`}>
                  <Button primary floated='right'>
                    Go To Campaign
                    <Icon name='right chevron' />
                  </Button>
                </Link>
              </Item.Content>
            </Item>
            <hr />

          </Item.Group>

        );
    }
}

export default Card;