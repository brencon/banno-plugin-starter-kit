const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:index');
const https = require('https');
const jwt_decode = require('jwt-decode');

getBannoAuth = (pluginName) => {
  const keys = `${config.banno.plugins[pluginName].client.id}:${config.banno.plugins[pluginName].client.secret}`;
  debug(`getBannoAuth | keys=${keys}`);  
  const base64 = Buffer.from(keys).toString('base64');
  debug(`getBannoAuth | base64=${base64}`);  
}

getBannoTokenUrl = () => {
  const tokenUrl = `${config.banno.baseUrl}${config.banno.tokenPath}`;
  debug(`getBannoTokenUrl | tokenUrl=${tokenUrl}`);
  return tokenUrl;
}

getDecodedToken = async (pluginName) => {
  const tokenUrl = getBannoTokenUrl();
  const basicAuth = getBannoAuth(pluginName);
}

module.exports = {
  getDecodedToken
}