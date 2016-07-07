/* 
* LEGEND
* Prefix private variables and private functions with an underscore (_)
*/

/* ---- Status bar ---- */
var Statusbar = (function(){
	"use strict";

	var settings = {};

	function _initialiseStatusBar(color){
		//StatusBar.hide();
		StatusBar.show();
		StatusBar.overlaysWebView(false);
		StatusBar.styleLightContent();
	};


	// PUBLIC GETTERS
	settings.changeBackgroundColor = function(color){
		if(typeof(color)==='string') { StatusBar.backgroundColorByHexString(color); }else{ debug&&console.error('The color is not a string!'); }
	};

	settings.overlayWebView = function(bl){
		StatusBar.overlaysWebView(bl);
	};

	settings.start = function(color){
		_initialiseStatusBar(color);
		settings.changeBackgroundColor(color);
	};

	return settings;
}());