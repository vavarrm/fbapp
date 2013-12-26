var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-37300281-33']);
  _gaq.push(['_trackPageview']);

  (function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

var fbData = {
    appID: '229105757250352',
    scope: 'email,user_about_me,user_likes,user_photos,publish_stream',
    domains: 'http://iphoto.ipeen.com.tw/',
	folder: 'photo/action/2013/scottishleader/',
	fansId: '178333338939',
	albumId:'',
	albumNm: '對味飯友揪出來'
}

var gameInfo = {
	uid:'', nick:'', thum:'', email:'', fuid:'', share:0
}
var gameFood = new Array("", "鐵板火焰牛肉", "澎湖冰卷", "宮保雞丁", "鈔鋿魚頭", "炸蚵酥");

//uid:'100002647847881', nick:'洪青婷', thum:'http://profile.ak.fbcdn.net/hprofile-ak-ash4/195317_100002647847881_1932941281_t.jpg', email:'yaffil.fb@gmail.com', fuid:'100004982703621', fnick:'李琥珀', fthum:'http://profile.ak.fbcdn.net/hprofile-ak-frc1/372683_100004982703621_1739953057_t.jpg', steps:0, share:1
if (document.domain == "localhost") {
    fbData.appID = "413080725425123";
    fbData.domains = "http://aiseso.com/scottishleader/";
}

$(function () {

    fbinit(true);
	
	$("#aBTN").bind("click", function () {
		_gaq.push(['_trackEvent', 'Button', 'Click', 'FB授權']);
        FB.login(function (response) {
            if (response.authResponse) {
                gameInfo.uid = response.authResponse.userID;
                gameInfo.accessToken = response.authResponse.accessToken; 			
                fansHandle();
            } else {//失敗
                alert("快回來！別輕易放棄賺$3,000元呷飯金機會～。");				
            }
        }, { scope: fbData.scope });
		return false;
    });
	
	$("#bBTN").click(function(){	//選擇朋友
		_gaq.push(['_trackEvent', 'Button', 'Click', '自行選擇朋友']);
		friendHandle();
		return false;
	});
	
	$("#cBTN").click(function(){	//分享揪團
		_gaq.push(['_trackEvent', 'Button', 'Click', '分享揪團']);
		$.post("ajax_merge.php", { uidX: gameInfo.fuid, shareX: gameInfo.share, accessToken: FB.getAccessToken() }, function(data){
			if(data.aRET < 0){
				alert(data.aMSG);
			}else{
				publishHandle(data.aIMG);
			}
		}, "json");		
		return false;
	});
});

var fbinit = function (bo) {    
    FB.init({
        appId: fbData.appID, // App ID
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true,  // parse XFBML
        oauth: true
    });
    //FB.getLoginStatus(handleLoginStatus);
}

var handleLoginStatus = function (response) {
    
    if (response.status === 'connected') {        
		gameInfo.uid = response.authResponse.userID;
        gameInfo.accessToken = response.authResponse.accessToken;
        fansHandle();

    } else if (response.status === 'not_authorized') {
        //登入未授權
        //showFbLoginPop();
    } else {
        // the user isn't logged in to Facebook.
        //showFbLoginPop();
    }
}

/*FB LOGIN*/
var showFbLoginPop = function () {
	//overlayHandle(0);
    $("#aBTN").bind("click", function () {
        FB.login(function (response) {
            if (response.authResponse) {
                gameInfo.uid = response.authResponse.userID;
                gameInfo.accessToken = response.authResponse.accessToken;    
				//overlayHandle();
				//setTimeout(function(){ friendHandle(); }, 2000);
                fansHandle();
            } else {//失敗
                alert("快回來！別輕易放棄賺$3,000元呷飯金機會～。");
				//setTimeout("location.replace('index.html');", 300);
            }
        }, { scope: fbData.scope });
		return false;
    });
}

var fansHandle = function () {
	var fansFQL = 'SELECT uid FROM page_fan WHERE page_id ='+ fbData.fansId +' AND uid=me()';
	FB.api({ method: 'fql.query', query: fansFQL
	}, function (response) {
		if (response.length != 0 && response.length != undefined) {
			//alert(fansFQL + "  --  response -- " + response.length);		
			userHandle();
		} else {			
			alert("請先加入粉絲團!!");
			FB.Event.subscribe('edge.create', function (response) {		
				_gaq.push(['_trackEvent', 'Button', 'Click', '加入粉絲團']);
				userHandle();
			});
			
		}
	});
}

var userHandle = function () {  //取得登入者暱稱與圖示
    FB.api({ method: 'fql.query', query: 'SELECT name, email FROM user WHERE uid = me()' }, function (response) {
        gameInfo.nick = response[0].name;
        gameInfo.thum = "http://graph.facebook.com/"+ gameInfo.uid +"/picture?width=90&height=115";
        gameInfo.email = response[0].email;
		gameInfo.share = useceil(1,5);
        //alert("nick:" + fbData.nick + "; thum:" + fbData.thum);
		$("#step1").hide();
		randomHandle();
    });

}

var randomHandle = function () {	//隨機挑二佪朋友, 給一個話題
	FB.api({ method: 'fql.query', query: 'SELECT uid,name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me())' }, function (response) {
		if (response.length != 0){			
			gameInfo.fuid = "";
			var f = getRndIdx(response);
			showFbThum(1, f[0].name, f[0].uid);
			showFbThum(2, gameInfo.nick, gameInfo.uid);
			if(f.length >1 ) showFbThum(3, f[1].name, f[1].uid);
			
		}
	});
	$(".ooxxshare").attr("id", "event_share" + gameInfo.share);
	$("#step2").fadeIn(500);
}

var getRndIdx = function(a){
	//var a = new Array("a", "b", "c", "d", "e");
	function shuffle(a,b) {
	  var num = Math.random() > 0.5 ? -1:1;
	  return num;
	}
	var b = a.sort(shuffle);
	return b;
}

function useceil(min,max) {
	return Math.ceil(Math.random()*(max-min+1)+min-1);
}

var showFbThum = function(idx, nm, uid){
	$("#event_f" + idx).find(".FB_photo").empty().append($("<img/>").attr("src", "http://graph.facebook.com/"+ uid +"/picture?width=75&height=75"));
	$("#event_f" + idx).find(".FB_name").text(nm);
	gameInfo.fuid += uid + ",";
}

var friendHandle = function () {	//自己選二佪朋友
	FB.ui({ method: 'apprequests', message: '立即找出你的對味飯友，週週抽3,000元加飯金  ', max_recipients:2 }, function(response){	
		if(response){	
			gameInfo.fuid = "";
			FB.api({ method: 'fql.query', query: 'SELECT uid ,pic_small,name FROM user WHERE uid in ('+ response.to +')' }, function(data) {					
				if(data.length > 0) showFbThum(1, data[0].name, data[0].uid);		
				gameInfo.fuid += gameInfo.uid + ",";							
				if(data.length > 1) showFbThum(3, data[1].name, data[1].uid);					
			});	
		}				
	});

}

var publishHandle = function (s) {
	$.blockUI({message:'揪團發布中, 請稍候...'});
	//message: "人海茫茫，為什麼你和他/她每次湊在一起，點菜有默契，話題聊不完?!就像是"+ gameFood[gameInfo.share] +"X仕高利達如此絕配!", 
    FB.api('/me/photos', 'post', {
		 	access_token: fbData.accessToken, 					
			url: fbData.domains + fbData.folder + s
		}, function (response) {
        if (!response || response.error) {           
        } else {      
			alert("已成功分享！");
        	location.replace("index.php");  
		/*
			$.post("", {fbuid: gameInfo.uid, fbname: gameInfo.nick, fbemail: gameInfo.email}, function(data){
				if(data.retcode == 0){
					alert(data.message);
				}else{
					alert("感謝您的分享，敬請期待得獎名單公佈！");
        			location.replace("pro.html");
				}
			},"json");*/
        }
        
    });
} 

jQuery.fn.extend({
	fxSlide: function(animateSpeed){
		var _this = $(this);
		var _idx = 0;
		var _num = $('.foot_items > img', _this).length;
		var _max = _num - 1;
		var _w = $('.foot_items > img', _this).width();
		$('.foot_items', _this).css({width : (_num * _w) + "px"});
		
		$('a.back', _this).click(function () {
			_idx --;
			sliding (_idx);
			$(this).blur();
			return false;
		});
		$('a.next', _this).click(function () {
			_idx ++;
			sliding (_idx);
			$(this).blur();
			return false;
		});

		function sliding (){
			if(_idx >= _max && _max > 0) {
				$('a.next', _this).hide();
				$('a.back', _this).show();
				_idx = _max;
			} else if(_idx <= 0) {
				$('a.next', _this).show();
				$('a.back', _this).hide();
				_idx = 0;
			} else {
				$('a.next, a.back', _this).show();
			};
			$('.foot_items', _this).stop().animate( { marginLeft: - (_w * _idx) + "px" }, animateSpeed);
			$("#dBTN").attr("rel", (_idx+1));
		};
		sliding();		
	}
});
function echo(o){var s = "";for (var a in o) {if( o[a] instanceof Object ){s += a + " :" + echo( o[a] ) + '\n';}else{s += a + " = " + o[a] + '\n';}	}return s;}	
