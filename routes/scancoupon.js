var express = require('express');
var router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/scan', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/scan.html'));
});

module.exports = router;
