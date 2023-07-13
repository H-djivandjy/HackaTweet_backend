var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
//-------------> Import


// ________________________| Tweet Route |_______________________
router.post('/', (req, res)=>{
    const tweet = req.body.tweet
    const pseudo = req.body.pseudo

    // check empty fields
if (!checkBody(req.body, ['tweet'])) {
    res.json({ result: false, error: 'Empty field' });
    return;
  }
  

// check tweet length
if (tweet.length >= 281){
    res.json({result: false, error: "Max Length Exceeded"})
    return;
}


// check if there is a hashtag
if (tweet.includes('#')){
    const hashtag = tweet.match(/#\w+/g)
    const hashtagsArray = []
    for (let i = 0; i < hashtag.length; i++) {
        hashtagsArray.push(hashtag[i])
    }
    // console.log('the array :',hashtagsArray)

    User.findOne({pseudo: pseudo})
    .then(data =>{
            const newTweetHashtag = new Tweet({
                message: tweet,
                date: new Date(),
                likes: null,
                hashtag: hashtagsArray,
                user: data._id,
            })
            newTweetHashtag.save().then(tweetData => {
                console.log(tweetData)
                res.json({result: true, message: "Tweet with Hashtags created"})
            })

        })
    // res.json({result: true, tweet: tweet, hashtag: hashtag})
}else{
    User.findOne({ pseudo: pseudo })
        .then(data =>{
            // tweet creation without hashtag
                const newTweet = new Tweet({
                    message: tweet,
                    date: new Date(),
                    likes: null,
                    hashtag: [],
                    user: data._id,
                })
                newTweet.save().then(tweetData => {
                    console.log(tweetData)
                    res.json({result: true, message: "Tweet created"})
                })

        })
        
    }




});


// ________________________| Hashtag Route |_______________________





// ________________________| Delete Tweet Route |__________________

router.delete('/tweets', (req, res) => {
  //if (isConnected) { 
    Tweet.deleteOne( {"_id": ObjectId(req.body.ObjectId)})
    .then(data => { 
      res.json({ result: true, message: "succesfully deleted"})
    })
      //deleteOne( {"_id": ObjectId("4d512b45cc9374271b02ec4f")})
      
//  }
})


// ________________________| get like nb Route |__________________






module.exports = router;