var express = require('express');
var router = express.Router();

var constants = require("../constants");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {prefixes: constants.prefixes, suffixes: constants.suffixes});
});

module.exports = router;
