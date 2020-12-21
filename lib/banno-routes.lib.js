const config = require('config');
const debug = require('debug')('external-application:banno-routes');

const basePath = `${config.banno.baseUrl}${config.banno.api.basePath}`;

getBannoTokenUrl = () => {
  const tokenUrl = `${basePath}${config.banno.api.paths.token}`;
  debug(`getBannoTokenUrl | tokenUrl=${tokenUrl}`);
  return tokenUrl;
}

module.exports = {
  getBannoTokenUrl
}