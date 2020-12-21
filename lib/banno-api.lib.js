const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:banno-api');
const https = require('https');
const jwt_decode = require('jwt-decode');
const bannoAuth = require('./banno-auth.lib');

const basePath = `${config.banno.baseUrl}${config.banno.api.basePath}`;

getBannoTokenUrl = () => {
  const tokenUrl = `${basePath}${config.banno.api.paths.token}`;
  debug(`getBannoTokenUrl | tokenUrl=${tokenUrl}`);
  return tokenUrl;
}

getUser = async (pluginName, code) => {
  // get access token
  const accessToken = bannoAuth.getBannoAccessToken(pluginName, code);
  // decode it
  // determine user id
  // call banno api with that user id
  // return the user object
  return {};
}

module.exports = {
  getBannoTokenUrl,
  getUser
}