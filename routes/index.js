var express = require('express');
var router = express.Router();
var upload = require('../upload');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadfile', function (req, res) {
  console.log(req.files.codecsv.path)
  upload.uptoken()
  console.log(req.body)
})

module.exports = router;
