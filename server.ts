const express = require('express');
const http = require('http');
const path = require('path');
const querystring = require("querystring");
const request = require('request'); // "Request" library
const url = require('url');


const app = express();

const port = 3001;

app.use(express.static(__dirname + '/dist/spotify-app'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));


//spotify login

var client_id = '24ec2440c94e42a0b4e83860d6aa39be';
var redirect_uri = 'http://localhost:3001/credentials/';
var client_secret ='55fa096f06a34e41ab47555ce76f1402';
let token =''


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'playlist-modify-private playlist-read-private user-library-read user-follow-read user-library-modify playlist-modify-public user-top-read playlist-read-collaborative user-read-private user-read-email user-modify-playback-state user-follow-modify user-read-recently-played';
  
  
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      show_dialog : true,
      scope: scope,
    }));
});
    
    
// your application requests authorization

app.get('/credentials', function(req, res) {
  var code = req.query.code || null;
  
  var state = req.query.state || null;

  


  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
      'Content-Type':'application/x-www-form-urlencoded'
    },
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    json: true
  };

  
  request.post(authOptions, function(error, response, body) {
   token = body.access_token;
   console.log('form server token' +token)
    //return res.status(200).json(body);
    res.redirect('http://localhost:3001/')
    console.log(body)
    
  });
  
});

app.get('/api/playlists', function(req, res) {
  
 var options = {
        url: 'https://api.spotify.com/v1/me/playlists',
       headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType:'json',
         json: true
       };
       request.get(options, function(error, response, body) {
         console.log(body);
         res.json(body)
       });
     
});

app.get('/api/me/tracks', function(req, res) {
  
 var options = {
        url: 'https://api.spotify.com/v1/me/tracks',
       headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType:'json',
         json: true
       };
       request.get(options, function(error, response, body) {
         console.log(body);
         res.send(body)
       });
     
});

app.get('/api/me', function(req, res) {
  console.log('api/me token ',token);
 var options = {
        url: 'https://api.spotify.com/v1/me/',
       headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType:'json',
         json: true
       };
       request.get(options, function(error, response, body) {
         console.log(body);
         res.send(body)
       });
     
});




app.get('/api/me/top/artists', function(req, res) {
  var time_range= req.query.time_range;
  var options = {
         url: 'https://api.spotify.com/v1/me/top/artists?time_range='+time_range,
        headers: {
           'Authorization': 'Bearer ' + token,
         },
         responseType:'json',
          json: true
        };
        request.get(options, function(error, response, body) {
          console.log(body);
          res.send(body)
        });
      
 });


















  const generateRandomString = (myLength) => {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
  };