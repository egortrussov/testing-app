## Create frontend

### Technologies
[x] React js
[x] Babel
[ ] React Context API (for data management)
[ ] SCSS preprocessor

### Todo:
[x] Pick a color schema

[ ] Menu bar
    [ ] Bars
        [ ] Home
        [ ] Search tests
        [ ] Create Tests
    [ ] Responsize
    [ ] Foldable
    [ ] Icons
    [ ] On the background
[ ] Main content block
    [ ] Greeting page (home  page) (includes profile)
        [ ] Passed tests
        [ ] User info
    [ ] All tests page
        [ ] All tests List

    [ ] Create test page
    [ ] My tests page
[ ] Landing page --- Extra styling optional


## Create backend

### technologies
[x] express.js
[x] Rest api
[x] JWT (JSON web tokens), for authentication
[x] bcryptjs (for password hashing)

### Todo: 
[x] Connect to MongoDB
[x] Create RestfulAPI
    [x] Tests
    [x] Users
    [x] User information
[x] Create authentication
    [x] Create login
    [x] Create token jenerating system
    [x] Create route protection
[x] Add test route
    [x] Assign with DB
[x] Create user route
    [x] Assign with DB



## Database collection structure
test:
    creator: String,
    questions: [{
        title: String,
        answers: [{
            text: String,
            answerId: String
        }],
        correctAnswerId: String
    }],
    results: [{
        id: String,
        name: String,
        points: String,
        answers: [ Boolean ]
    }]
    accessKey: true

user:
    createdTests: [{
        id: String
    }],
    passedTests: [{
        result: Integer,
        id: String
    }],
    name: String,
    email: String,
    password: String
