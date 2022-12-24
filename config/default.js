const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  server: {
    port: process.env.PORT,
    domain: 'localhost',
  },
  // DB
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  logger: 'dev',
};
