<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>愛買FB APP</title>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
<?php echo rand(); ?>
<div id="fb-root"></div>
<script type="text/javascript" src="https://connect.facebook.net/zh_TW/all.js"></script>
</body>
<script>
	$(function() {   
		alert('d');
		FB.init({
			appId: 	'713025492055428',
			status: true, 
			cookie: true, 
			xfbml: true, 
			oauth: true
		});
	});
</script>
</html>