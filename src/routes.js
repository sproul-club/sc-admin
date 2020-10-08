import React from 'react';
import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import RSOListPage from './pages/RSOListPage';
import ClubsPage from './pages/ClubsPage';
import TagsPage from './pages/TagsPage';
import MoreStatsPage from './pages/MoreStatsPage';

export const ROUTE_CONFIG = {
  HOME: {
    name: 'Overview',
    path: '/overview',
    widget: () => <OverviewPage />
  },
  LOGIN: {
    name: 'Login',
    path: '/login',
    widget: () => <LoginPage />,
    hidden: true
  },
  RSO: {
    name: 'RSO List',
    path: '/rso',
    widget: () => <RSOListPage />
  },
  CLUBS: {
    name: 'Clubs',
    path: '/clubs',
    widget: () => <ClubsPage />
  },
  TAGS: {
    name: 'Tags',
    path: '/tags',
    widget: () => <TagsPage />
  },
  MORE_STATS: {
    name: 'More Stats',
    path: '/more-stats',
    widget: () => <MoreStatsPage />
  }
};

export const ROUTE_MAP = {};
for (let route of Object.values(ROUTE_CONFIG)) {
  ROUTE_MAP[route.path] = route.widget;
}