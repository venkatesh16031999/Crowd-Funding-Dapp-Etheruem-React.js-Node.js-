import * as actionTypes from '../actions/actionTypes';

const initialState={
    contracts:[]
}

const Reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_CONTRACT_DATA:
            console.log(action.payload);
        return{
            ...state,
            contracts:action.payload
        }

        default:
            return state;
    }
}

export default Reducer;

