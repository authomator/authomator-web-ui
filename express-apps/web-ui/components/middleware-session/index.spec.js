'use strict';

var chai = require("chai"),
  _ = require('lodash');

var expect = chai.expect;

/**************************************************************************
 * Begin of tests
 *************************************************************************/

var sess = require('./index.js');


describe('middleware-session', function() {

  var req;

  beforeEach(function(){
    req = {
      headers: {}
    };
  });

  it('should be a function', function () {
    expect(sess).to.be.a('function');
  });

  it('should return a function', function(){
    expect(sess()).to.be.a('function');
  });

  it('should return a middleware', function(done){
    var next = function(err){
      expect(err).to.not.exist;
      done();
    };
    sess()(req, {}, next);
  });

  it('the middleware returned has to add session to the req', function(done){
    var next = function(err){
      expect(err).to.not.exist;
      expect(req).to.have.a.property('session');
      expect(req.session).to.be.an('object');
      done();
    };
    sess()(req, {}, next);
  });

  it('should prevent returning a middleware when no secret is set', function(){

    var noSecret = function(){
      sess({secret: null});
    };
    expect(noSecret).to.throw('Critical issue, no cookie secret is configured..stopping');
  });

});
