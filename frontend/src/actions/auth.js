import axios from 'axios';
import {
    SIGNUP_SUCCESS,
    SIGUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED
} from './types';

export const checkAuthenticated = () => async dispatch => {
    const token = localStorage.getItem('access_token');
    if (token) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/customer/`, config);
            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                    payload : res
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAILED
                });
            }
        } catch (error) {
            console.error('Authentication error:', error);
            dispatch({
                type: AUTHENTICATED_FAILED
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAILED
        });
    }
};


export const customer_register = (email, first_name, last_name, mobile, password, confirm_password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, first_name, last_name, mobile, password, confirm_password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/customer/register/`, body, config);
        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload:res.data
            });
        } else {
            dispatch({
                type: SIGUP_FAIL
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        dispatch({
            type: SIGUP_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`, body, config);
        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data 
            });
            dispatch(checkAuthenticated())
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


export const change_password = (new_password,confirm_new_password,user_id) => async dispatch => {
    const token = localStorage.getItem('access_token');
    
    const config = {
        headers : {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }

    const body = JSON.stringify({new_password,confirm_new_password})

    try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/change/password/${user_id}/`,body,config)
        if(res.status === 202){
            dispatch({
                type:CHANGE_PASSWORD_SUCCESS
            })
        }else{
            dispatch({
                type:CHANGE_PASSWORD_FAILED
            })
        }
    }catch(error){
        console.log("Api is not fetching successfully",String(error));
        dispatch({
            type : CHANGE_PASSWORD_FAILED
        })
    }
}


export const logout = () => async dispatch =>{
    dispatch({
        type:LOGOUT
    })
};


