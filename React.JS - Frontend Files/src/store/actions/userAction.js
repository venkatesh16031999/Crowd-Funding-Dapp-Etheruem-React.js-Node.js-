import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const setImage=(data)=>{
    return {
        type:actionTypes.SET_IMAGE,
        payload:data
    }
}

export const imageUploader=(file,email)=>{
    return dispatch=>{
        var bodyFormData = new FormData();
        bodyFormData.append('image', file[0]);
        bodyFormData.append('email',email);

        axios({
            method: 'post',
            url: '/UserPhoto',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(resdata=> {
                dispatch(setImage(resdata.data));
            })
            .catch(err=> {
                console.log(err.message);
            });

    }
}

export const setUserLoginRedirect=(data)=>{
    console.log("login");
    return {
        type:actionTypes.SET_LOGIN_USER,
        payload:data
    }
}


export const userLoginRedirect=(data)=>{
    return dispatch=>{

    
        axios.post('/SignIn',data).then(res=>{
            
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId",res.data.user._id.toString());
            localStorage.setItem("expiresIn",Date.now() + 3600000);

            if(res.data.response=="Login Successful"){
                dispatch(setUserLoginRedirect(res.data.user));
            }
        }).catch(e=>{
            console.log(e.message);
        })

    }
}


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

export const setUserContract=(data)=>{
    return {
        type:actionTypes.SET_USER_CONTRACTS,
        payload:data
    }
}

export const updateUserContract=(data)=>{
    return dispatch=>{
        console.log("savingggggg",data);
        axios.patch('/updatecontracts',data).then(res=>{
            console.log("updateUserContractsdgvsdfg",res.data);
            dispatch(setUserContract(res.data));
            
        }).catch(e=>{
            console.log(e);
        })

    }
}


export const setUserContractContribution=(data)=>{
    return {
        type:actionTypes.SET_USER_CONTRACTS_CONTRIBUTIONS,
        payload:data
    }
}

export const updateUserContractContribution=(data)=>{
    return dispatch=>{

            
        axios.patch('/updatecontributions',data).then(res=>{
            dispatch(setUserContractContribution(res.data));
        }).catch(e=>{
            console.log(e.message);
        });



    }
}


export const logoutRedirect=()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiresIn");

    return {
        type:actionTypes.LOGOUT
    }

}

export const loginLoadUsingJWT=()=>{
    return dispatch=>{

        if(localStorage.getItem('token')){

            axios.post('/loginUsingJWT', {token:localStorage.getItem('token')}).then(res=>{
              dispatch(setUserLoginRedirect(res.data.user));
            }).catch(err=>{
              console.log(err.message);
            })
      
          }

    }
}