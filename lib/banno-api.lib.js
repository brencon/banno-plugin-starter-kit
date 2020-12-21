const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:banno-api');
const https = require('https');
const jwt_decode = require('jwt-decode');
const bannoAuth = require('./banno-auth.lib');

const basePath = `${config.banno.baseUrl}${config.banno.api.basePath}`;
const pathToUsers = `${basePath}${config.banno.api.paths.users}`;

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

getUserId = async (accessToken) => {
  // decode the access token
  const decodedAccessToken = getDecodedAccessToken(accessToken);
  // determine user id
  const userId = decodedAccessToken.sub;
  debug(`getUserId | userId=${userId}`);
  return userId;
}

getUser = async (pluginName, code) => {
  const accessToken = await bannoAuth.getBannoAccessToken(pluginName, code);  
  const userId = await getUserId(accessToken);
  const userUrl = `${pathToUsers}/${userId}`;
  const userInfo = await axios(userUrl, {
    method: 'get',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const userInfoData = userInfo.data;
  debug(`getUser | userInfoData=${JSON.stringify(userInfoData)}`);
  return userInfoData;
}

module.exports = {
  getBannoTokenUrl,
  getUser
}