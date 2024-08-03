import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { REGISTER_USER, registerUserSuccess, registerUserFailure, GET_USER_DATA, getUserDataSuccess, getUserDataFailure } from '../actions/userActions';
import { getUserDataApi, setToken, signUpApi } from '../../services/authService';

export const userEpic = (action$: any) => action$.pipe(
  ofType(GET_USER_DATA),
  mergeMap((action: any) => {
      return from(getUserDataApi()).pipe(
        map((response) => {
            return getUserDataSuccess(response?.data);
        }),
        catchError((error) => of(getUserDataFailure(error.response?.data?.message || 'An unexpected error occurred')))
        )
 }   
  )
);
