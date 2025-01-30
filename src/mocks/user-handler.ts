import { http, HttpResponse } from 'msw';

export const UserHandler = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      sub: 'Jeff',
      roles: ['admin'],
    });
  }),
];
