const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();


//Create Client
var client = redis.createClient();
client.on('connect', function(){
    console.log('Redis Server Connected')
})

//view engine setup
app.set('views', path.join(__dirname, 'views')); //hold all our templates and views
app.set('view engine', 'ejs'); //use ejs as our templating engine

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //set up to be our client folder

app.get('/', function(req, res){
    var title = 'Games List';

    client.lrange('games', 0, -1, function(err, reply){
        res.render('index', {
            title: title,
            games: reply
        });
    })
}) 

app.post('/game/add', function(req, res){
    var game = req.body.game;
    client.rpush('games', game, function(err, reply){
        if(err){
            console.log(err);
        }
        console.log('Task Added...');
        res.redirect('/');
    } )
})

app.post('/game/delete', function(req, res){
    var gamesToDel = req.body.games;
    client.lrange('games', 0, -1, function(err, games){
        for(var i = 0; i < games.length; i++){
            if(gamesToDel.indexOf(games[i]) > -1){
                client.lrem('games', 0, games[i], function(){
                    if(err){
                        console.log(err)
                    }
                });
            }
        }
        res.redirect('/');
    });
});


app.listen(3000);
console.log('Server listening at port 3000');

module.exports = app;