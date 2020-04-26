import React from 'react';
import styles from './message.module.css';

import {Row,Col} from 'react-bootstrap';


class MessageBox extends React.Component{  
    
    state={
        messageActive:true
    }

    close=()=>{
        this.setState({
            messageActive:false
        });
    }

    render(){

        return (

            <Row  className={`${styles.wrapper}  ${this.state.messageActive ? null : styles.off} `} >
                <Col md={11} xs={9} className="text-center">
                    <p className={styles.para}>Please Make Sure That Meta Mask Is Installed And Logged In To Your Account.</p>
                </Col>
                <Col md={1} xs={2} className="text-center">
                    <button onClick={this.close} className={styles.but}>X</button>
                </Col>
            </Row>   
    )


    }

}

export default MessageBox;