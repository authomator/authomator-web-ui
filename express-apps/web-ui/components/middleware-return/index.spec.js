'use strict';

var chai = require("chai");
var expect = chai.expect;

/**************************************************************************
 * Begin of tests
 *************************************************************************/

var mw = require('./index.js');


describe('middleware.return', function() {

    var req;

    beforeEach(function(){
        req = {
            query: {return: 'http://127.0.0.1'},
            session: {}
        };
    });

    it('should be a function', function(){
        expect(mw).to.be.a('function');
    });

    it('should return a middleware', function(done){
        var next = function(err){
            expect(err).to.not.exist;
            done()
        };
        mw()(req, {}, next);
    });

    it('should call next with an error if no session middleware is active', function(done){
        delete req.session;
        var next = function(err){
            expect(err).to.exist;
            expect(err).to.have.a.property('message', 'Unable to add return to session, please activate a session middleware !!');
            done()
        };
        mw()(req, {}, next);
    });

    it('should add return to req.session', function(done){
        var next = function(err){
            expect(err).to.not.exist;
            expect(req).to.have.a.deep.property('session.return', req.query.return);
            done()
        };
        mw()(req, {}, next);
    });

    it('should accept another return query name and use it to set it in req.session.return', function(done){

      req.query.world = 'http://hello.there/';

      var next = function(err){
        expect(err).to.not.exist;
        expect(req).to.have.a.deep.property('session.return', req.query.world);
        done()
      };
      mw({query: 'world'})(req, {}, next);
    });

    it('should not add return to req.session if a return is already set', function(done){
        req.session.return = 'whatever';
        var next = function(err){
            expect(err).to.not.exist;
            expect(req).to.have.a.deep.property('session.return', 'whatever');
            done()
        };
        mw()(req, {}, next);
    });
});
