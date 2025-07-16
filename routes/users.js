var express = require('express');
var router = express.Router();
var db = require('../db.js');
/* GET users listing. */
router.get('/', function (req, res) {
  console.log('foo')
  db.select('g.id', 'g.name')
      .from('Groups as g')
      .then(function (data) {
        res.json(data);
      });
})

module.exports = router;
