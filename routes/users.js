var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const token = uid2(32);


// Sign up route :
router.post('/signup', (res, req) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  
  //check  is all fields are filled  
  if (!checkBody(req.body, ['username', 'pseudo', 'password',])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
  User.findOne({ pseudo : req.body.pseudo })
  .then(data => {
    // register user if not existing
    if (data === null) {
      const newUser = new User ({
        username: req.body.username,
        pseudo: req.body.pseudo,
        password: hash,
        token: token,
        isConnected: true,
      })

      newUser.save()
      .then(data => {
        res.json({ result: true, token: data.token })
      })

    // if user already exists => error
    } else {
      res.json({ result: false, error: "user already exists" })
    }
  })

})

module.exports = router;