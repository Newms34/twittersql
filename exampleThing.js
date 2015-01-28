var sequelize = require ('sequelize');
var User = require('/models').User;
User.find(123).complete(function(err, user) {
    user.getTweets().complete(function(err, tweets) {
        console.log(tweets);
  })
});