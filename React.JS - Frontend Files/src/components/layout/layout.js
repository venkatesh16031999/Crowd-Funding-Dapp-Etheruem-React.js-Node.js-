import React from 'react';
import Header from '../header/header';
import Message from '../message/message';

import styles from './layout.module.css';

const Layout= (props)=>{
    return (
            <React.Fragment >
                    <Message  />
                    <Header  />
                {props.children}
            </React.Fragment>
    );
}

export default Layout;