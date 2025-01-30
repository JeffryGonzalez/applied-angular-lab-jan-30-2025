import { Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { ListComponent } from './components/list.component';
import { StatsComponent } from './components/stats.component';
export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
