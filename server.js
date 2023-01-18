const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const { DB_URL_DEVELOPMENT, DB_URL_PRODCTION } = require('./config');

const app = express();

app.use(express.json());

app.use(cors());


// app.get('/', (req, res) => {
//     res.json({ message: 'Hello from Express' });
// })

app.use('/api/tests', require('./routes/testsRoutes'));

app.use('/api/users', require('./routes/usersRoutes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const env = app.get('env');
const DB_URL = env === 'development' ? DB_URL_DEVELOPMENT : DB_URL_PRODCTION;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (e) => {
    console.log(e)
    console.log('Connected to database');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
})