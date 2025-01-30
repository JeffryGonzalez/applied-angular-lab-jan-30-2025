import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { BookApiItem, BookSummaryItemModel } from '../types';
import { computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BookActions } from '@shared/state/books/actions';
import { selectUserIsAdmin } from '@shared/state';
type BookSortColumns = keyof Omit<BookSummaryItemModel, 'id'>;
type BookState = {
  sortingBy: BookSortColumns;
};
export const BookStore = signalStore(
  withEntities({ collection: '_server', entity: type<BookApiItem>() }),
  withState<BookState>({
    sortingBy: 'title',
  }),
  withMethods((store) => {
    const http = inject(HttpClient);
    const reduxStore = inject(Store);
    return {
      setSort: (sortingBy: BookSortColumns) => patchState(store, { sortingBy }),
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            http.get<{ data: BookApiItem[] }>('./api/books').pipe(
              map((r) => r.data),
              tap((books) =>
                patchState(
                  store,
                  setEntities(books, { collection: '_server' }),
                ),
              ),
              tap((r) =>
                reduxStore.dispatch(
                  BookActions.booksLoaded({ count: r.length }),
                ),
              ),
            ),
          ),
        ),
      ),
    };
  }),
  withProps((store) => {
    const reduxStore = inject(Store);
    return {
      userIsAdmin: reduxStore.selectSignal(selectUserIsAdmin),
    };
  }),
  withComputed((store) => {
    return {
      books: computed(() => {
        const books = store._serverEntities();
        const by = store.sortingBy();
        switch (by) {
          case 'author':
          case 'title': {
            return books.sort((a, b) => a[by].localeCompare(b[by]));
          }
          case 'year':
            return books.sort((a, b) => {
              if (a.year === b.year) {
                return 0;
              }
              if (a.year > b.year) {
                return 1;
              }
              return -1;
            });
        }
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
