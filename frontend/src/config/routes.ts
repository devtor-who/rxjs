import type { Route } from 'next';

export const lecturesRoutes = [
  { path: '/lecture/1', name: '1. Observerable 기초' }, //
] satisfies {
  path: Route;
  name: string;
}[];
