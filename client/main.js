var socket=io.connect('http://192.168.0.2:6677',{'forceNew':true});

socket.on('messages',function(data){
    console.log(data);
    render(data);
});


function render(data){
    //map permite recorrer lo que tiene data,igual a for y otros bucles,en cada iteracion los datos se guardar en message,index es el indice
    var html=data.map(function(message,index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <span>${message.text}</span>
            </div>
        `);
    }).join(' ');

    var div_msgs=document.getElementById('messages');
    div_msgs.innerHTML=html;
    div_msgs.scrollTop=div_msgs.scrollHeight;


    
}


function addMessage(e){
    var message={
        nickname:document.getElementById('nickname').value,
        text:document.getElementById('text').value
    };

    document.getElementById('nickname').style.display='none';
    socket.emit('add-message',message);
    return false;
}