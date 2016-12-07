var express=require('express');
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);

app.use(express.static('client'));


app.get('/hola',function(req,res){
    res.status(200).send('Hola mundo desde una ruta');
});


var messages=[{
    id:1, 
    text:'Bienvenido al chat privado de socket.io y node.js de edwin dennis...',
    nickname:'Bot-EdwinDennis'
}];

io.on('connection',function(socket){
    console.log("El cliente  con IP: "+socket.handshake.addres+" se ha conectado...");
    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);
        
        //emitimos a todos los clientes conectados
        io.sockets.emit('messages',messages);
    })
});

server.listen(6677,function(){
    console.log("El servidor esta funcionando en http://localhost:6677");
})