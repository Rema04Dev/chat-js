const apiPath = 'api/v1';
const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),

  home: '/',
  login: '/login',
  signup: '/signup',
  error: '*',
};

export default routes;
