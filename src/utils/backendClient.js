import axios from 'axios';
import { navigate } from 'hookrouter';

const DEFAULT_STARTING_MODE = 'PROD';

const BASE_URLS = {
  'LOCAL': 'https://relevant-united-bobcat.ngrok-free.app',
  // 'DEV': 'https://sc-backend-dev.herokuapp.com',
  'PROD': 'https://sc-backend-prod-deef21175f2b.herokuapp.com/',
};

const BASE_URL_ENG = {
  'LOCAL': 'Local',
  // 'DEV': 'Development',
  'PROD': 'Production',
}

class AuthToken {
  constructor(label) {
    this.tokenKey = label + 'Token';
    this.expireKey = label + 'ExpiresAt';
  }

  set(token, expiresIn) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(
      this.expireKey,
      new Date().getTime() + expiresIn * 1000
    );
  }

  get() {
    return localStorage.getItem(this.tokenKey);
  }

  exists() {
    return !!this.get();
  }

  header() {
    return `Bearer ${this.get()}`;
  }

  fullHeaderConfig() {
    return {
      headers: {
        Authorization: this.header(),
      },
    };
  }

  delete() {
    localStorage.setItem(this.tokenKey, '');
    localStorage.setItem(this.expireKey, -1);
  }
}

class API {
  constructor() {
    this.tokens = {
      access: new AuthToken('access'),
      refresh: new AuthToken('refresh'),
    };

    this.api = axios.create({
      baseURL: BASE_URLS[DEFAULT_STARTING_MODE],
      headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
      },
    });

    this._installRefreshMiddleware();
    this._initBaseMode()
    this._updateAccessHeader();
  }

  _initBaseMode() {
    let currentMode = this.getMode();
    if (!currentMode) {
      this.switch(DEFAULT_STARTING_MODE);
      currentMode = DEFAULT_STARTING_MODE;
    } else
      this.switch(currentMode);
  }

  _updateAccessHeader() {
    const accessToken = this.tokens.access.get();

    if (!!accessToken)
      this.api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    else
      delete this.api.defaults.headers.common['Authorization'];
  }

  async _tryRefreshAccessToken() {
    try {
      // Try fetching new access token with refresh token
      const res = await this.api.post('/api/monitor/refresh', {}, this.tokens.refresh.fullHeaderConfig());
      this.tokens.access.set(res.data.access, res.data.access_expires_in);
    } catch (err) {
      // Refresh token has expired, log the user out
      this.tokens.access.delete();
      this.tokens.refresh.delete();

      // Return to main page
      navigate('/login');
    }
  }

  _installRefreshMiddleware() {
    this.api.interceptors.response.use(res => res, async err => {
      const badToken = err.response.status === 401;
      const isAuthToken = err.config.headers['Authorization'] === this.tokens.access.header();
      
      if (badToken && isAuthToken) {
        await this._tryRefreshAccessToken();
        err.config.headers['Authorization'] = this.tokens.access.header();

        return axios.request(err.config);
      }

      throw err;
    });
  }

  getMode() {
    return localStorage.getItem('base-mode');
  }


  switch(newMode) {
    if (!(newMode in BASE_URLS))
      throw new Error(`Invalid mode for API: '${newMode}'`)

    localStorage.setItem('base-mode', newMode);
    this.api.defaults.baseURL = BASE_URLS[newMode];
  }

  client() {
    return this.api;
  }

  // Auth endpoints
  isLoggedIn() {
    return this.tokens.access.exists();
  }

  async signIn({ email, password }) {
    const res = await this.api.post('/api/monitor/login', { email, password });

    this.tokens.access.set(res.data.access, res.data.access_expires_in);
    this.tokens.refresh.set(res.data.refresh, res.data.refresh_expires_in);

    this._updateAccessHeader()
  }

  async signOut(useBackend = true) {
    if (useBackend) {
      await this.api.delete('/api/monitor/revoke-access', this.tokens.access.fullHeaderConfig());
      await this.api.delete('/api/monitor/revoke-refresh', this.tokens.refresh.fullHeaderConfig());
    }

    this.tokens.access.delete();
    this.tokens.refresh.delete();

    this._updateAccessHeader()
  }
}

const GlobalAPI = new API();

export { GlobalAPI, BASE_URLS, BASE_URL_ENG };
