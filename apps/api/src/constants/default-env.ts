export default {
  HOST: '0.0.0.0',
  PORT: 1337,

  JWT_SECRET: 'such-secret-much-wow',

  CORS_ENABLED: false,
  CORS_ORIGIN: false,
  CORS_METHODS: 'GET,POST,PATCH,DELETE',
  CORS_ALLOWED_HEADERS: 'Content-Type,Authorization',
  CORS_EXPOSED_HEADERS: 'Content-Range',
  CORS_CREDENTIALS: true,
  CORS_MAX_AGE: 18000,

  ROBOTS_TXT: 'User-agent: *\nDisallow: /',
};
