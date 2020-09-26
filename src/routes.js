import React from 'react';
import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import RSOListPage from './pages/RSOListPage';
import UsersPage from './pages/UsersPage';

export const ROUTE_CONFIG = {
  DEFAULT: {
    name: 'Default',
    path: '/',
    widget: () => null,
    hidden: true
  },
  LOGIN: {
    name: 'Login',
    path: '/login',
    widget: () => <LoginPage />
  },
  OVERVIEW: {
    name: 'Overview',
    path: '/overview',
    widget: () => <OverviewPage />
  },
  RSO: {
    name: 'RSO List',
    path: '/rso',
    widget: () => <RSOListPage />
  },
  USERS: {
    name: 'Users',
    path: '/users',
    widget: () => <UsersPage />
  },
};

export const ROUTE_MAP = {};
for (let route of Object.values(ROUTE_CONFIG)) {
  ROUTE_MAP[route.path] = route.widget;
}