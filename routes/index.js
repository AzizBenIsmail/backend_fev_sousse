var express = require('express');
var router = express.Router();

/* GET home page. */
router.delete('/mariem', function(req, res, next) {
  res.json('marhbe bikom fi backend');
});

module.exports = router;
