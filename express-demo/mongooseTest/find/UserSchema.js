// StudentSchema.js file
const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    username:String,
    password:String
})

module.exports = UserSchema