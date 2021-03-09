import {combineReducers} from 'redux';
import {updateProfile,userWallet,addItems} from './reducer';
export default combineReducers({
    updateProfile,userWallet,addItems
})