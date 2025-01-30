import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation.component';
import { Store } from '@ngrx/store';
import { UserActions } from '@shared/state/user/actions';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation />

    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavigationComponent, RouterOutlet],
})
export class AppComponent {
  #reduxStore = inject(Store);
  constructor() {
    this.#reduxStore.dispatch(UserActions.loadTheUser());
  }
}
