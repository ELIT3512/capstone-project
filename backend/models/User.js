const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Claim = require('../models/Claim.js');
const { type } = require('chai/chai.js');
const saltRounds = 10;
const Schema = mongoose.Schema;
const model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },password: {
        type: String,
        require: true
    },claims:[{
        type:Schema.Types.ObjectId,
        ref:"Claim"
    }]});
    userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }};userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);