const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:banno-auth');
const https = require('https');
const bannoRoutes = require('./banno-routes.lib');

getBannoAuth = (pluginName) => {
  const keys = `${config.banno.plugins[pluginName].client.id}:${config.banno.plugins[pluginName].client.secret}`;
  debug(`getBannoAuth | keys=${keys}`);  
  const base64 = Buffer.from(keys).toString('base64');
  debug(`getBannoAuth | base64=${base64}`);
  return base64;  
}

getBannoAccessToken = async (pluginName, code) => {
  const tokenUrl = bannoRoutes.getBannoTokenUrl();
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
  debug(`getAccessToken | accessToken=${accessToken}`);
  return accessToken;
}

module.exports = {
  getBannoAccessToken
}