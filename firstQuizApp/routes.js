var passport = require('passport');
var Account = require('./models/account');
var Question = require('./models/question');

module.exports = function (app) {

  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

  app.get('/quizMaster/createQuestion', function(req, res) {
          if(!req.user)
              res.redirect('/login');
          if(req.user)
              res.render('newQuestion', { title : 'Create Question' });      
  });

  app.post('/quizMaster/submitQuestion', function(req, res) {
    if(!req.user)
        res.redirect('/login');
    if(req.user)
    {
        var title = req.body.question;
        var correctAnswer = req.body.correctAnswer;
        var wrongAnswers = [req.body.wrongAnswer1, 
          req.body.wrongAnswer2, req.body.wrongAnswer3];

        new Question({
          title: title,
          answers: { correct: correctAnswer, incorrect: wrongAnswers}
        }).save();
        
        req.method = "get";
        res.redirect("/quizMaster/createQuestion");
    }
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

};