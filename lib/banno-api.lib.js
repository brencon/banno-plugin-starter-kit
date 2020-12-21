const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:banno-api');
const https = require('https');
const jwt_decode = require('jwt-decode');
const bannoAuth = require('./banno-auth.lib');

const basePath = `${config.banno.baseUrl}${config.banno.api.basePath}`;

getDecodedAccessToken = (accessToken) => {
  const decodedAccessToken = jwt_decode(accessToken);
  debug(`getUser | decodedAccessToken=${JSON.stringify(decodedAccessToken)}`);
  return decodedAccessToken;
}

getBannoTokenUrl = () => {
  const tokenUrl = `${basePath}${config.banno.api.paths.token}`;
  debug(`getBannoTokenUrl | tokenUrl=${tokenUrl}`);
  return tokenUrl;
}

getUser = async (pluginName, code) => {
  // get access token
  const accessToken = await bannoAuth.getBannoAccessToken(pluginName, code);
  // decode it
  const decodedAccessToken = getDecodedAccessToken(accessToken);
  // determine user id
  // call banno api with that user id
  // return the user object
  return {};
}

module.exports = {
  getBannoTokenUrl,
  getUser
}