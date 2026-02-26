                                                                                          
  var express = require('express');                                                         
  var crypto = require('crypto');                                                           
  var router = express.Router();                                                            
                                                                                            
  // Password reset — generates a reset token                                               
  router.post('/reset', function(req, res) {
      var email = req.body.email;

      // Noncompliant: MD5 is cryptographically weak (hotspot: javascript:S4790)
      var token = crypto.createHash('md5')
          .update(email + Date.now())
          .digest('hex');

      res.json({ token: token });
  });

  module.exports = router;

  Then wire it in app.js alongside the existing routes:
  var reset = require('./routes/reset');
  // ...
  app.use('', reset);
