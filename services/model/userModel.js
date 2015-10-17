/**
 * Module dependencies.
 */
(function() {

'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;
var oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
];

/**
 * User Schema
 */

var UserSchema = new Schema({
  userid: {type: Number, default: 0},
  firstname: {type: String, default: ''},
  lastname: {type: String, default: ''},
  email: {type: String, default: ''},
  username: {type: String, default: ''},
  provider: {type: String, default: ''},
  hashedPassword: {type: String, default: ''},
  salt: {type: String, default: ''},
  authToken: {type: String, default: ''},
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) {
    return true;
  }
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) {
    fn(true);
  }

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({email: email}).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else {
    fn(true);
  }
}, 'Email already exists');

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) {
    return true;
  }
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashedPassword').validate(function (hashedPassword) {
  if (this.skipValidation()) {
    return true;
  }
  return hashedPassword.length && this._password.length;
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @access public
   */

  authenticate: function (plainText) {
    //console.log("userModel authenticate " + plainText);

    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @access  public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @access  public
   */

  encryptPassword: function (password) {
    if (!password) {
      return '';
    }
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @access  private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username id userid';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  userIdCounter:  function() {
  return 'userid';
}
};

var collectionName = 'users';
mongoose.model('User', UserSchema, collectionName);

})();
