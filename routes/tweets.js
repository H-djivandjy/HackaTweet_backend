var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
//-------------> Import


// ________________________| Tweet Route |_______________________
router.post('/', (req, res)=>{
    const tweetMsg = req.body.tweet

if (!checkBody(req.body, ['tweet'])) {
    res.json({ result: false, error: 'Empty field' });
    return;
  }

  const filterTweet = tweetMsg.includes('#')

  res.json({result: true, tweet: tweetMsg})
  console.log(filterTweet)

});


// ________________________| Hashtag Route |_______________________







module.exports = router;