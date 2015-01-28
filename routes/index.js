var express = require('express');
var tweetBank = require('../tweetBank');
var router = express.Router();
var User = require('../models').User;
var Tweet = require('../models').Tweet;
var sequelize = require('sequelize');

function routes(io) {

    router.get('/', function(req, res) {
        // var tweetDBList = []; //array to hold the list of tweets.
        // Tweet.findAll().then(function(tweet) {
        //     for (var i = 0; i < tweet.length; i++) {
        //         tweetDBList.push(tweet[i].dataValues);
        //     }
        //     tweetNum = tweet.length;

        //     res.render('index', {
        //         title: 'Twitter.js - All Posts',
        //         tweets: tweetDBList,
        //         showForm: true,
        //         name: '',
        //         pic: 'http://lorempixel.com/48/48'
        //     });
        // });
            Tweet.belongsToMany(User, {
            foreignKey: 'UserId'
        });
        User.belongsTo(Tweet, {
            foreignKey: 'id'
        });

        User.findAll().then(function(tweets) {
            console.log(tweets);
        })


    });

    router.get('/users/:name', function(req, res) {
        var name = req.params.name;
        var list = tweetBank.find({
            name: name
        });
        res.render('index', {
            title: 'Twitter.js - Posts by ' + name,
            tweets: list,
            showForm: true,
            name: name,
            pic: 'http://lorempixel.com/48/48'
        });
    });

    router.get('/users/:name/tweets/:id', function(req, res) {
        var userName = req.params.name,
            tweetId = parseInt(req.params.id);
        userTweets = tweetBank.find({
            id: tweetId
        });
        res.render('index', {
            title: 'Tweet ' + tweetId + ' by ' + userName,
            tweets: userTweets,
            showForm: true,
            name: userName,
            pic: 'http://lorempixel.com/48/48'
        });
    });

    router.post('/submit', function(req, res) {
        var text = req.body.text;
        var nameStr = req.body.name;
        var name = User.find({
            where: {
                name: nameStr
            }
        }).then(err,function(uId) {
            Tweet.create({
                id: ++tweetNum,
                UserId: uId,
                tweet: text
            }).then(function(){})
            res.redirect('/');
        });

    router.post('/joins', function(req, res) {
        Tweet.hasMany(User, {
            foreignKey: 'id'
        });
        User.belongsTo(Tweet, {
            foreignKey: 'UserId'
        });

        User.findAll().then(function(tweets) {
            console.log(tweets.dataValues);
        })


    });



    });
    return router;
}
module.exports = routes;