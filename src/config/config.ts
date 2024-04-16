export default () => ({
  database: {
    connectionString: process.env.CONNECTION_STRING,
  },
  port: parseInt(process.env.PORT, 10) || 3005,
  otp: {
    expirationTime: process.env.EXPIRATION_TIME,
  },
});
