var express = require('express');
var router = express.Router();

/* GET request på index-siden. Returnerer i HTML-format. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BEC Bank | Oversigt systemets funktionalitet' });
});

module.exports = router;