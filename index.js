var express = require("express");
var app = express();
var Request = require("request");

 var returnJson;
 var port = process.env.PORT || 8080;
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});
 var urlString1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
 var urlString2 = ',us&appid=16de6e612ac71e50cee69605c800b11e';
	app.get('/locations/:zipcode/:scale?', function(req, res) {
	var id = req.params.zipcode;
	var scale = req.query.scale;	
	var urlString3 = urlString1+id+urlString2;
	Request.get(urlString3, (error, response, body) => {
	if(error) {
		return res.send("Please enter a valid zip code");
		process.exit(1);
    }else if(response){
		console.log(body);
		var prettyJson = JSON.parse(body);
		if(prettyJson.cod == 404){
			return res.send("Please enter a valid zip code");
		}
		var temp = prettyJson.main.temp;
		temp = (temp-273.15)*(9/5) + 32;
		if(req.query.scale){
			if((scale == "celcius")||(scale == "Celcius")){
			temp = (temp - 32)*(5/9)
			returnJson = {"temperature":temp, "scale":scale};
			console.log(temp);
		};
		if((scale == "kelvin")||(scale == "Kelvin")){
			temp = (temp - 32)*(5/9) + 273.15;
			returnJson = {"temperature":temp, "scale":scale};
			console.log(temp);
		};
		if(scale == "fahrenheit"){
			returnJson = {"temperature":temp, "scale":scale};
			console.log(temp);
		};
		if((scale != "fahrenheit")&&(scale != "kelvin")&&(scale != "celcius")&&(scale != "Fahrenheit")&&(scale != "Kelvin")&&(scale != "Celcius")){
		// else{	
			returnJson = {"temperature":temp, "scale":scale, "Message":"Currently showing temperature in Fahrenheit, kindly enter a valid scale in future. This app only supports Celcius, Kelvin and Fahrenheit."};
		}
		}else{
			returnJson = {"temperature":temp, "scale":"Fahrenheit"};
		}		
		res.send(returnJson);
		return returnJson;
		};	
		});
	});