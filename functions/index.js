const functions = require("firebase-functions");
const express = require('express');
const crypto = require('crypto');
const emailvalidator = require("email-validator");
const app = express();
const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
	res.render('home', {layout: false});
});

app.post('/', (req, res) => {
	console.log(req.body);
	let list = req.body.input.split('\n')
	let result = "";
	for(let i = 0; i < list.length; i++)
	{
		let email = list[i].toLowerCase().trim();
		if(email.length > 0 && emailvalidator.validate(email))
		{
			result += `${crypto.createHash('md5').update(email).digest("hex")}\n`;
		}
	}


	res.render('home', {layout: false, result:result});
});

const isValidEmailAddress = (email) =>
{
  return emailvalidator.validate(email);
}

exports.app = functions.https.onRequest(app);
