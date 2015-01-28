var express = require('express');
var tweetBank = require('../tweetBank');
var router = express.Router();
var User = require('../models').User;
var Tweet = require('../models').Tweet;
var sequelize = require ('sequelize');

function routes(io){

router.get('/', function (req, res) {
  // var tweetDBList = [];//array to hold the list o tweetz.
  Tweet.findAll().then( function (tweet){
    // for (var i=0;i<tweet.length;i++){
    //   tweetDBList.push(tweet[i].dataValues);
    // }
    console.log('HERE IS THE LINE: '+tweet[0].dataValues.tweet);
    // res.render( 'index', { title: 'Twitter.js - All Posts', tweets: tweetDBList, showForm: true, name: '', pic:'http://lorempixel.com/48/48'  });
  });
  // var tweets = tweetBank.list();
  

  
  
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, name: name, pic:'http://lorempixel.com/48/48' } );
});

router.get('/users/:name/tweets/:id', function (req,res){
	var userName = req.params.name,
	tweetId = parseInt(req.params.id);
	userTweets =  tweetBank.find({id: tweetId});
	res.render('index',{
		title: 'Tweet '+tweetId+' by '+userName,
		tweets:userTweets, showForm: true, name:userName, pic: 'http://lorempixel.com/48/48' 
	});
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  var allTweets = tweetBank.list(),
  newTweet  = allTweets[allTweets.length-1];
  io.sockets.emit('newTweet',{})
  res.redirect('/');
});
return router;
}
module.exports = routes;
