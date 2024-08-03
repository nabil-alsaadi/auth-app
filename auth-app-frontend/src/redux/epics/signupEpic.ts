import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { REGISTER_USER, registerUserSuccess, registerUserFailure } from '../actions/userActions';
import { setToken, signUpApi } from '../../services/authService';

export const signupEpic = (action$: any) => action$.pipe(
  ofType(REGISTER_USER),
  mergeMap((action: any) => {
      return from(signUpApi(action.payload.email, action.payload.name, action.payload.password)).pipe(
        map((response) => {
            setToken(response?.data?.access_token)
            return registerUserSuccess(response?.data?.access_token);
        }),
        catchError((error) => of(registerUserFailure(error.response?.data?.message || 'An unexpected error occurred')))
        )
 }   
  )
);
