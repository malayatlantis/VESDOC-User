/**
 * @description auth guard
 */

import {authpost} from '../utils/service'
export const checkAuth = {
    isAuthenticated: localStorage.getItem('docubayUserToken') !== null ? true : false,
    authenticate(cb) {     
        this.isAuthenticated = true
        console.log(this.isAuthenticated);
        setTimeout(cb, 100) 
    },
    signout(cb) {
        localStorage.removeItem('docubayUserToken');
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}