import { combineEpics } from 'redux-observable';
import { signupEpic } from './signupEpic';
import { loginEpic } from './loginEpic';
import { userEpic } from './userEpic';

export const rootEpic = combineEpics(
  signupEpic,
  loginEpic,
  userEpic
);
