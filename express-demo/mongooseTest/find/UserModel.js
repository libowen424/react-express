const connection = require('../../connection');
const UserSchema = require('./UserSchema');

let UserModel = connection.model('users',UserSchema)

module.exports = UserModel