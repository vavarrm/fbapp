<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>愛買FB APP</title>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
<?php 
	echo "<pre>";
	var_dump($_SERVER); 
	echo "</pre>";
?>
<div id="fb-root"></div>
<script type="text/javascript" src="https://connect.facebook.net/zh_TW/all.js"></script>
</body>
<script>
	alert( document.location);
	// $(function() {   
		// alert('d');
		// FB.init({
			// appId: 	'713025492055428',
			// status: true, 
			// cookie: true, 
			// xfbml: true, 
			// oauth: true
		// });
		// function AuthorizeOn(){
			// var authResponse ; 
			// FB.getLoginStatus(function(res){
				// var authResponse = res.authResponse;
				// console.log(authResponse);
				// var accessToken = authResponse.accessToken; 
				// var postMSG = "大胖腦袋有問題 請點http://www.yahoo.com.tw";  
				// var filename = 'http://vavarrm.twgogo.org:8080/fbapp/images1.jpg'; 
				// var url="https://graph.facebook.com/me/photos?access_token="+accessToken+"&message="+postMSG;
				// FB.api('/me/photos', 'post', {
					// message:postMSG,
					// url:filename        
					// }, function(response){
						// if (!response || response.error)
						// {
						   // alert(response.error);
						   // console.log(response);
						   // alert(response);
						// }
						// else
						// {  
						   // alert('Post ID: ' + response.id);
						// }
					// }
				// );
			// })

			// console.log('d');
		// }			
		// function AuthorizeOff(){
				// alert('a');
		// }
		// $('#startGame').bind('click', function(e){
			// e.preventDefault(); 
		// })
		// AuthorizeOn();
		// alert('dsss');
	// });
</script>
</html>