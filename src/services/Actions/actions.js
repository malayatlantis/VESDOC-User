import {Add_To_Cart,
    Remove_To_Cart,
    Update_Profile,
    GET_WALLET,
    } from '../constants'
import {authpost} from '../../utils/service'
import ToastService from 'react-material-toast';
const toast = ToastService.new({
    place:'topRight',
    duration:2,
    maxCount:8
  });
export const addToCart=(data)=>{
    console.log(data)
    return {
        type:Add_To_Cart,
        data:data
    }
}

export const removeToCart=(data)=>{
    return {
        type:Remove_To_Cart,
        data:data
    }

}
export const updateProfile=(data)=>{
    authpost('/auth/profileupdate/',data)
    .then(response=>{
        localStorage.setItem('docubayUserEmail', response.data.email);
        localStorage.setItem('docubayUserName', response.data.name);
        toast.success('Profile Update Successfully');
    })
    .catch(error=>{
        console.log(error)
    })
    return{
        type:Update_Profile,
        data:data
    }
}



export const walletGet=data=>{
  return (dispatch)=> {
    return authpost('/features/walletDetails/').then(response => {
        // dispatch
        dispatch({
          type:GET_WALLET,
          data:response
        });
    });
  }
}


