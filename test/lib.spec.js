var chai = require('chai');
var express = require('express');
var expect = chai.expect;

var app = require('../lib');

describe('Authomator Web UI', function(){

  it('should be an Express app', function(){
    expect(app).to.be.a('function');
    expect(app.get).to.be.a('function');
    expect(app.post).to.be.a('function');
  });

});
