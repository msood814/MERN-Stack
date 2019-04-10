const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/errorlogger');
const myRequestLogger = require('./utilities/requestlogger');
const create = require("./model/dbsetup")
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(myRequestLogger);
app.use('/', router);
app.use(myErrorLogger);

app.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

app.listen(2040);
console.log("Server listening in port 2040");

module.exports = app;