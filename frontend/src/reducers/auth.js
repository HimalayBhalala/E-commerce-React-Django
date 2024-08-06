import {
    SIGNUP_SUCCESS,
    SIGUP_FAIL,
    LOGIN_SUCCESS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    LOGIN_FAIL,
    LOGOUT,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILED,
    EMAIL_VERIFY_SUCCESS,
    EMAIL_VERIFY_FAILED
} from '../actions/types';

const initialState = {
    access_token: null,
    refresh_token: null,
    isAuthenticated: false,
    user: null,
    customer: null,
    message: null,
    profile_image:null,
    username:null
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SIGNUP_SUCCESS:
            localStorage.setItem('access_token', payload.token.access_token);
            localStorage.setItem('refresh_token', payload.token.refresh_token);
            localStorage.setItem('customer_id', payload.customer.id);
            localStorage.setItem('user_id', payload.user.id);
            localStorage.setItem('username', payload.user.first_name);
            localStorage.setItem('profile_image',payload.customer.image);
            localStorage.setItem('username',payload.user.first_name);
            return {
                ...state,
                access_token: payload.token.access_token,
                refresh_token: payload.token.refresh_token,
                isAuthenticated: true,
                user: payload.user,
                customer: payload.customer,
                profile_image:payload.customer.image,
                username:payload.user.username,
                message: "Register Successfully"
            };

        case AUTHENTICATED_SUCCESS:
                return {
                ...state,
                access_token:localStorage.getItem('access_token'),
                refresh_token:localStorage.getItem('refresh_token'),
                profile_image:localStorage.getItem('profile_image'),
                username:localStorage.getItem('username'),
                isAuthenticated: true,
                user: payload,
                message: "Authentication success"
            };

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                message: "Password changed successfully!"
            };

        case CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                message: "Failed to change password"
            };

        case EMAIL_VERIFY_SUCCESS:
            localStorage.setItem('user_id', payload.user.id);
            return {
                user : payload.user,
                message : "User has been exists."
            }
        
        case PROFILE_UPDATE_SUCCESS:
            localStorage.setItem('profile_image',payload.data.image)
            localStorage.setItem('username',payload.data.user.first_name)
            return{
                ...state,
                customer:payload,
                profile_image:payload.data.image,
                username:payload.data.user.first_name
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', payload.access_token);
            localStorage.setItem('refresh_token', payload.refresh_token);
            localStorage.setItem('customer_id', payload.customer.id);
            localStorage.setItem('user_id', payload.user.id);
            localStorage.setItem('username', payload.user.first_name);
            localStorage.setItem('profile_image',payload.customer.image);
            return {
                ...state,
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
                isAuthenticated: true,
                user: payload.user,
                customer: payload.customer,
                profile_image:payload.customer.image,
                username:payload.user.first_name,
                message: "Login Successfully"
            };

        case SIGUP_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem('customer_id');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('profile_image');
            localStorage.removeItem('username');
            return {
                ...state,
                access_token: null,
                refresh_token: null,
                isAuthenticated: false,
                user: null,
                customer: null,
                profile_image:null,
                username:null,
                message: "Signup failed"
            };

        case AUTHENTICATED_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                message: "Authentication failed"
            };
        
        case EMAIL_VERIFY_FAILED:
            localStorage.removeItem('user_id')
            return {
                    user : null,
                    message : "User has not found"
                }

        case PROFILE_UPDATE_FAILED:
            localStorage.removeItem('profile_image')
            localStorage.removeItem('username');
            return{
                ...state,
                customer:null,
                profile_image:null,
                username:null
            }

        case LOGIN_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem('customer_id');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('profile_image');
            localStorage.removeItem('username');
            return {
                ...state,
                access_token: null,
                refresh_token: null,
                isAuthenticated: false,
                user: null,
                customer: null,
                profile_image:null,
                username:null,
                message: "Login failed"
            }
        case LOGOUT:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem('customer_id');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('profile_image');
            localStorage.removeItem('username');
            return {
                ...state,
                access_token: null,
                refresh_token: null,
                isAuthenticated: false,
                user: null,
                customer: null,
                profile_image:null,
                username:null,
                message: "Logout successful"
            };

        default:
            return state;
    }
};

export default authReducer;
