const express = require("express")
const bodyparser = require('body-parser');

const mysql = require('mysql');
const connection = require('./lib/db');
const usersRouter = require("./routes/users")

const app = express()
app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json())
app.use(bodyparser.json())


app.use("/", usersRouter)
app.use(function(req, res, next) {
    res.status(404)
    res.send()
});

const port = 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})