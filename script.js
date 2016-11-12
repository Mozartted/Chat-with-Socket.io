
    $(document).ready(function(){
        function notifyMe(message) {
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                alert("This browser does not support notifications");
            }

            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification(message);
            }

            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {

                    // We store the authorization information
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        var notification = new Notification(message);
                    }
                });
            }


        }

        var socket = io();
        //here the user is prompted for his username and then the said username
        //sent to the server to store the username.
        var user_name=window.prompt('Enter Your Name');
        socket.emit('user name',user_name);

        //this section collects the userid from the server
        //and uses it to set a property on the dom
        socket.on('user entrance',function(data,my_id){
        	//checking the user id
            //accessing it via jquery
            var userid=$('#userid').text();
        	if(userid==null){
        	    $('#userid').attr('data-attr-id',my_id);
        	}
            $('#userid').text()=data;
    	});

        //for the appliction to truly send messages to a different user the
        //connection needs to be assigned an id on connecting. and the id
        //stored in an html element prefarably id tags.

        $('.save').click(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });

        //recieving a message
        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
            notifyMe(msg);
        });
    });
