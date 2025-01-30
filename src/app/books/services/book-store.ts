import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { BookApiItem } from '../types';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BookActions } from '@shared/state/books/actions';

export const BookStore = signalStore(
  withEntities({ collection: '_server', entity: type<BookApiItem>() }),
  withMethods((store) => {
    const http = inject(HttpClient);
    const reduxStore = inject(Store);
    return {
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
  withComputed((store) => {
    return {
      books: computed(() => store._serverEntities()),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
