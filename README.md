# A website for creating and passing tests 

The website was deployed on <a>https://easytestapp.onrender.com</a>

The backend was built using ExpressJS flamework and a cloud-based database MongoDB. 

Passwords are hashed using secure algorithms from bcrypt.js module. User authentication functionality was implemented using JWT for creating access tokens. 

## GET routes 
- GET /api/users/userInfo/$userId - get user data by userId 
- GET /api/tests/testResults/$testId - get all results of a test 
- GET /api/tests/testResult/$resultId - get specific result data 
- GET /api/tests/passedTests/$userId - get all tests passed by user with given id 
- GET /api/tests/createdTests/$userId - get all tests created by user with given id 
- GET /api/tests/allTests - get all tests, sorted by the date of creation 
- GET /api/tests/testInfo/$testId - get test data 


## POST routes 
- POST /api/users/addUser - add user data to database 
- POST /api/users/login - login user with given credentials, generate access token 
- POST /api/users/saveUserData/$userId - change and save user data in the database
- POST /api/tests/saveResult/$testId - save a new result of completion of the test with testId
- POST /api/tests/likeTest/$testId - add a new like to the test 


The frontend was created using ReactLS library. 

## Initialise and run project 
Run backend
```
npm install 
nun run server 
```
Run frontend
```
cd frontend 
npm install 
npm run start
```