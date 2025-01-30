import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { CustomPreloadingStrategy, FeaturesService } from '@shared';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers } from '@shared/state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from '@shared/state/user/effects';
export const appConfig: ApplicationConfig = {
  providers: [
    CustomPreloadingStrategy,
    FeaturesService,
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects([UserEffects]),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
  ],
};
