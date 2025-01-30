import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './actions';
import { map, switchMap } from 'rxjs';
import { UserData } from '.';

export class UserEffects {
  actions = inject(Actions);
  client = inject(HttpClient);

  loadTheUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loadTheUser),
      switchMap(() =>
        this.client
          .get<UserData>('/api/user')
          .pipe(map((u) => UserActions.userLoaded(u))),
      ),
    ),
  );
}
