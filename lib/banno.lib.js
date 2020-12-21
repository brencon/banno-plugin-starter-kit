const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:index');
const https = require('https');
const jwt_decode = require('jwt-decode');

getBannoTokenUrl = () => {
  return `${config.banno.baseUrl}${config.banno.tokenPath}`;
}

getDecodedToken = async () => {
  const tokenUrl = getBannoTokenUrl();
  debug(`getDecodedToken | tokenUrl=${tokenUrl}`);
}

module.exports = {
  getDecodedToken
}