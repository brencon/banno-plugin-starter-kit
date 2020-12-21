const express = require('express');
const router = express.Router();
const config = require('config');

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = (config.app.title) ? config.app.title : 'Express';
  res.render('index', { title: title });
});

module.exports = router;
