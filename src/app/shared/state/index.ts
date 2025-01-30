import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromBooks from './books';
import * as fromUser from './user';

export interface AppState {
  books: fromBooks.BooksState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  books: fromBooks.reducer,
  user: fromUser.reducer,
};

const selectBooks = (state: AppState) => state.books;

export const selectBookCount = createSelector(
  selectBooks,
  (b) => b.numberOfBooks,
);

export const selectBooksLoaded = createSelector(selectBooks, (b) => b.loaded);

const selectUser = (state: AppState) => state.user;

const selectUserLoaded = createSelector(selectUser, (u) => u.loaded);

export const selectUserIsAdmin = createSelector(selectUser, (u) => {
  if (!u.roles) {
    return false;
  }
  return !!u.roles.filter((u) => u === 'admin');
});
