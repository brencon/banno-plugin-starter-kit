const express = require('express');
const router = express.Router();
const config = require('config');
const banno = require('../lib/banno.lib');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const routeName = 'index';
  const code = req.query.code;
  const accessToken = banno.getDecodedToken(routeName, code);
  const title = (config.app.title) ? config.app.title : 'Express';
  res.render(routeName, { title: title });
});

module.exports = router;
