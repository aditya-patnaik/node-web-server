const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //process.env.PORT for heroku || locally for windows(3000)
var app = express();

hbs.registerPartials(__dirname + '/views/partials' );
app.set('view engine', hbs);

//middlewares
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs', {
		pageTitle: 'Maintenance'
	});
});

app.use(express.static(__dirname + '/public'));

//registering template helper
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Hey there!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About'
	});
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});