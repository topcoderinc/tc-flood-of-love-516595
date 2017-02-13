var express = require('express')
var app = express()

const max_stories = 1

app.set('view engine', 'pug')
app.use(express.static('static'));

app.get('/', (request, response) => {
  var words = {}
  var filter = /<<[\w\s]+>>/

  var storyNumber = Math.floor(Math.random()*max_stories + 1)
  var story = require(`./stories/${storyNumber}.js`).story

  result = filter.exec(story)
  var i = 0
  while(result != null){
    word_class = result[0].substring(2, result[0].length - 2)
    words[i] = word_class
    story = story.replace(filter, `$${i}`)
    result = filter.exec(story)
    i += 1
  }
  response.render('input', {words: words, story: story})
})

app.get('/scripts/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/scripts/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    }
  });

});

app.get('/stylesheets/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/stylesheets/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    }
  });

});


app.listen((proccess.env.PORT || 3000), function(err){
  if(err){
    console.log("Some very unexplainable error ocurred.")
  }
  else{
    console.log("We're up and listening on port 3000.")
  }
})
