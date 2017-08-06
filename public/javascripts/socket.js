$(document).ready(function(){
    //establish connection
    var socket = io.connect('http://localhost:3000');

    //get DOM variables
    var chatmsg = $('#chatMessage');
    var chatwindow = $('#chatWindow');

    $('#sendMsg').click(function(){
        //emit from front to server
        emitMsg();
    });

    $(document).keypress(function(e){
       if(e.which == 13){
           emitMsg();
       }
    });

    //listen for chat events
    socket.on('chat', function(data){
        chatwindow.append("<p>" + data.msg + "</p>");
    });

    function emitMsg (){
        socket.emit('chat', {
            msg: chatmsg.val()
        });
        chatmsg.val("");
    }

});





