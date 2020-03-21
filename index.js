var express = require("express");
var app = express();
var Request = require("request");

 var port = process.env.PORT || 8080;
 app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});
//ma ki choot
	app.get('/locations/:zipcode', (req, res) => {
	const zip_code = req.params.zipcode;
	let query_scale = req.query.scale === undefined || req.query.scale === 'Fahrenheit' ? 'Fahrenheit' : 'Celsius'
	let scale = query_scale === 'Fahrenheit' ? 'imperial' : 'metric'; 
	let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	let weather_req = new XMLHttpRequest();
	let url = 'http://api.openweathermap.org/data/2.5/weather?zip='+zip_code+',us&units='+scale+'&appid=16de6e612ac71e50cee69605c800b11e';
	let temperature = 0;
	let ifError = true;
	weather_req.open('GET',url,false);
	weather_req.onreadystatechange = function() {
				if (weather_req.readyState == 4 && weather_req.status == 200) {
					temperature = JSON.parse(weather_req.responseText).main.temp
					ifError = false
				}
			}
	weather_req.send();
	let answer = {
		'temperature':temperature,
		'scale': query_scale
	}
	if(ifError){
		res.status(400);
		res.send("Invalid Request");
	}else{
		res.status(200);
		res.send(answer);
	}
});