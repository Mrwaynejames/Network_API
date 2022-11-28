const { Schema, model, Types } = require('mongoose');

const User = model('user', userSchema);
module.exports = User;