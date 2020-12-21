const express = require('express');
const router = express.Router();
const config = require('config');
const bannoAuth = require('../lib/banno-auth.lib');
const bannoApi = require('../lib/banno-api.lib');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const routeName = 'index';
  const code = req.query.code;
  const user = await bannoApi.getUser(routeName, code);
  const name = `${user.firstName} ${user.lastName}`;
  const city = `${user.address.city}`;
  const title = (config.app.title) ? config.app.title : 'Express';
  res.render(routeName, { 
    title: title,
    name: name,
    city: city
  });
});

module.exports = router;
