const env: { [key: string]: any } = {
  HOST: '0.0.0.0',
  PORT: 1337,
  ...process.env,
};

export default env;
