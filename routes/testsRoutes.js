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
            (test);
            
            test.results.forEach(res => {
                users.push(res.userId);
            })
            (users);
            
            
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

router.get('/testResult/:userId/:resultId', (req, res) => {
    User
        .findOne({ _id: req.params.userId })
        .then(user => {
            let currTest = null;
            
            user.passedTests.map(test => {
                if (test._id == req.params.resultId)
                    currTest = test;
            })
            if (!currTest) 
                res.status(400).json({ success: false, msg: 'Could not find result' })
            else {
                Test
                    .findOne({ _id: currTest.testId })
                    .then(test => {
                         res.status(200).json({
                            success: true,
                            test: test,
                            answers: currTest.answers
                        })
                    })
               
            }
        })
})

router.get('/passedTests/:userId', (req, res) => {
    User
        .findOne({ _id: req.params.userId })
        .then(user => {
            res.status(200).json(user.passedTests)
        })
})

router.post('/createdTests/:userId', (req, res) => {
    User
        .findOne({ _id: req.params.userId })
        .then(user => {
            let createdTests = [];
            user.createdTests.map(test => {
                createdTests.push(test.testId);
            })
            
            Test
                .find({ _id: { $in: createdTests } })
                .then(tests => {
                    (tests);
                    
                    res.status(200).json({ tests });
                })
        })
})

router.get('/allTests', (req, res) => {
    const { isLimited } = req.body;
    (req.body)

    if (isLimited) {
        const { left, right } = req.body;
        (left, right)
        Test 
            .find()
            .then(tests => {
                if (left >= tests.length) 
                    res.status(200).json({ tests: [] });
                else {
                    const size = tests.length;
                    let resp = tests.slice(Math.min(left, size), Math.min(right, size));
                    let isMoreTests = true;
                    if (right >= size)
                        isMoreTests = false;
                    res.status(200).json({ len: resp.length, tests: resp, isMoreTests })
                }
            })
    } else {
        Test.find()
            .sort({ createdAt: -1 })
            .then(tests => {
                res.status(200).json(tests);
            })
    }
})

router.get('/testInfo/:testId', (req, res) => {
    (req.params.testId);
    
    Test.findOne({ _id: req.params.testId })
        .then(test => {
            res.status(200).json(test);
        })
})

// POST ROUTES 

// Get all tests with limits
router.post('/allTests', auth, (req, res) => {
    const { isLimited } = req.body;
    (req.body)

    if (isLimited) {
        const { left, right } = req.body;
        (left, right)
        Test 
            .find()
            .sort({ createdAt: -1 })
            .then(tests => {
                if (left >= tests.length) 
                    res.status(200).json({ tests: [] });
                else {
                    const size = tests.length;
                    let resp = tests.slice(Math.min(left, size), Math.min(right, size));
                    let isMoreTests = true;
                    if (right >= size)
                        isMoreTests = false;
                    res.status(200).json({ len: resp.length, tests: resp, isMoreTests })
                }
            })
    } else {
        Test.find()
            .sort({ createdAt: -1 })
            .then(tests => {
                res.status(200).json(tests);
            })
    }
})

// Get passed tests with limit
router.post('/passedTests/:userId', auth, (req, res) => {
    const { isLimited } = req.body;
    (req.body)

    if (isLimited) {
        const { left, right } = req.body;
        (left, right)
        User 
            .findOne({ _id: req.params.userId })
            .then(user => {
                let tests = user.passedTests;
                tests.sort((a, b) => b.date - a.date);
                if (left >= tests.length) 
                    res.status(200).json({ tests: [] });
                else {
                    const size = tests.length;
                    let resp = tests.slice(Math.min(left, size), Math.min(right, size));
                    let isMoreTests = true;
                    if (right >= size)
                        isMoreTests = false;
                    res.status(200).json({ len: resp.length, tests: resp, isMoreTests })
                }
            })
    } else {
        Test.find()
            .sort({ createdAt: -1 })
            .then(tests => {
                res.status(200).json(tests);
            })
    }
})

router.post('/createTest', (req, res) => {
    const newTest = new Test({
        ...req.body,
        timeLimit: req.body.timeLimit,
        results: []
    });
    

    let testId = null;

    User
        .findOne({ _id: req.body.creator })
        .then(creator => {
            const currentTime = new Date().getTime();
            (currentTime, creator.lastCreatedPost);
            
            if (creator.lastCreatedPost && currentTime - creator.lastCreatedPost < 300000) {
                res.status(403).json({ success: false, isTimeErr: true })
                return;
            } else {
                newTest
                    .save()
                    .then(createdTest => {
                        testId = createdTest._id;

                        User
                            .findOne({ _id: req.body.creator })
                            .then(user => {
                                const currentTime = new Date().getTime();
                                
                                user.lastCreatedPost = currentTime;
                                user.createdTests.push({
                                    testId: testId
                                })

                                user.save();
                                res.status(200).json({ success: true, createdTest });
                            })

                        // res.status(200).json(createdTest);
                    })
            }
        })

    
    
})

router.post('/saveResult/:testId', (req, res) => {
    User 
        .findOne({ _id: req.body.userId })
        .then(user => {
            user.passedTests.push({
                testId: req.params.testId,
                points: req.body.points,
                date: req.body.date,
                maxPoints: req.body.maxPoints,
                title: req.body.title,
                time: req.body.time,
                answers: req.body.answersLetters
            });

            user
                .save()
                .then(savedUsed => {
                    Test
                        .findOne({ _id: req.params.testId })
                        .then(test => {
                            test.results.push({
                                userId: req.body.userId,
                                points: req.body.points,
                                answers: req.body.answers,
                                time: req.body.time
                            });
                            test.save();
                            res.status(200).json({
                                test,
                                user: user
                            });
                        })
                })          
        })
})

router.post('/likeTest/:testId', (req, res) => {
    const { userId, isIncrease } = req.body;
    const testId = req.params.testId;
    (isIncrease)
    Test
        .findOne({ _id: testId })
        .then(test => {
            if (isIncrease) {
                if (!test.likes.find((like) => like === userId)) 
                    test.likes.push(userId);
            } else {
                test.likes = test.likes.filter(like => {
                    return like !== userId
                })
            }
            test
                .save()
                .then(() => res.status(200).json(test));
        })
})


module.exports = router;