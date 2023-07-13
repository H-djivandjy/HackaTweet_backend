const mongoose = require('mongoose')


const usersSchema = mongoose.Schema({
    username: String,
    pseudo: String,
    password: String,
    token: String,
    isConnected: Boolean,
})


const User = mongoose.model('users', usersSchema)

module.exports = User;