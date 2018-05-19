var express = require("express");
var app = new express();
var port = process.env.PORT || 8080;
var http = require("http").createServer(app);
var io = require("socket.io")(http);

http.listen(port);

app.use('/',express.static(__dirname+ '/sources'));

app.get("/", function (req, res) {
    res.sendFile(__dirname+'/sources/index.html');
});

io.on('connection', function (socket) {
    socket.on('stream', function (chunk) {
        socket.broadcast.emit('stream',chunk);
    });
});
