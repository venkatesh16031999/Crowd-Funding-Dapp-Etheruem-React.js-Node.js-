import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const setUserDetail=(data)=>{
    return {
        type:actionTypes.SET_USER_DETAILS,
        payload:data
    }

}

export const userRegisteration=(data)=>{
    return dispatch=>{

        axios.post('/SignUp',data).then(res=>{
            dispatch(setUserDetail(res.data));
        })
        // .catch(e=>{
        //     console.log(e.message);
        // })
    }
}