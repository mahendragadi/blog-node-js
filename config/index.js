
const userRoutes = require('./routes/user-routes');

const config = {
  migrate: false,
  userRoutes,
  port: process.env.PORT || '2017',
};

module.exports = config;