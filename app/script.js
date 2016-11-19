
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
            var userid=$('#userid').attr('data-attr-id');
        	if(userid==null){
        	    $('#userid').attr('data-attr-id',my_id);
        	}
            //data is a full list of all the users in chat as at current
            //foreach user in data we'll add a user to the  users classed
            //unordered list.

            //first we parse the data
            $.each(data,function(key,val){
                var id=val.id,
                    username=val.user_name;

                //the next step appends this user to the list view
                $('.users').append('<li class="tab" id="'.id.'" onclick=selectid('.id.')><a href="#user'.+id.'" class="active"><div>'.username.'</div></a></li>');
                $('#chat-sections').append('<div id="user'.+id.'">
                    <ul id="messages">

                    </ul>
                </div>');
            });

    	});

        //for the appliction to truly send messages to a different user the
        //connection needs to be assigned an id on connecting. and the id
        //stored in an html element prefarably id tags.

        $('.save').click(function(){


            if($('#selected_id').attr('sendto')==$('#userid').attr('data-attr-id')){
    	    	alert("You can't send message to yourself.");
    	    }else{

    		    var data_server={
    		    	id:$('#selected_id').attr('sendto'),
                    senderid:$('#userid').attr('data-attr-id'),
    		    	msg:$('#m').val(),
                    //the name is supposed to send the current user's name
    		    	name:user_name,
    		    };

                socket.emit('chat message',data_server );
                $('#m').val('');
                $('#messages'+$('#userid')).append($('<li>').text(msg));
                notifyMe(msg);
                return false;



    	    }
        });

        //recieving a message
        //when a message is gotten it has to be appended to the correct
        //message box belonging to the id of the user who sent it.
        socket.on('get msg',function(data){
    		var message=data.msg,
                id=data.id,
                name=data.name,
                sentfrom=data.senderid;

                //updatig the right message box
                $('#user'+sentfrom).append('')


    	});


        //on clicking a user the select id atrribute has to be set to the user's id
        var selectid=function(id){
        	$('#selected_id').attr('sendto',id);
        }

        $('ul.tabs').tabs();
    });


/*
|-------------------------------------------------------------
| Note: the user sends a message by first clicking the user
|       they'd like to message and then send their message
|       the user been clicked upon is sent stored in the
|       #selected_id element
|-------------------------------------------------------------
*/
