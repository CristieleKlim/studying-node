var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    config = require('../config/variables');;

module.exports = function () {
    var app = express();

/*    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });*/


    app.set('port', 3000);

    app.use(express.static(__dirname+'/../public'));
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // session and passport configuration
    app.use(cookieParser());
    app.use(session(
        {
            secret: 'teste',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);


    return app;
}