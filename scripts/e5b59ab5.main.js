Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c;if(null==this)throw new TypeError('"this" is null or not defined');var d=Object(this),e=d.length>>>0;if(0===e)return-1;var f=+b||0;if(Math.abs(f)===1/0&&(f=0),f>=e)return-1;for(c=Math.max(f>=0?f:e-Math.abs(f),0);e>c;){if(c in d&&d[c]===a)return c;c++}return-1}),Array.prototype.shuffle=function(){var a,b,c=this.length;if(0==c)return this;for(;--c;)a=Math.floor(Math.random()*(c+1)),b=this[c],this[c]=this[a],this[a]=b;return this},angular.module("ninja.shout.WhoTweetedClient",["ngResource","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"InfoController"}).when("/game",{templateUrl:"views/game.html",controller:"TweetController"}).otherwise({redirectTo:"/"})}]).constant("USER_GUESS_COUNT",4).service("URL",[function(){this.REST_BASE="http://104.236.234.113:3000",this.URL_TWEETS=this.REST_BASE+"/tweets",this.URL_USERS=this.REST_BASE+"/users"}]).service("API",["$resource","URL",function(a,b){this.tweets=a(b.URL_TWEETS),this.users=a(b.URL_USERS)}]).controller("TweetController",["$scope","$http","API","USER_GUESS_COUNT","URL",function(a,b,c,d,e){a.reset=function(){c.tweets.query().$promise.then(function(b){a.tweets=b,a.tweets.shuffle(),c.users.query().$promise.then(function(b){a.users=b,a.score=0,a.tweets.forEach(function(b){b.guessMade=!1,b.possibleUsers=[];for(var c=[],e=0;d-1>e;){var f=Math.floor(Math.random()*a.users.length);a.users[f].username!==b.user.username&&c.indexOf(f)<0&&(b.possibleUsers.push(a.users[f]),c.push(f),e++)}b.possibleUsers.push(b.user),b.possibleUsers.shuffle()})})}),a.time=30;var b=setInterval(function(){a.$apply(function(){a.time--}),0===a.time&&(clearInterval(b),$("#time").openModal())},1e3)},c.tweets.query().$promise.then(function(b){a.tweets=b,a.tweets.shuffle(),a.time=30;var e=setInterval(function(){a.$apply(function(){a.time--}),a.userTime=a.time,0===a.time&&(clearInterval(e),$("#time").openModal({dismissible:!1}))},1e3);c.users.query().$promise.then(function(b){a.users=b,a.score=0,a.tweets.forEach(function(b){b.guessMade=!1,b.possibleUsers=[];for(var c=[],e=0;d-1>e;){var f=Math.floor(Math.random()*a.users.length);a.users[f].username!==b.user.username&&c.indexOf(f)<0&&(b.possibleUsers.push(a.users[f]),c.push(f),e++)}b.possibleUsers.push(b.user),b.possibleUsers.shuffle()})})}),a.guessMade=function(b,c){b.guessMade=!0,b.correct=b.user.username===c.username,a.score+=b.correct?1:-1}}]).controller("InfoController",["$scope","API",function(a,b){b.users.query().$promise.then(function(b){a.users=b})}]);