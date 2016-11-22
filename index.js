var express = require('express');
var path=require('path');
var http = require('http');
var app=express();


//attaching socket io to our server
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'app')));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

var users=[];
//an array of users have been created.

var httpServer=http.createServer(app);
var io = require('socket.io').listen(httpServer);

//instantiating a socket connection, handling all
//incomming connection from clients
io.sockets.on('connection', function(socket){


    socket.on('user name',function(user_name){
      users.push({id:socket.id,user_name:user_name});
      len=users.length;
      len--;
      //Sending the user Id and List of users
      io.emit('user entrance',users,users[len].id);
    });

    //collecting the message from a client
    socket.on('chat message', function(data_server){
        //emitting the signal again. telling the client to
        //update the chat with the arguement data, but now
        //we are going to add username.
         socket
         .broadcast
         .to(data_server.id)
         .emit(
             'get msg',
             {
                 msg:data_server.msg,
                 id:data_server.id,
                 senderid:data_server.senderid,
                 name:data_server.name
             }
         );
         //broadcasting to a specific user with a user id in data_server
    });
});

httpServer.listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});
