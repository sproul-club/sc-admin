import { ROUTE_CONFIG } from '../routes';

import { AuthManager, TOKENS } from '../utils/backendClient';

export const GlobalAuthManager = new AuthManager({
  accessAuthToken: TOKENS.access,
  refreshAuthToken: TOKENS.refresh
});