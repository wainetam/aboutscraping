
/**
 * Module dependencies.
 */

var cheerio = require('cheerio'),
    request = require('request'),
    zombie = require('zombie'),
    fs = require('fs'),
    assert = require('assert');
    // phantom = require('node-phantom'),
    // Spooky = require('spooky');

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//** CHEERIO AND REQUEST

var cheerio = require('cheerio'),
    request = require('request');

var urlToCrawl = "http://www.amazon.com/Pebble-Smartwatch-iPhone-Android-Black/dp/B00BKEQBI0";
// var urlToCrawl = "http://www.yelp.com/biz/the-cinnamon-snail-new-york-2";

var cheerioCrawl = function(url, domElement) {

  // var url = urlObj.url;

  var linksToCrawl = [];
  var title;
  var pageHtml = request(urlToCrawl, function(err, response, body) { // request takes an object w parameters: method, uri
    if(err && response.statusCode !== 200) {
      console.log('Request error.');
    }
    $ = cheerio.load(body);

    // console.log("start body*********************");
    // console.log(body);
    // console.log("end body***********************");

    var targetData = $(domElement).text();
    console.log('Cheerio element ' + domElement + ": " + targetData);

  });
};

// cheerioCrawl(urlToCrawl, 'title');
// cheerioCrawl(urlToCrawl, '#priceblock_ourprice');


//** ZOMBIE JS

var zombie = require("zombie");

var zombieCrawl = function(url) {
  zombie.visit(url, function (err, browser, status) {

    // console.log(browser.html());

    // $ = cheerio.load(browser.document.body);
    // var price = $('#priceblock_ourprice').text();
    var price = browser.document.getElementById('priceblock_ourprice').innerHTML;
    console.log('(Zombie) Price of domElement: ', price);
  });
};

zombieCrawl(urlToCrawl);


