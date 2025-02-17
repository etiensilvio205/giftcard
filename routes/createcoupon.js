var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/create', function(req, res) {
  res.sendFile(path.join(__dirname + 'create.html'));
});

module.exports = router;
