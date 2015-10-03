A working demo that uses MEAN (MongoDB-Express.js-Angular.js-Node.js) stack. 
It is result of merging various efforts publicly available, notably three of them:

https://github.com/madhums/node-express-mongoose
https://github.com/btford/angular-express-seed
https://github.com/angular/angular-seed

combined with various bits from other sources

To start, you need installations of [node.js](https://nodejs.org/en/), [mongo-db](https://www.mongodb.org/).
Once installed, run first

    npm install
    
to install server side packages (it may complain that cannot rebuild some files, 
but it is safe to ignore), then run

    bower install
    
to install angular and other client side packages


### Useful links
Pro et contra NodeJS
http://stackoverflow.com/questions/5062614/how-to-decide-when-to-use-node-js?rq=1

Javascript design patterns
http://addyosmani.com/resources/essentialjsdesignpatterns/book/

Javascript specification
http://www.ecma-international.org/ecma-262/5.1/
http://www.ecma-international.org/ecma-262/6.0/

Start framework (one has to combine them)
https://github.com/madhums/node-express-mongoose-demo
https://github.com/btford/angular-express-seed
https://github.com/angular/angular-seed

API
// mongoDB native driver
http://mongodb.github.io/node-mongodb-native/2.0/
// mongoose ODM
http://mongoosejs.com/docs/guide.html
// REST routing server side
http://expressjs.com/
// NodeJS
https://nodejs.org/api/
// Javascript (ECMA) used
https://nodejs.org/en/docs/es6/
// AngularJS
https://docs.angularjs.org/api

#### Mobile app

[How to convert an existing AngularJS web app to a Cordova app?](http://stackoverflow.com/questions/25961013/how-to-convert-an-existing-angularjs-web-app-to-a-cordova-app)

[Building Mobile Apps with AngularJS and Ionic](http://blog.ionic.io/angular-mobile-dev/)



# Angular Express Seed

Start an awesome app with AngularJS on the front, Express + Node on the back. This project is an
application skeleton for a typical [AngularJS](http://angularjs.org/) web app for those who want
to use Node to serve their app.

The seed contains angular libraries, test libraries and a bunch of scripts all preconfigured for
instant web development gratification. Just clone the repo (or download the zip/tarball) and
you're ready to develop your application.

The seed app shows how to wire together Angular client-side components with Express on the server.
It also illustrates writing angular partials/views with the Jade templating library.

_Note: Although Jade supports interpolation, you should be doing that mostly on the client. Mixing
server and browser templating will convolute your app. Instead, use Jade as a syntactic sugar for
HTML, and let AngularJS take care of interpolation on the browser side._

## How to use angular-express-seed

Clone the angular-express-seed repository, run `npm install` to grab the dependencies, and start hacking!

### Running the app

Runs like a typical express app:

    node serverApp.js

### Running tests

Coming soon!

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.


## Directory Layout
    
    serverApp.js              --> app config
    package.json        --> for npm
    bin/
        www             --> server side application runner
    config/             --> server side configuration
      env/              --> environment dependent global configurations
        development.js
        production.js
        test.js
      middlewares/      --> middlewares to be mounted (by express)
        authorization.js    --> authorization middleware 
        HSTS.js         --> Force using Strict-Transport-Security
      passport/         --> passport authentication policies
        facebook.js
        github.js
        google.js
        linkedin.js
        local.js
        twitter.js
      default.js        --> default global configuration
      expressConfig.js  --> express module main configuration
      FAMA-WINDOWS.js   --> local machine specific configuration
      imager.js
      passport.js       --> passport authentication module main configuration
      README.md         --> config README - notes on writing portable configuration
      routesConfig.js   --> server side main routing table
    public/             --> client side files
      bower_components/            --> angular and 3rd party JavaScript libraries
          angular/      --> the latest angular js
          ...
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      js/               --> client side javascript files
        app.js          --> declare top-level app module
        controllers.js  --> application controllers
        directives.js   --> custom angular directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
    routes/             --> server side routing functions that are more complex than those in config/routesConfig.js
      api.js            --> route for serving JSON
      index.js          --> route for serving HTML pages and partials
    services/           --> server side application logic
        model/          --> database model
    test/               --> tests
        e2e-tests/      --> end-to-end tests
        unit/           --> unit tests
    toolbox/            --> various auxiliary functions
    views/              --> view templates
      index.jade        --> main page for app
      layout.jade       --> doctype, title, head boilerplate
      partials/         --> angular view partials (partial jade templates)
        partial1.jade
        partial2.jade



## Example App

A simple [blog](https://github.com/btford/angular-express-blog) based on this seed.


## Contact

For more information on AngularJS please check out http://angularjs.org/
For more on Express and Jade, http://expressjs.com/ and http://jade-lang.com/ are
your friends.

## License
MIT
