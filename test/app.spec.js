var chai = require('chai');
var express = require('express');
var expect = chai.expect;

var app = require('../express-app');

describe('Authomator Web UI', function(){

  it('should be an Express app', function(){
    expect(app).to.be.a('function');
    expect(app.get).to.be.a('function');
    expect(app.post).to.be.a('function');
  });

  it('view engine should be set to jade', function(){
    expect(app.get('view engine')).to.equal('jade');
  });

});
