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
  return base64;  
}

getBannoTokenUrl = () => {
  const tokenUrl = `${config.banno.baseUrl}${config.banno.tokenPath}`;
  debug(`getBannoTokenUrl | tokenUrl=${tokenUrl}`);
  return tokenUrl;
}

getDecodedToken = async (pluginName, code) => {
  const tokenUrl = getBannoTokenUrl();
  const basicAuth = getBannoAuth(pluginName);
  // TODO: assume local host with port or use an environment config setting
  const redirectUri = 'http://localhost:8100';
  const authResponse = await axios(tokenUrl, {
    method: 'post',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`
    },
    data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
  });
  const accessToken = authResponse.data.access_token;
  debug(`getDecodedToken | accessToken=${accessToken}`);
  return accessToken;
}

module.exports = {
  getDecodedToken
}