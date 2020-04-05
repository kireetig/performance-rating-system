const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const morgan = require("morgan");

const userRoutes = require('./api/routes/user');
const projectRoutes = require('./api/routes/project');

const url = 'mongodb://127.0.0.1:27017/performance-rating?retryWrites=true'

// connect to db
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected:', url)
  })

db.on('error', err => {
    console.log('There was a db connection error');
    console.log('error is :' + err);
});

// morgan is used for logging http request
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// to handle cors error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// routes which should handle requests
app.use("/user", userRoutes);
app.use("/project", projectRoutes);

// to handle unknown routes
app.use((req, res, next) => {
    const error = new Error("No such Api found");
    error.status = 404;
    next(error);
});

const port = process.env.PORT || 8000;

http.listen(port, () => {
    console.log('app is running on port : ' + port);
});