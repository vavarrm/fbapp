<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>愛買FB APP</title>
</head>
<body>
<?php
	require 'src/facebook.php';


	$facebook = new Facebook(array(
	  'appId'  => '713025492055428',
	  'secret' => '389b6ffa31e057dcb2d5609f1fab13d5',
	  'cookie' =>  true,
	  'allowSignedRequest'	=>true
	));

	// get user UID
	$fb_user_id = $facebook->getUser();

		// get the url where to redirect the user
	$location = "". $facebook->getLoginUrl(array('scope' => 'email,publish_stream,read_stream,user_likes'));
	
	// check if we have valid user
	if ($fb_user_id) {
		try {
			// $facebook->setFileUploadSupport(true);
			$img = 'http://vavarrm.twgogo.org:8080/fbapp/images1.jpg';
			$access_token = $facebook->getAccessToken();
			$photo = $facebook->api(
				'/100000054910732/photos/', 
				'post',
					array(
						'url' 			=> 	$img,
						'message' 			=> 'Photo uploaded via the PHP SDK!',
						'access_token'		=> $access_token
					)
			);
			
			echo $access_token;
			 // $facebook->api('/100000054910732/photos/', 'post' , array(''));
			echo "已登入已授權";
		} catch (FacebookApiException $e) {
			$fb_user_id = NULL;
			// seems we don't have enough permissions
			// we use javascript to redirect user instead of header() due to Facebook bug
			echo "<pre>";
			var_dump($e);
			echo "</pre>";
			echo '<a href="'.$location.'"</a>';
			echo "已登入未授權";
			// kill the code so nothing else will happen before user gives us permissions
			die();
		}

	} else {
		// seems our user hasn't logged in, redirect him to a FB login page
		$url =  $facebook->getLoginUrl();
		echo "<a href=".$url.">未登入</a>";
		// kill the code so nothing else will happen before user gives us permissions
		die();
	}

	// at this point we have an logged in user who has given permissions to our APP
	// basic user info can be fetched easily
?>
</body>
</html>