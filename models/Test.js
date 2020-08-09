const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    creator: String,
    title: String,
    description: String,
    isProtected: Boolean,
    questions: [{
        questionType: String,
        title: String,
        answers: [{
            text: String,
            answerId: String
        }],
        correctAnswerId: [String]
    }],
    subject: String,
    results: [{
        userId: String,
        points: String,
        answers: [ Boolean ],
        time: Number,
        username: {
            type: String,
            default: ''
        }
    }],
    accessKey: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    maxAttempts: Number,
    timeLimit: Number,
    likes: [String]
})

module.exports = Test = mongoose.model('Test', TestSchema);