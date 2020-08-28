import * as actionTypes from './actionTypes';

import web3 from '../../etheruem/web3';
import Factory from '../../etheruem/factory';

export const setData=(campaignState)=>{

    return {
        type:actionTypes.SET_CONTRACT_DATA,
        payload:campaignState
    }

}

export const setContractData = (pages) =>{

    // let start;
    // let end;

    // end=pages*12;

    // if(end-12<0){
    //     start=0;
    // }
    // else{
    //     start=end-12
    // }

    // end--;

    // console.log(start,"----",end);

    return  async dispatch =>{

         const campaignCount=await Factory.methods.getDeployedCampaigns().call();

        const campaignState=[];
        
        for(let i=campaignCount-1;i>=0;i--){
            let campaign=await Factory.methods.deployedCampaigns(i).call(); 
            console.log(campaign);
            let campaignData={
                address:campaign[0],
                tag:campaign[1],
                title:campaign[2],
                description:campaign[3],
                imageHash:campaign[4]
            }
            campaignState.push(campaignData);
        }

        dispatch(setData(campaignState));

    }
    
}