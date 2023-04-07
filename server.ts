const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const querystring = require("querystring");
const request = require('request'); // "Request" library
const url = require('url');
const app = express();

const port = process.env["PORT"] || 3001;

app.use(express.static(__dirname + '/dist/spotify-app'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
//spotify login
var client_id = 'e4960cc586854b839fbad87ba0b30c3d';
var redirect_uri = 'https://spotify-statistics-app.herokuapp.com/credentials/';
var client_secret ='6d73641fa6514f5bbe49bb9d6b7bb399';

app.set('trust proxy', 1)
app.use(session({
  secret: 'asdasfdfs32asdfdffsn', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Set to true if using HTTPS
    maxAge: 3600000 // Set the session cookie expiration time in milliseconds
  }
}));

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

app.get('/api/logout', function(req, res) {
  // Destroy the session
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      // Redirect to the logout page or perform any other logout logic
      res.redirect('https://spotify-statistics-app.herokuapp.com');
    }
  });
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
    req.session.token = body.access_token;
    console.log( req.session.token);
    res.redirect('https://spotify-statistics-app.herokuapp.com')

  });

});

app.get('/api/playlists', function(req, res) {
  var token = req.session.token;
  var options = {
        url: 'https://api.spotify.com/v1/me/playlists?limit=49&offset=0',
       headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType:'json',
         json: true
       };
       request.get(options, function(error, response, body) {
         res.json(body)
       });

});

app.get('/api/me/top/tracks', function(req, res) {
  var token = req.session.token;
  var offset= req.query.offset || 0;
 var options = {
        url: 'https://api.spotify.com/v1/me/tracks?limit=50&offset='+offset,
       headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType:'json',
         json: true
       };
       request.get(options, function(error, response, body) {
         res.send(body)
       });

});

app.get('/api/me', function(req, res) {
  var token = req.session.token;
  
 var options = {
        url: 'https://api.spotify.com/v1/me/',
       headers: {
          'Authorization': 'Bearer ' + token,
        },
        responseType:'json',
         json: true
       };
       request.get(options, function(error, response, body) {
        console.log("In api/me " +token);
         console.log(body);
         res.send(body)
       });

});
app.get('/api/me/top/artists', function(req, res) {
  var token = req.session.token;
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
          res.send(body)
        });

 });
 app.get('/api/audio-features', function(req, res) {
  var token = req.session.token;
  var id= req.query.trackId;
  var options = {
         url: 'https://api.spotify.com/v1/audio-features/'+id,
        headers: {
           'Authorization': 'Bearer ' + token,
         },
         responseType:'json',
          json: true
        };
        request.get(options, function(error, response, body) {
          res.send(body)
        });

 });

 app.get('/api/track', function(req, res) {
  var token = req.session.token;
  var id= req.query.trackId;
  var options = {
         url: 'https://api.spotify.com/v1/tracks/'+id,
        headers: {
           'Authorization': 'Bearer ' + token,
         },
         responseType:'json',
          json: true
        };
        request.get(options, function(error, response, body) {
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