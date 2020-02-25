var expect  = require('chai').expect;
var request = require('request');
var assert = require('assert');

it('Valid Zip Code and Scale Test', function(done) {
    request('http://localhost:8080/locations/24060?scale=celcius' , function(error, response, body) {
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
it('Valid Zip Code and Invalid Scale Test', function(done) {
    request('http://localhost:8080/locations/24060?scale=celciusggg' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
		// assert.equal(body,'{"temperature":34.97000000000006,"scale":"celciusggg","Message":"Currently showing temperature in Fahrenheit, kindly enter a valid scale in future. This app only supports Celcius, Kelvin and Fahrenheit."}');
        done();
    });
});
it('Invalid Zip Code and valid Scale Test', function(done) {
    request('http://localhost:8080/locations/2406000?scale=celcius' , function(error, response, body) {
        expect(body).to.equal('Please enter a valid zip code');
        done();
    });
});
it('Invalid Zip Code and Invalid Scale Test', function(done) {
    request('http://localhost:8080/locations/2406000?scale=celciusssss' , function(error, response, body) {
        expect(body).to.equal('Please enter a valid zip code');
        done();
    });
});