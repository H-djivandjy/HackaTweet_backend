var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
//-------------> Import



//! ___________________________| TWEET ROUTE |__________________________

//* ________________________|** Tweet Creation **|_______________________
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

User.findOne({pseudo: pseudo})
.then(userDb =>{
    
    if (userDb === null) {
                res.json({ result: false, error: "User does not exist !" })
                return;
            } 
            //* --->  Creating Tweet with # according to users
            if (tweet.includes('#')) {
                const hashtag = tweet.match(/#\w+/g)
                const hashtagsArray = []
                for (let i = 0; i < hashtag.length; i++) {
                    hashtagsArray.push(hashtag[i])
                }
    
                const newTweetHashtag = new Tweet({
                    message: tweet,
                    date: new Date(),
                    likes: null,
                    hashtag: hashtagsArray,
                    user: userDb._id,
                })
                newTweetHashtag.save().then(tweetData => {
                    console.log(tweetData)
                    res.json({result: true, message: "Tweet with Hashtags created"})
                })
    
            }else{
                // tweet creation without hashtag
                const newTweet = new Tweet({
                    message: tweet,
                    date: new Date(),
                    likes: null,
                    hashtag: [],
                    user: userDb._id,
                })
                newTweet.save().then(tweetData => {
                    console.log(tweetData)
                    res.json({result: true, message: "Tweet created"})
                })
            }
    
            

        //    Tweet.find({ user: userDb._id })
        //    .then(data => {
        //      console.log(data);
        //      res.json({ data: data})
        //    });

        }) 


    });//--------> ROUTE TWEET END


    
//* ________________________|** Likes Update **|_______________________
router.put('/', (req, res)=>{
    let heartClicked = req.body.heartClicked

    Tweet.findById({_id: '64b06ed48d9076911af6971e'})
             .then(tweetDb=>{

                 if (heartClicked === 'true'){
                        tweetDb.likes+= 1
                        tweetDb.save().then(updatedLikes=>{
                            console.log(updatedLikes)
                            res.json({tweet: updatedLikes})
                        })
                        return;
                    }
                    if (heartClicked === 'false' ){
                        if (tweetDb.likes === 0) {
                            tweetDb.save().then(updatedLikes=>{
                                console.log(updatedLikes)
                                res.json({tweet: updatedLikes})
                            })
                            return;
                        }
                        tweetDb.likes-= 1
                        tweetDb.save().then(updatedLikes=>{
                            console.log(updatedLikes)
                            res.json({tweet: updatedLikes})
                        })
                        return;
                    }

             })


})

// ________________________| Hashtag Route |_______________________







module.exports = router;