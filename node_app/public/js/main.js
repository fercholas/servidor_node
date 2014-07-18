$(document).ready(function(){

   window.io = io.connect();

   io.on("connect", function(socket){

 		console.log("Conectado al cliente");
 		io.emit('hola?');

   });
   
   io.on('saludo',function  (data){  	    
   	    
   });
   
   io.on('log-in',function  (data){  	    
   	   
   	     $('#users').append('<li>' + data.username + '<li>');
   });
   
   io.on('log-out',function  (data){  	    
   	    
   	   $('#users li').each(function (i, item) {
		      if(item.innerText === data.username){
				  $(item).remove();
		      }
		   }); 	    
   }); 

   io.on('post',function(data){ // Cuando por socket recibimos los post en tiempo real

       
       $('#post').append('<p>' + data.user.username + data.content + '</p>'); 

   }); 
});