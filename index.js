var app = require('express')();
var http = require('http').Server(app);

//attaching socket io to our server
var io = require('socket.io')(http);

app.use(,function(){

});

app.get('/', function(req, res){
    res.sendFile(__dirname+'app/index.html');
});

var username=[];
//an array of users have been created.


//instantiating a socket connection, handling all
//incomming connection from clients
io.sockets.on('connection', function(socket){


    socket.on('user name',function(user_name){
      users.push({id:socket.id,user_name:user_name});
      len=users.length;
      len--;
      //Sending th user Id and List of users
      io.emit('user entrance',users,users[len].id);
    });

    //collecting the message from a client
    socket.on('chat message', function(data_server){
        //emitting the signal again. telling the client to
        //update the chat with the arguement data, but now
        //we are going to add username.
        io.broadcast.emit('chat message',socket.username, msg);
         socket
         .broadcast
         .to(data_server.id)
         .emit(
             'get msg',
             {
                 msg:data_server.msg,
                 id:data_server.id,
                 name:data_server.name
             }
         );
         //broadcasting to a specific user with a user id in data_server
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
