var express = require('express'),
morgan = require('morgan'),
swig = require('swig'),
bodyParser = require('body-parser'),
socketio = require('socket.io');

var app=express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
var tweetNum = 0;


//body stuff



app.engine('html', swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname+ '/views');
swig.setDefaults({cache: false});

// app.get('/',function (req,res) {
// 	// console.log('A log');
// 	// res.send('Go away! You\'re not welcome here.');
// 	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// 	res.render( 'index', {title: 'People with Weird Names Who Should Be Shunned', people: people} );
// });

// app.get('/tweets',function (req,res) {
// 	res.send('Is there a bird in here?');
// });


app.use(express.static(__dirname+ '/public'));

var server = app.listen(3000, function () {

});

var io = socketio.listen(server);
var routes = require('./routes/')(io);
app.use('/',routes);


// var Sequelize = require('sequelize');
// var User = require('./models/user.js').User;
// User.find(123).complete(function(err, user) {
//     user.getTweets().complete(function(err, tweets) {
//         console.log(tweets);
//   })
// });
