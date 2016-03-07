'use strict';

let app = require('express')();
let request = require('request');
let cheerio = require('cheerio');

app.get('/', function(req, res) {
	let url = 'https://www.smashingmagazine.com/tag/javascript/';
	request(url, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			let articles = [];
			let $ = cheerio.load(body);
			$('article').each(function(i, element){
				let title = $('h2 a span', this).text();
				let author = $('ul li a', this).first().text();
				let cover = $('figure a img', this).attr('src');
				let summary = $('p', this).first().text();

				articles.push({ tag: 'js', host: 'https://www.smashingmagazine.com/', article: { title, author, cover, summary } });
			});
			res.json(articles);
		};
	});
});

let server = app.listen(3000, function() {
	console.log('Listening to http://localhost:3000/');
});