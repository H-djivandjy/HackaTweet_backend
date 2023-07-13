const mongoose = require('mongoose')


const tweetsSchema = mongoose.Schema({
    message: String,
    date: Date,
    likes: Number,
    hashtag: Array,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

})

const Tweet = mongoose.model('tweets', tweetsSchema)

module.exports = Tweet;