var chai = require('chai');
var expect = chai.expect;

var app = require('./index')();

describe('Authomator Web UI', function(){

  it('should be an Express app', function(){
    expect(app).to.be.a('function');
    expect(app.get).to.be.a('function');
    expect(app.post).to.be.a('function');
  });

  it('view engine should be set to jade', function(){
    expect(app.get('view engine')).to.equal('jade');
  });

  describe('i18n', function(){
    it('should set the correct language based on browser settings');
    it('should set the correct language based on query params');
  });

  describe('/forgot-password', function(){
    it('should handle GET');
    it('should handle POST');
  });

  describe('/reset-password', function(){
    it('should handle GET');
    it('should handle POST');
  });

  describe('/sign-in', function(){
    it('should handle GET');
    it('should handle POST');
  });

  describe('/sign-up', function(){
    it('should handle GET');
    it('should handle POST');
  });

});
