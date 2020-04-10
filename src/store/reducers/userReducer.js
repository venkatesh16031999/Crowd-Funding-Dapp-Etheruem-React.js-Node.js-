import * as actionTypes from '../actions/actionTypes';


const initialState={
    email:"rvenki666@gmail.com",
    name:"Venkatesh.R",
    number:"9487220819",
    trusted:0,
    contracts:{campaigns:[]},
    loggedIn:false
}

const userReducers=(state=initialState,action)=>{

    switch(action.type){
        
        case actionTypes.SET_USER_DETAILS:
            return {
                ...state,
                email:action.payload.combineddata.userDetail.email,
                name:action.payload.combineddata.userDetail.name,
                number:action.payload.combineddata.userDetail.number,
                loggedIn:true
            }
        default:
            return state;
    }

}

export default userReducers