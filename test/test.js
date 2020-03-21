var expect  = require('chai').expect;
var request = require('request');
var assert = require('assert');

it('Valid Zip Code and Scale Test', function(done) {
    request('http://localhost:8080/locations/24060?scale=celsius' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
it('Valid Zip Code and Scale Test', function(done) {
    request('http://localhost:8080/locations/24060' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Invalid Zip Code and valid Scale Test', function(done) {
    request('http://localhost:8080/locations/2406000?scale=celsius' , function(error, response, body) {
        expect(body).to.equal('Invalid Request');
        done();
    });
});
it('Invalid Zip Code and Invalid Scale Test', function(done) {
    request('http://localhost:8080/locations/24060?scale=Fahrenheit' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});