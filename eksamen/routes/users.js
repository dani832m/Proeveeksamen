var express = require('express');
var router = express.Router();

/* GET users listing. Return JSON object */
router.get('/', function(req, res, next) {
  res.send('Respond with a resource');
});

module.exports = router;