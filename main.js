var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsdom = require('jsdom');


mongoose.connect('mongodb://localhost/text_db');
app.use(bodyParser.urlencoded({extended: true}));

var textSchema = new mongoose.Schema({
    text: String
});

var Text = mongoose.model('Text', textSchema);

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    
    Text.find({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render('index');
        }
    });
});



var timer = null
    var textArea = document.getElementById('myTextarea');
    textArea.addEventListener('keydown', function(){
        clearTimeout(timer);
        timer = setTimeout(function() {
            app.post('/', function(req, res) {
                //res.send('test');
                var text = req.body.text;

                var textObject = {textBody: text};

                console.log(textObject);

                Text.create(textObject, function(err, newCreate) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.redirect('/');
                    }
                });
            });   
        }, 1000)
}, false);
        

app.listen(3000, function() {
   console.log('server start'); 
});