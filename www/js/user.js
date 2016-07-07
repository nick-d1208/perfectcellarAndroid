var userModel = (function(){
	var settings = {},
		_user = {},
		_userTokenID = 'usertoken';


	settings.createUser = function(data){
		settings.removeUser();
		_user = $.extend(true,{},{token:data.hash});
		settings.storeToken(_user.token);
		globalEvent.notify("user:created",{user:$.extend(true,{},_user)});
	};

	settings.updateUser = function(data){
		_user = $.extend(true,{},_user,data,{token:settings.getToken()});
		_generateAllowedIndexs();
		globalEvent.notify("user:updated",{user:$.extend(true,{},_user)});
	};

	settings.removeUser = function(){
		settings.removeToken();
		_user = null;
		delete _user;
		globalEvent.notify("user:removed");
	};

	settings.getUser = function(){
		if($.isEmptyObject(_user)){
			return false;
		};
		return $.extend(true,{},_user);
	};

	settings.storeToken = function(token){
		localStorage.setItem(_userTokenID,token);
	};
	settings.getToken = function(){
		return localStorage.getItem(_userTokenID);
	};
	settings.removeToken = function(){
		localStorage.removeItem(_userTokenID);
	};


	function _generateAllowedIndexs(){
		if(!_user || $.isEmptyObject(_user) || typeof(_user.chargedAt)==='undefined' || !$.isArray(_user.chargedAt)){ return false; };
		for(var i = 0, len = _user.chargedAt.length; i < len; i++){
			_user.chargedAt[i] = unixToMonth(_user.chargedAt[i]);
		};
		_user.chargedAt.push(new Date().getMonth());
		_user.chargedAt = arrayToObject(_user.chargedAt);
		return true;
	};


	return settings;
}());