const axios = require('axios');
const config = require('config');
const debug = require('debug')('external-application:index');
const https = require('https');
const jwt_decode = require('jwt-decode');
const bannoAuth = require('./banno-auth.lib');

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
  getUser
}