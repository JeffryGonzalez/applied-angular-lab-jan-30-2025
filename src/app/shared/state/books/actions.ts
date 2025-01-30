import { createActionGroup, props } from '@ngrx/store';

export const BookActions = createActionGroup({
  source: 'Books',
  events: {
    'Books Loaded': props<{ count: number }>(),
  },
});
