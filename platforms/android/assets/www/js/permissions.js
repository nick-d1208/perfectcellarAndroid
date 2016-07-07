var permissionModel = (function(){
	"use strict";
	var settings = {};
	return settings;
}());

var permissionController = (function(){
	"use strict";
	var settings = {},
		_userModel = userModel,
		_iniReceived = false,
		_networkingModel = networkingModel,
		_model = permissionModel;

	globalEvent.attach('ini:recieved',function(){
		_iniReceived = true;
	});
	globalEvent.attach('ini:notrecieved',function(){
		_iniReceived = false;
	});

	globalEvent.attach("permission:populatequizzes",function(args){
		if(typeof(args)!=='undefined'&&typeof(args.callback)==='function'){
			args.callback(_canPopulateQuizzes());
		};
	});

	globalEvent.attach("permission:populatelessons",function(args){
		if(typeof(args)!=='undefined'&&typeof(args.callback)==='function'){
			args.callback(_canPopulateLessons());
		};
	});

	globalEvent.attach("permission:populatemywines",function(args){
		if(typeof(args)!=='undefined'&&typeof(args.callback)==='function'){
			args.callback(_canPopulateMyWines());
		};
	});

	globalEvent.attach("permission:canShowMyWines",function(args){
		if(typeof(args)!=='undefined'&&typeof(args.callback)==='function'){
			args.callback(_canShowMyWines());
		};
	});


	globalEvent.attach("permission:canlogin",function(args){
		if(typeof(args)!=='undefined'&&typeof(args.callback)==='function'){
			args.callback(_canLogin());
		};
	});

	globalEvent.attach("permission:canShowPreviousItems",function(args){
		if(typeof(args)!=='undefined'&&typeof(args.callback)==='function'){
			args.callback(_canShowPreviousItems());
		};
	});

	function _canShowPreviousItems(){
		var _user = _userModel.getUser();
		if(!_user){
			return {value:false, message:'nonmember'};
		}
		return {value:true};
	};

	function _canShowMyWines(){
		var _networkStatus = _networkingModel.getNetworkStatus();
		if(!_networkStatus && !_iniReceived){
			return {value:false};
		};
		return {value:true};
	};

	function _canPopulateQuizzes(){
		// check if user is logged in -- show quizzes based on how much their membership allows
		// check if user is not logged in -- show only complimentary quizz
		var _user = _userModel.getUser();
		if(!_user){
			return {value:true, complimentary:true, amount:12, allowed:0};
		};

		// debug
		return { value:true, complimentary:false, amount:12, allowed:_user.chargedAt, current:new Date().getMonth()}; // set teh value to true, and amount to 12 -- Max amount.
	};

	function _canPopulateLessons(){
		// check if user is logged in -- show quizzes based on how much their membership allows
		// check if user is not logged in -- show only complimentary quizz
		var _user = _userModel.getUser();
		if(!_user){
			return {value:true, complimentary:true, amount:12, allowed:0};
		};

		// debug
		return { value:true, complimentary:false, amount:12, allowed:_user.chargedAt, current:new Date().getMonth()}; // set teh value to true, and amount to 12 -- Max amount.
	};

	
	function _canPopulateMyWines(){
		// check if user is logged in -- show quizzes based on how much their membership allows
		// check if user is not logged in -- show only complimentary quizz
		var _user = _userModel.getUser();
		if(!_user){
			return {value:true, complimentary:true, amount:0, allowed:0, current:new Date().getMonth()};
		};

		return { value:true, complimentary:false, amount:2, allowed:_user.chargedAt, current:new Date().getMonth()}; // set teh value to true, and amount to 12 -- Max amount.
	};

	return settings;
}());