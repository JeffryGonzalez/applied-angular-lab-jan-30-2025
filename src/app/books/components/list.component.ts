import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookStore } from '../services/book-store';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Are you an admin? {{ store.userIsAdmin() }}</p>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Id</th>
            <th>
              <button class="link" (click)="store.setSort('title')">
                Title
              </button>
            </th>
            <th>
              <button class="link" (click)="store.setSort('author')">
                Author
              </button>
            </th>
            <th>
              <button class="link" (click)="store.setSort('year')">Year</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (book of store.books(); track book.id; let odd = $odd) {
            @if (odd) {
              <tr class="bg-base-200">
                <th>{{ book.id }}</th>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.year }}</td>
              </tr>
            }
            <!-- row 2 -->
            @else {
              <tr>
                <th>{{ book.id }}</th>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.year }}</td>
              </tr>
            }
            <!-- row 3 -->
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(BookStore);
}
