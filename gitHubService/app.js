'use strict';

var express = require('express');
var nconf = require('./lib/config');
var path = require('path')
var Parser = require('./services/gitParser')


var routes = require('./routes/api');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    res.parser = parser

    next();
});


app.use('/api', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});






app.set('port', nconf.get("server.port") || 3000);
//Запускаем парсер
let parserConfig = nconf.get('parser')
var parser = new Parser(parserConfig.delay, parserConfig.limit)
parser.start()


var server = app.listen(app.get('port'), function () {
    

    console.log('Express server listening on port ' + server.address().port);
});
