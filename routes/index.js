var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('>>>>>>>')
  res.redirect('musica.html');
  //res.render('musica.html')
  //res.render('index', { title: 'Express' });
});

module.exports = router;
