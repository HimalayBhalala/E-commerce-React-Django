import {
    CUSTOMER_SIGNUP_SUCCESS,
    CUSTOMER_SIGUP_FAIL,
    CUSTOMER_LOGIN_SUCCESS,
    CUSTOMER_AUTHENTICATED_SUCCESS,
    CUSTOMER_AUTHENTICATED_FAILED,
    CUSTOMER_LOGIN_FAIL,
    CUSTOMER_PROFILE_UPDATE_SUCCESS,
    CUSTOMER_PROFILE_UPDATE_FAILED,

    SELLER_SIGNUP_SUCCESS,
    SELLER_SIGUP_FAIL,
    SELLER_LOGIN_SUCCESS,
    SELLER_AUTHENTICATED_SUCCESS,
    SELLER_AUTHENTICATED_FAILED,
    SELLER_LOGIN_FAIL,
    SELLER_PROFILE_UPDATE_SUCCESS,
    SELLER_PROFILE_UPDATE_FAILED,

    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    EMAIL_VERIFY_SUCCESS,
    EMAIL_VERIFY_FAILED,
    LOGOUT
} from '../actions/types';

const initialState = {
    access_token: null,
    refresh_token: null,
    isAuthenticated: false,
    user: null,
    customer: null,
    seller:null,
    message: null,
    profile_image:null,
    username:null
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CUSTOMER_SIGNUP_SUCCESS:
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
                message: "Customer Register Successfully"
            };

        case SELLER_SIGNUP_SUCCESS:
            localStorage.setItem('access_token', payload.token.access_token);
            localStorage.setItem('refresh_token', payload.token.refresh_token);
            localStorage.setItem('seller_id', payload.seller.id);
            localStorage.setItem('user_id', payload.user.id);
            localStorage.setItem('username', payload.user.first_name);
            localStorage.setItem('profile_image',payload.seller.image);
            localStorage.setItem('username',payload.user.first_name);
            return {
                ...state,
                access_token: payload.token.access_token,
                refresh_token: payload.token.refresh_token,
                isAuthenticated: true,
                user: payload.user,
                seller: payload.seller,
                profile_image:payload.seller.image,
                username:payload.user.username,
                message: "Seller Register Successfully"
            };

        case CUSTOMER_AUTHENTICATED_SUCCESS:
                return {
                ...state,
                access_token:localStorage.getItem('access_token'),
                refresh_token:localStorage.getItem('refresh_token'),
                profile_image:localStorage.getItem('profile_image'),
                username:localStorage.getItem('username'),
                isAuthenticated: true,
                customer:payload,
                user: payload,
                message: "Customer Authentication success"
            };

        case SELLER_AUTHENTICATED_SUCCESS:
            return {
            ...state,
            access_token:localStorage.getItem('access_token'),
            refresh_token:localStorage.getItem('refresh_token'),
            profile_image:localStorage.getItem('profile_image'),
            username:localStorage.getItem('username'),
            isAuthenticated: true,
            user: payload,
            message: "Seller Authentication success"
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
                ...state,
                user : payload.user,
                message : "User has been exists."
            }
        
        case CUSTOMER_PROFILE_UPDATE_SUCCESS:
            localStorage.setItem('profile_image',payload.data.image)
            localStorage.setItem('username',payload.data.user.first_name)
            return{
                ...state,
                customer:payload,
                profile_image:payload.data.image,
                username:payload.data.user.first_name,
                message:"Customer Profile updated successfully."
            }

        case SELLER_PROFILE_UPDATE_SUCCESS:
            localStorage.setItem('profile_image',payload.data.image)
            localStorage.setItem('username',payload.data.user.first_name)
            return{
                ...state,
                seller:payload,
                profile_image:payload.data.image,
                username:payload.data.user.first_name,
                message:"Seller Profile updated successfully."
            }

        case CUSTOMER_LOGIN_SUCCESS:
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
                message: "Customer Login Successfully"
            };

        case SELLER_LOGIN_SUCCESS:
            localStorage.setItem('access_token', payload.access_token);
            localStorage.setItem('refresh_token', payload.refresh_token);
            localStorage.setItem('seller_id', payload.seller.id);
            localStorage.setItem('user_id', payload.user.id);
            localStorage.setItem('username', payload.user.first_name);
            localStorage.setItem('profile_image',payload.seller.image);
            return {
                ...state,
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
                isAuthenticated: true,
                user: payload.user,
                seller: payload.seller,
                profile_image:payload.seller.image,
                username:payload.user.first_name,
                message: "Seller Login Successfully"
            };
    
        case CUSTOMER_SIGUP_FAIL:
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
                message: "Customer Signup failed"
            };

        case SELLER_SIGUP_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("seller_id");
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
                seller: null,
                profile_image:null,
                username:null,
                message: "Seller Signup failed"
            };

        case CUSTOMER_AUTHENTICATED_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                message: "Customer Authentication failed"
            };

        case SELLER_AUTHENTICATED_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                message: "Seller Authentication failed"
            };
        
        case EMAIL_VERIFY_FAILED:
            localStorage.removeItem('user_id')
            return {
                    ...state,
                    user : null,
                    message : "User has not found"
                }

        case CUSTOMER_PROFILE_UPDATE_FAILED:
            localStorage.removeItem('profile_image')
            localStorage.removeItem('username');
            return{
                ...state,
                customer:null,
                profile_image:null,
                username:null,
                message:"Customer failed to update it's profile"
            }

        case SELLER_PROFILE_UPDATE_FAILED:
            localStorage.removeItem('profile_image')
            localStorage.removeItem('username');
            return{
                ...state,
                seller:null,
                profile_image:null,
                username:null,
                message:"Seller failed to update it's profile"
            }

        case CUSTOMER_LOGIN_FAIL:
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
                message: "Customer Login failed"
            }

        case SELLER_LOGIN_FAIL:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem('seller_id');
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
                seller: null,
                profile_image:null,
                username:null,
                message: "Seller Login failed"
        }

        case LOGOUT:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem('customer_id');
            localStorage.removeItem('seller_id');
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
                seller:null,
                profile_image:null,
                username:null,
                message: "Logout successful"
            };

        default:
            return state;
    }
};

export default authReducer;
