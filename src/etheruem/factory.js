import web3 from './web3';
import  FactoryCampaign from './build/CampaignFactory.json';

const Factory = new web3.eth.Contract( JSON.parse(FactoryCampaign.interface) , '0xf2e9e6317c1Ba57f007D4D8f397614ba86965849' );

export default Factory;