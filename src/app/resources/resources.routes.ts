import { CanActivateFn, Routes } from '@angular/router';
import { ResourcesComponent } from './resources.component';
import { ResourceListComponent } from './pages/resource-list.component';
import { CreateComponent } from './pages/create.component';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserIsAdmin } from '@shared/state';

export const RESOURCE_ROUTES: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    children: [
      {
        path: 'list',
        component: ResourceListComponent,
      },
      {
        canActivate: [userIsAdminGuard()],
        path: 'create',
        component: CreateComponent,
      },

      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

function userIsAdminGuard(): CanActivateFn {
  return () => {
    const reduxStore = inject(Store);
    return reduxStore.select(selectUserIsAdmin);
  };
}
