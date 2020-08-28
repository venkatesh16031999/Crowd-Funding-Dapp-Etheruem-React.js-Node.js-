import React,{Component} from 'react';
import { Navbar , Nav } from 'react-bootstrap'
import { Button } from 'semantic-ui-react'
import styles from './header.module.css';
import { connect } from 'react-redux';
import { Link , withRouter } from 'react-router-dom';
import axios from "../../axios";
import * as actions from '../../store/actions/index';

 
    class Header extends Component{

        logout=()=>{

            this.props.logout();
            this.props.history.replace("/");

        }

        render(){
            return (
            <Navbar className={styles.headerwrapper} collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand><h3  ><Link to="/"><button className={styles.nostyle}>Crowd Box</button></Link></h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    
                        <Nav.Link >
                            <Link to="/campaign"><button className={styles.nostyle}>Campaign</button></Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/campaign/create"><button className={styles.nostyle}>Create Campaign</button></Link>    
                        </Nav.Link>
                </Nav>
                <Nav>   
                    <Nav.Link>
                        <Link to="/campaign/profile">
                            <Button content={this.props.name} icon='user' labelPosition='right' />
                        </Link>
                    </Nav.Link>
                    <Nav.Link eventKey={2} >
                         <Button content='Logout' onClick={this.logout} color="red" />
                    </Nav.Link>
                </Nav>
               </Navbar.Collapse>
            </Navbar>
            );
        }
}

const mapStateToProps=state=>{
    return {
        email:state.user.email,
        name:state.user.name,
        number:state.user.number,
        loggedIn:state.user.loggedIn
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        logout:()=> dispatch(actions.logoutRedirect())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));