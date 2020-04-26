import * as actionTypes from '../actions/actionTypes';


const initialState={
    userid:"",
    email:"",
    name:"",
    number:"",
    trusted:0,
    contracts:{campaigns:[]},
    contributedContracts:{campaigns:[]},
    image:"",
    loggedIn:false
}

const userReducers=(state=initialState,action)=>{

    switch(action.type){
        
        case actionTypes.SET_USER_DETAILS:
            return {
                ...state,
                userid:action.payload.combineddata.userDetail._id,
                email:action.payload.combineddata.userDetail.email,
                name:action.payload.combineddata.userDetail.name,
                number:action.payload.combineddata.userDetail.number,
                loggedIn:true,
                image:action.payload.combineddata.userDetail.image
            }

        case actionTypes.SET_USER_CONTRACTS:
        
            return {
                ...state,
                userid:action.payload._id,
                email:action.payload.email,
                name:action.payload.name,
                number:action.payload.number,
                trusted:action.payload.trusted,
                contracts:action.payload.contracts,
                contributedContracts:action.payload.contributedContracts,
                loggedIn:true,
                image:action.payload.image
            }
        
        case actionTypes.SET_USER_CONTRACTS_CONTRIBUTIONS:
        return {
            ...state,
            contributedContracts:action.payload.contributedContracts.campaigns
        }

        case actionTypes.SET_LOGIN_USER:
            console.log("eeee",action.payload);
            return {
                ...state,
                userid:action.payload._id,
                email:action.payload.email,
                name:action.payload.name,
                number:action.payload.number,
                trusted:action.payload.trusted,
                contracts:action.payload.contracts,
                contributedContracts:action.payload.contributedContracts,
                loggedIn:true,
                image:action.payload.image
            }

        case actionTypes.SET_IMAGE:

            console.log("uploader",action.payload.dataVal.user.image);
            return{
                ...state,
                userid:action.payload.dataVal.user._id,
                email:action.payload.dataVal.user.email,
                name:action.payload.dataVal.user.name,
                number:action.payload.dataVal.user.number,
                trusted:action.payload.dataVal.user.trusted,
                contracts:action.payload.dataVal.user.contracts,
                contributedContracts:action.payload.dataVal.user.contributedContracts,
                loggedIn:true,
                image:action.payload.dataVal.image
            }
        
        case actionTypes.LOGOUT:
            return {
                ...state,
                userid:"",
                email:"",
                name:"",
                number:"",
                trusted:0,
                contracts:{campaigns:[]},
                contributedContracts:{campaigns:[]},
                image:"",
                loggedIn:false
            }

        default:
            return state;
    }

}

export default userReducers