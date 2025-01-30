import { JsonPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBookCount, selectBooksLoaded } from '@shared/state';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Welcome Home</p>
    @if (booksLoaded()) {
      <p>The books are loaded and you have {{ bookCount() }} of them!</p>
    } @else {
      <p>No books are loaded yet.</p>
    }
  `,
  styles: ``,
})
export class HomeComponent {
  reduxStore = inject(Store);

  booksLoaded = this.reduxStore.selectSignal(selectBooksLoaded);
  bookCount = this.reduxStore.selectSignal(selectBookCount);
}
