/*!
 * Module dependencies.
 */
'use strict';

var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
//var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];
var userProfileAuth = [auth.requiresLogin, auth.user.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  /*
  app.get('/login', users.login);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  app.get('/users/:userId', users.show);
  */
/*
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), users.signin);
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/linkedin',
    passport.authenticate('linkedin', {
      failureRedirect: '/login',
      scope: [
        'r_emailaddress'
      ]
    }), users.signin);
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      failureRedirect: '/login'
    }), users.authCallback);

  app.param('userId', users.load);

  // article routes
  app.param('id', articles.load);
  app.get('/articles', articles.index);
  app.get('/articles/new', auth.requiresLogin, articles.new);
  app.post('/articles', auth.requiresLogin, articles.create);
  app.get('/articles/:id', articles.show);
  app.get('/articles/:id/edit', articleAuth, articles.edit);
  app.put('/articles/:id', articleAuth, articles.update);
  app.delete('/articles/:id', articleAuth, articles.destroy);

  // home route
  app.get('/', articles.index);

  // comment routes
  app.param('commentId', comments.load);
  app.post('/articles/:id/comments', auth.requiresLogin, comments.create);
  app.get('/articles/:id/comments', auth.requiresLogin, comments.create);
  app.delete('/articles/:id/comments/:commentId', commentAuth, comments.destroy);

  // tag routes
  app.get('/tags/:tag', tags.index);

*/
  /**
   * ======================================
   Routes
   * ======================================
   */
  var routes = require('../routes');
  var api = require('../routes/api');
  var index2 = require('../routes/index2');
  var userService = require('../services/userService');
  var restaurantService = require('../services/restaurantService');

// serve index and view partials
  app.get('/', routes.index);
  app.get('/partials/:name', routes.partials);

// JSON API
  app.get('/api/csrf', api.csrf);
  app.get('/api/name', api.name);
  app.get('/restaurant', restaurantService.restaurants);
  app.get('/restaurant/:restaurantId', restaurantService.restaurantDetail);

  app.post('/signup', userService.create);
  //
  // authentication is requested from LogInCtrl using LogInService
  // authentication is configured in /config/passport.js and /config/passport/local.js
  //
  app.post('/loginLocal',
    passport.authenticate('local', {
      // FROM node_modules/passport/lib/middleware/authenticate.js :
      //
      // When failure handling is not delegated to the application, the default
      // is to respond with 401 Unauthorized.  Note that the WWW-Authenticate
      // header will be set according to the strategies in use (see
      // actions#fail).  If multiple strategies failed, each of their challenges
      // will be included in the response.
      failureRedirect: '/loginFail',
      failureFlash: 'Invalid email or password.',
      failureMessage: 'Invalid credentials'
    }), userService.loginLocal);
  app.get('/loginFail', userService.loginFail);
  app.get('/users/:userId/', userProfileAuth, userService.getUser);
  app.get('/users', userProfileAuth, userService.getUser);
  app.post('/users/:userId/', userProfileAuth, userService.updateUser);

  app.use('/index2', index2);

// redirect all others to the index (HTML5 history)
  app.get('*', routes.index);

  /*
   * ======================================
   ERROR HANDLING
   * ======================================


   //var errorHandler = require('error-handler');
   var env = process.env.NODE_ENV || 'development';
   // development only
   if (env === 'development') {
   app.use(express.errorHandler());
   }
   // production only
   if (env === 'production') {
   // TODO
   }
   */
// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handlers

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.error(JSON.stringify(err));
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    console.error(JSON.stringify(err));
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });


  /**
   * Error handling

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
   */

};
