import { User } from '../../models/user';
import {REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, GET_USER_DATA, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILURE, LOGOUT } from '../actions/userActions';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string| null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  token: null
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    // Handle register Actions
    case REGISTER_USER:
       console.log('REGISTER_USER reducer')
      return { ...state, loading: true, error: null };
    case REGISTER_USER_SUCCESS:
        console.log('REGISTER_USER_SUCCESS reducer',action.payload)
      return { ...state, loading: false, token: action.payload };
    case REGISTER_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // Handle Login Actions
    case LOGIN_USER:
      console.log('LOGIN_USER reducer');
      return { ...state, loading: true, error: null };

    case LOGIN_USER_SUCCESS:
      console.log('LOGIN_USER_SUCCESS reducer', action.payload);
      return { ...state, loading: false, token: action.payload };

    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // Handle user Actions
    case GET_USER_DATA:
        console.log('GET_USER_DATA reducer');
        return { ...state, loading: true, error: null };
    case GET_USER_DATA_SUCCESS:
        console.log('GET_USER_DATA_SUCCESS reducer', action.payload);
        return { ...state, loading: false, user: action.payload };
    case GET_USER_DATA_FAILURE:
        console.log('GET_USER_DATA_FAILURE reducer', action.payload);
        return { ...state, loading: false, error: action.payload };
    // logout
    case LOGOUT:
        return { ...state, error: null, user: null, token: null};
    default:
      return state;
  }
};

export default userReducer;
