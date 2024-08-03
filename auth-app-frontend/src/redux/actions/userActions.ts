import { User } from "../../models/user";

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';

export const LOGOUT = "LOGOUT"

// register actions 
export const registerUser = (email: string, name: string, password: string) => ({
  type: REGISTER_USER,
  payload: { email, name, password },
});

export const registerUserSuccess = (token: string) => ({
  type: REGISTER_USER_SUCCESS,
  payload: token ,
});

export const registerUserFailure = (error: string) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});


// login actions
export const loginUser = (email: string, password: string) => ({
    type: LOGIN_USER,
    payload: { email, password },
  });
  

  export const loginUserSuccess = (token: string) => ({
    type: LOGIN_USER_SUCCESS,
    payload: token,
  });
  

  export const loginUserFailure = (error: string) => ({
    type: LOGIN_USER_FAILURE,
    payload: error,
  });
  
// get userdata actions
  export const getUserData = () => ({
    type: GET_USER_DATA,
  });
  
  export const getUserDataSuccess = (userData: User) => ({
    type: GET_USER_DATA_SUCCESS,
    payload: userData,
  });
  
  export const getUserDataFailure = (error: string) => ({
    type: GET_USER_DATA_FAILURE,
    payload: error,
  });


  export const logout = () => ({
    type: LOGOUT
  });