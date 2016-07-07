/* ---- POPUP ---- 
* E.g of a native confirm box:
*navigator.notification.confirm('yoo yoo yoo',function(buttonIndex){console.log(buttonIndex);},'Gameover',['exit','okay']);
* see http://docs.phonegap.com/en/1.0.0/phonegap_notification_notification.md.html
*/

var Popup = (function(){
	var settings = {};

	settings.start = function(){

	};

	settings.createPopUp = function(title,text,yesCB,noCB){
		navigator.notification.confirm(text,function(buttonIndex){
			if(buttonIndex===1){
				if(typeof(yesCB)==='function')yesCB();
			}else{
				if(typeof(noCB)==='function')noCB();
			}
		},title,['Yes','No']);
	};

	settings.createConfirmPopup = function(title,text,callback,buttonName){
		if(typeof(buttonName)==='undefined' || typeof(buttonName)!=='string'){
			buttonName = "Okay";
		};

		navigator.notification.confirm(text,function(){
			if(typeof(callback)==='function')callback();
		},title,[buttonName]);
	};

	settings.createButtonPopup = function(title, text, callback, buttonnames){
		navigator.notification.confirm(
		text,  // message
		function(e){
			if(typeof(callback)==='function'){
				callback(e);
			}
		},                  // callback to invoke
		title,            // title
		buttonnames,             // buttonLabels
		''                 // defaultText
		);
	};

	return settings;
}());