var express = require('express');
var tweetBank = require('../tweetBank');
var router = express.Router();
var User = require('../models').User;
var Tweet = require('../models').Tweet;
var sequelize = require ('sequelize');

function routes(io){

router.get('/', function (req, res) {
  var tweetDBList = [];//array to hold the list o tweetz.
  // User.hasMany(Tweet,{foreignKey:'UserId'});
  // Tweet.belongsToMany(User,{foreignKey:'id'})
  Tweet.findAll({ include: [ User ] }).then( function (tweet){
    for (var i=0;i<tweet.length;i++){
      tweetDBList.push(tweet[i].dataValues);
    }
    
    //from tweet, we get: userid, tweet (the text), id
    tweetNum = tweet.length;
    res.render( 'index', { title: 'Twitter.js - All Posts', tweets: tweetDBList, namePerTweet: 'Bob',showForm: true, name: '', pic:'http://lorempixel.com/48/48'  });    
    
  });
  // var tweets = tweetBank.list();
  

  
  
});
// app.get('/users/:name', function(req, res) {
//       var name = req.params.name;
//    User.find({ include: Tweet, where: {name: name}}).then(function(user) {
//        res.render( 'index', { title: 'Twitter.js - Posts by ' + user.name, tweets: user.Tweets, showForm: true, name: name} );
//    })
//     });
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
User.find({ include: Tweet, where: {name: name}}).then(function(user) {

       res.render( 'index', { title: 'Twitter.js - Posts by ' + user.name, tweets: user.Tweets, showForm: true, name: name} );
   })
});

router.get('/users/:name/tweets/:id', function (req,res){
	var userName = req.params.name,
	tweetId = parseInt(req.params.id);
User.find({ include: Tweet, where: {name: userName, id:tweetId}}).then(function(user) {

	res.render('index',{
		title: 'Tweet '+tweetId+' by '+userName,
		tweets:userTweets, showForm: true, name:userName, pic: 'http://lorempixel.com/48/48' 
	});
});
});

router.post('/submit', function(req, res) {
  var text = req.body.text;
  var nameStr = req.body.name;
  var name = User.find({where: {name: nameStr}}).then(function(yoozr){
    if (yoozr!==null){
     Tweet.create({id:++tweetNum, UserId: yoozr.id, tweet:text}).then(function(){
         
       })
 
    }
    else {
      console.log ('ur a noob');
    }
       res.redirect('/');
  });
  
  
  // //convert name using a join to the 

});
return router;
}
module.exports = routes;
