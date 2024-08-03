import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { REGISTER_USER, registerUserSuccess, registerUserFailure, LOGIN_USER, loginUserSuccess, loginUserFailure } from '../actions/userActions';
import { setToken, signInApi, signUpApi } from '../../services/authService';

export const loginEpic = (action$: any) => action$.pipe(
  ofType(LOGIN_USER),
  mergeMap((action: any) => {
      return from(signInApi(action.payload.email, action.payload.password)).pipe(
        map((response) => {
            setToken(response?.data?.access_token)
            return loginUserSuccess(response?.data?.access_token);
        }),
        catchError((error) => of(loginUserFailure(error.response?.data?.message || 'An unexpected error occurred')))
        )
 }   
  )
);
