import React,{} from 'react';
import axios from 'axios';
import * as CONSTANT from './constant';

/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 */
export const get = async (param) => {
    try {
        const res = await axios.get(CONSTANT.URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http post call using axios
 */
export const post = async (param, data) => {
    try {
        const res = await axios.post(CONSTANT.URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const patch = async (param, data) => {
    try {
        const res = await axios.patch(CONSTANT.URL + param, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}
export const withoutauthpatch = async (param, data) => {
    try {
        const res = await axios.patch(CONSTANT.URL + param, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const DELETE = async (param, data) => {
    try {
        const res = await axios.delete(CONSTANT.URL + param, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}
export const withoutauthdelete = async (param, data) => {
    try {
        const res = await axios.delete(CONSTANT.URL + param, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}
export const put = async (param, data) => {
    try {
        const res = await axios.put(CONSTANT.URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}
export const formpost = async (param, data) => {
    try {
        const res = await axios.post(CONSTANT.URL + param, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}
export const withoutauthformpost = async (param, data) => {
    try {
        const res = await axios.post(CONSTANT.URL + param, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}
/**
 * 
 * @param {string} param 
 * @description Http post call using axios
 */
export const authpost = async (param, data) => {
    try {
        const res = await axios.post(CONSTANT.URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
            
        })
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 */
export const authget = async (param) => {
    try {
        const res = await axios.get(CONSTANT.URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
           
        })
        return res;
    } catch (error) {
        return error;
    }
}


/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 */
export const authpatch = async (param) => {
    try {
        const res = await axios.patch(CONSTANT.URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('docubayUserToken')
            }
           
        })
        return res;
    } catch (error) {
        return error;
    }
}




export const formpostuplode = async (param, data,options) => {
    console.log(param)
    console.log(data)


    try {
        const res = await axios.post(CONSTANT.URL + param, data,options)
        return res;
    } catch (error) {
        return error;
    }
}