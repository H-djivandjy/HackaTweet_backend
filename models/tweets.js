const mongoose = require('mongoose')

const hashtagsSchema = mongoose.Schema({
    hashtagMsg: String,
})

const tweetsSchema = mongoose.Schema({
    message: String,
    date: Date,
    hashtag: hashtagsSchema,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

})

const Tweet = mongoose.model('tweets', tweetsSchema)

module.exports = Tweet;