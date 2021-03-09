import {Add_To_Cart, 
    Remove_To_Cart,
    Update_Profile, 
    GET_WALLET,
    } from '../constants'

const initiadlState = {
    cardData:[],
}
    

export  function addItems(state=[],action){
    switch(action.type){
        case Add_To_Cart:
            console.log(action)
            
            return[
                ...state,
                {cardData:action.data}
            ]
        case Remove_To_Cart:
            state.pop()
            return[
                ...state
            ]
        default:
            return state
    }

}
const userState={
    name:localStorage.getItem('docubayUserName'),
    email:localStorage.getItem('docubayUserEmail'),
 }
export  function  updateProfile(state=userState,action){
    switch(action.type){
        case Update_Profile:
            return action.data
        default:
            return state
    }
}
const initialState ={
    wallet:[],
    error:'',
    point:0
}
export function userWallet(state=initialState,action){
  
    switch(action.type){
        case GET_WALLET:
            // console.log(action.data.data)
            // state = Object.assign({}, state, {wallet: [...action.data.data]});
            // return state
            // break;
            return{
                ...state,
                wallet:action.data.data,
                point:action.data.data.point
            }
                
            
            // return {
            // ...state,
            // wallet:action.data.data
            // }
        default:
            return state
    }

}
