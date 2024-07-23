import {
    SIGNUP_SUCCESS,
    SIGUP_FAIL,
    LOGIN_SUCCESS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

const initialState = {
    access_token : localStorage.getItem("access_token"),
    refresh_token : localStorage.getItem("refresh_token"),
    isAuthenticated : false,
    user : null,
    customer : null
}

const auth = (state = initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user : payload
            }
        case LOGIN_SUCCESS:
        case AUTHENTICATED_SUCCESS:
            localStorage.setItem('access_token',payload.access_token)
            localStorage.setItem('refresh_token',payload.refresh_token)
            localStorage.setItem('customer_id',payload.customer.id)
            return {
                ...state,
                access_token : payload.access_token,
                refresh_token : payload.refresh_token,
                isAuthenticated : true,
                user : payload.user,
                customer : payload.customer
            }
        case SIGUP_FAIL:
            return{
                ...state
            }

        case LOGIN_FAIL:
        case AUTHENTICATED_FAILED:
        case LOGOUT:
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem('customer_id')
            return {
                ...state,
                access_token : null,
                refresh_token : null,
                isAuthenticated : false,
                user : null,
                customer : null
            }
        default:
            return state
    }
};

export default auth;