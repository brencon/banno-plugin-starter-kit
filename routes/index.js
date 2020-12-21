const express = require('express');
const router = express.Router();
const config = require('config');
const banno = require('../lib/banno.lib');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const accessToken = banno.getDecodedToken();
  const title = (config.app.title) ? config.app.title : 'Express';
  res.render('index', { title: title });
});

module.exports = router;
