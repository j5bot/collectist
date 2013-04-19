var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app);

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/web'));

app.get('/series/*', function (req, res) {
	res.sendfile(__dirname + '/web/index.html');
});
app.get('/collectist/*', function (req, res) {
	res.sendfile(__dirname + '/web/index.html');
});

server.listen(process.env.PORT);
if (server.address()) {
	console.log('Express server listening on port %d', server.address().port);
}