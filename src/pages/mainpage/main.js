import React,{Component} from 'react';
import { Route,Switch } from 'react-router-dom';

import Layout from '../../components/layout/layout';
import Profile from '../profilepage/profile';
import Campaignevents from '../campaigneventpage/campaignevents';
import CampaigCreate from '../campaigncreatpage/campaignCreate';


class Main extends Component{
    render(){
        return (
            <Layout >
            <Switch>
                <Route path="/campaign/create" component={CampaigCreate} />
                 <Route path="/campaign/profile" component={Profile} />
                 <Route path="/campaign/" component={Campaignevents} />
                 
            </Switch>
            </Layout>
        );
    }
}


export default Main;