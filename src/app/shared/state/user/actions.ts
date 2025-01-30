import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserData } from '.';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load The User': emptyProps(),
    'User Loaded': props<UserData>(),
  },
});
