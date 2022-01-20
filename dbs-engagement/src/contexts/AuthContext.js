
   
import React, {useReducer, createContext} from "react";
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken =  jwtDecode(localStorage.getItem('jwtToken'))

    //check for expiry date 
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    } else{
        initialState.user = decodedToken;
    }

}
const AuthContext = createContext({
    user:null,
    login: (data) => {},
    logout: () => {}
})

//reducer to receive type and payload
function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user:action.payload
            }
        default:
            return state
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login (userData){
        //persist login
        localStorage.setItem("jwtToken",userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    return (
        <AuthContext.Provider
        value ={{user: state.user, login}}
        {...props}
        />

    )
}

export {AuthContext, AuthProvider}