
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mcapi = require('./node_modules/mailchimp-api/mailchimp');
var auth = require('./config/auth');
var mc = new mcapi.Mailchimp(auth.mailchimpApiKey);

var app = express();


// all environments
app.set('port', process.env.PORT || 9006);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/subscribe', function(req, res){
  mc.lists.subscribe({id: auth.mailchimpListId, email:{email:req.body.email}, double_optin: false}, function(data) {
    res.send(data);
  }, function(err) {
    console.log(err);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
