import { createReducer, on } from '@ngrx/store';
import { BookActions } from './actions';
export interface BooksState {
  numberOfBooks: number;
  loaded: boolean;
}

const initialState: BooksState = {
  numberOfBooks: 0,
  loaded: false,
};

export const reducer = createReducer(
  initialState,
  on(BookActions.booksLoaded, (_, a) => ({
    loaded: true,
    numberOfBooks: a.count,
  })),
);
