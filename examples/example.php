<?php
/**
 * Copyright 2011 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

require '../src/facebook.php';

// Create our Application instance (replace this with your appId and secret).
$facebook = new Facebook(array(
  'appId'  => '713025492055428',
  'secret' => '389b6ffa31e057dcb2d5609f1fab13d5',
  'cookie' =>  true
));

// Get User ID
$user = $facebook->getUser();

// We may or may not have this data based on whether the user is logged in.
//
// If we have a $user id here, it means we know the user is logged into
// Facebook, but we don't know if the access token is valid. An access
// token is invalid if the user logged out of Facebook.

// if ($user) {
  try {
    // Proceed knowing you have a logged in user who's authenticated.
    $ret = $facebook->api('/me', 'GET');
	$access_token = $facebook->getAccessToken();
	// var_dump($user_profile);
  } catch (FacebookApiException $e) {
    // error_log($e);
	echo "<pre>";
	var_dump($e);
	echo "</pre>";
    $user = null;
  }
  var_dump($access_token);
// }
   // $user_profile = $facebook->api('/me');
   // var_dump( $user_profile );
// Login or logout url will be needed depending on current user state.
if ($user) {
  $logoutUrl = $facebook->getLogoutUrl();
} else {
  $statusUrl = $facebook->getLoginStatusUrl();
  $loginUrl = $facebook->getLoginUrl();
}

?>
<!doctype html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
  <head>
    <title>php-sdk</title>
    <style>
      body {
        font-family: 'Lucida Grande', Verdana, Arial, sans-serif;
      }
      h1 a {
        text-decoration: none;
        color: #3b5998;
      }
      h1 a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
	<a href="<?php echo  $loginUrl ;?>" target="_blank">請登入</a>
  </body>
</html>
