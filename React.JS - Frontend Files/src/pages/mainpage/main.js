import React,{Component} from 'react';
import { Route,Switch } from 'react-router-dom';

import Layout from '../../components/layout/layout';
import Profile from '../profilepage/profile';
import Campaignevents from '../campaigneventpage/campaignevents';
import CampaigCreate from '../campaigncreatpage/campaignCreate';
import Campaignview from '../viewcampaignpage/viewcampaign';
import Campaignrequest from '../requestpage/request';
import Requestpage from '../createrequestpage/creatrequest';


class Main extends Component{
    render(){
        return (
            <Layout >
            <Switch>
                <Route path="/campaign/view/:address/createrequest" component={Requestpage} />
                <Route path="/campaign/view/:address/request" component={Campaignrequest} />
                <Route path="/campaign/view/:address" component={Campaignview} />
                <Route path="/campaign/create" component={CampaigCreate} />
                <Route path="/campaign/profile" component={Profile} />
                <Route path="/campaign/" exact component={Campaignevents} />
                 
            </Switch>
            </Layout>
        );
    }
}


export default Main;