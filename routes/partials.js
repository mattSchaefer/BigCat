var express = require('express');
var app = express();
var router = express.Router();
exports.partials = function(req, res) {
    res.render('partials/' + req.params.name);
};

module.exports = router;
