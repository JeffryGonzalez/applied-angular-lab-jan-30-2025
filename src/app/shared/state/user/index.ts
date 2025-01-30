import { createReducer, on } from '@ngrx/store';
import { UserActions } from './actions';
export interface UserData {
  sub: string | undefined;
  roles: string[] | undefined;
}
export interface UserState extends UserData {
  loaded: boolean;
}

const initialState: UserState = {
  loaded: false,
  sub: undefined,
  roles: undefined,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadTheUser, () => initialState),
  on(UserActions.userLoaded, (s, a) => ({
    loaded: true,
    roles: a.roles,
    sub: a.sub,
  })),
);
