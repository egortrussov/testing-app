const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const Test = require('../models/Test')
const User = require('../models/User')

// GET ROUTES

router.get('/testResults/:testId', (req, res) => {
    let users = [];
    let usernames = [];
    
    Test
        .findOne({ _id: req.params.testId })
        .then(test => {
            console.log(test);
            
            test.results.forEach(res => {
                users.push(res.userId);
            })
            console.log(users);
            
            
            User.find({ _id: { $in: users } })
                .then(foundUsers => {
                    foundUsers.forEach(user => {
                        usernames[user._id] = user.name;
                    })
                    
                }).then(() => {
                    let testResults = test.results;
                    testResults.forEach(res => {
                        res.username = usernames[res.userId];
                    })
                    res.status(200).json({
                        usernames,
                        testResults
                    })
                })
             
        })
})

router.get('/passedTests/:userId', (req, res) => {
    User
        .findOne({ _id: req.params.userId })
        .then(user => {
            res.status(200).json(user.passedTests);
        })
})

router.get('/createdTests/:userId', (req, res) => {
    User
        .findOne({ _id: req.params.userId })
        .then(user => {
            res.status(200).json(user.createdTests);
        })
})

router.get('/allTests', auth, (req, res) => {
    Test.find()
        .sort({ createdAt: -1 })
        .then(tests => {
            res.status(200).json(tests);
        })
})

router.get('/testInfo/:testId', (req, res) => {
    Test.findOne({ _id: req.params.testId })
        .then(test => {
            res.status(200).json(test);
        })
})

// POST ROUTES 

router.post('/createTest', (req, res) => {
    const newTest = new Test({
        ...req.body,
        results: []
    });

    let testId = null;

    newTest
        .save()
        .then(createdTest => {
            testId = createdTest._id;

            User
                .findOne({ _id: req.body.creator })
                .then(user => {
                    user.createdTests.push({
                        testId: testId
                    })

                    user.save();
                    res.status(200).json(createdTest);
                })

            // res.status(200).json(createdTest);
        })
    
})

router.post('/saveResult/:testId', (req, res) => {
    console.log(req.body);
    User 
        .findOne({ _id: req.body.userId })
        .then(user => {
            user.passedTests.push({
                testId: req.params.testId,
                points: req.body.points
            });

            user.save();          
        })

    Test
        .findOne({ _id: req.params.testId })
        .then(test => {
            test.results.push({
                userId: req.body.userId,
                points: req.body.points,
                answers: req.body.answers
            });
            test.save();
            res.status(200).json(test);
        })
})


module.exports = router;