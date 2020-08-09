const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdTests: [{
        testId: String
    }],
    passedTests: [{
        points: Number,
        time: Number,
        maxPoints: Number,
        testId: String,
        title: String,
        date: Date,
        answers: [[String]]
    }],
    name: String,
    email: String,
    password: String,
    lastCreatedPost: {
        type: Number,
        required: false,
        default: 0
    },
    isTeacher: {
        type: Boolean,
        required: false,
        default: false
    },
    profileImageUrl: String
})

module.exports = User = mongoose.model('User', UserSchema);