import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  inject,
  computed,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCount, selectBooksLoaded } from '@shared/state';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  template: `
    <p>Welcome Home</p>
    @if (booksLoaded()) {
      <p>The books are loaded and you have {{ bookCount() }} of them!</p>
      <p>The observable of book count is {{ booksCount$ | async }}</p>
      @if (hasLotsOfBooks()) {
        <p>Wow, lots of books, yo!</p>
      }
    } @else {
      <p>No books are loaded yet.</p>
    }
  `,
  styles: ``,
})
export class HomeComponent {
  reduxStore = inject(Store);

  booksCount$ = this.reduxStore.select(selectBookCount);
  booksLoaded = this.reduxStore.selectSignal(selectBooksLoaded);
  bookCount = this.reduxStore.selectSignal(selectBookCount);

  hasLotsOfBooks = computed(() => this.bookCount() > 250);
}
