
var loginView = (function(){
	"use strict";

	var settings = {},
		_pageTransitions = null,
		_id = 'loginView',
		//_iosScrollView = null,
		_ajaxTimeout = null,
		_ajaxTemplate = null,
		_inView = false;


	settings.backButtonClicked = new Event(_id);
	settings.loginButtonClicked = new Event(_id);
	settings.forgotPassButtonClicked = new Event(_id);
	settings.signUpButtonClicked = new Event(_id);

	settings.start = function(){
		
		$('#login').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#login').on('click','.sign-in',function(){
			$('#login input').removeClass('invalid');
			settings.loginButtonClicked.notify({email:$('#login .input-email'),pass:$('#login .input-password')});
		});
		$('#login').on('click','.forgotten-password',function(){
			settings.forgotPassButtonClicked.notify();
		});
		$('#login').on('click','.signup',function(){
			settings.signUpButtonClicked.notify();
		});
		$('#login').on('focus','input',function(){
			$(this).removeClass('invalid');
		});

		_pageTransitions =  new PageTransitions({
			el:'#login',
			transition:'left'
		});
		//_iosScrollView = new IScroll('#login .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		_ajaxTemplate = _.template($('.ajax-loader-template').html());
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#login, .trans-overlay').addClass('active');
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.in(args,null,function(){
			$('.trans-overlay').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.hide = function(callback,args){
		_inView = false;
		args = (!$.isEmptyObject(args) && args&&typeof(args.dir)!=='undefined') ? args.dir : 'left';
		_pageTransitions.out(args,null,function(){
			$('#login').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.clearDetails = function(){
		$('#login input').val('');
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
		settings.hideLoader(true);
        $('#login').append(_ajaxTemplate());
	};

	settings.hideLoader = function(onlyLoader){
		if(!onlyLoader)
            $('.disable-overlay').removeClass('show');
        $('#login .ajax-loader').remove();
	};


	return settings;
}());

var loginController = (function(){
	"use strict";

	var settings = {},
		_inView = false,
		_canLogin = true,
		_model = userModel,
		_view = loginView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("login:show",function(args){
		settings.show(false,args);
	});
	globalEvent.attach('login:hide',function(args){
		settings.hide(false,args);
	});


	_view.backButtonClicked.attach(function(sender, args){
		// check permissions and show account / login
		settings.hide(false, {dir:'left'});
		globalEvent.notify('home:show',{dir:'right'});
	});
	_view.loginButtonClicked.attach(function(sender, args){
		//perform login.
		_login(args);
	});
	_view.forgotPassButtonClicked.attach(function(sender, args){
		//forgot pass
		settings.hide(false, {dir:'right'});
		globalEvent.notify('forgottenpassword:show',{dir:'left'});
	});
	_view.signUpButtonClicked.attach(function(sender, args){
		// sign up?!
	});

	function _login(args){
		_canLogin = true;
		if(args.email.val() === ''){ args.email.addClass('invalid'); _canLogin = false;};
		if(args.pass.val() === ''){ args.pass.addClass('invalid'); _canLogin = false };
		if(!_canLogin){ debug&&console.log('invalid cannot login'); return false; };

		_view.showLoader();

		var data = { "email": args.email.val(), "token":args.pass.val() };

		handlerController.login(data,function(e){
			//success
			debug&&console.log('ajax success, trying to log in, checking permissions');
			debug&&console.log(e);
			
			_model.createUser(e.d);

			debug&&console.log(_model.getUser());
			globalEvent.notify("user:loggedin");
			globalEvent.notify("app:updateUser");

			settings.hide(false, {dir:'left'});
			globalEvent.notify('home:show',{dir:'right'});

			_view.hideLoader();
			return true;
		},function(e){
			// fail
			debug&&console.error('Failed to login: ' + e);
			_view.hideLoader();
			
			if(e === 'n/a'){
				Popup.createConfirmPopup('Login unsuccessful','Invalid username/password',null,'Okay');
				return false;
			};

			Popup.createConfirmPopup('Login unsuccessful','Please connect to the internet to login.',null,'Okay');
			
			return false;
		});
	};



	settings.start = function(){
		_view.start();
	};

	function _backButton(e){
		e.preventDefault();
		settings.hide(false, {dir:'left'});
		globalEvent.notify('home:show',{dir:'right'});
	};

	function _addBackEvents(){
		document.addEventListener("backbutton",_backButton, false);
	};
	function _removeBackEvents(){
		document.removeEventListener("backbutton",_backButton,false);
	};

	settings.hide = function(callback,args){
		_inView = false;
		_removeBackEvents();
		_view.hide(function(){
			_view.clearDetails();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		//globalEvent.notify('history:add',{id:'login:show',dir:'left'});
		_view.show(function(){
			_addBackEvents();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());



var logOutController = (function(){
	var settings = {},
		_ajaxTemplate = null,
		_model = userModel;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("user:logout",function(args){
		_logout(args);
	});

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
		settings.hideLoader(true);
        $('body').append(_ajaxTemplate());
	};

	settings.hideLoader = function(onlyLoader){
		if(!onlyLoader)
            $('.disable-overlay').removeClass('show');
        $('body > .ajax-loader').remove();
	};

	function _logout(args){

		if(typeof(args)!=='undefined'&&args.logoutNoPopup){
			_logOutHandler();
			return true;
		}

		Popup.createPopUp('Are you sure?','Once you logout, You will not be able to see all content.',function(){
			_logOutHandler();
		},function(){
			debug&&console.log('Cool the user didnt log out!');
		});
	};

	function _logOutHandler(){

		if(!_model.getToken() || !_model.getUser()){
			_model.removeUser();
			return true;
		};

		settings.showLoader();

		handlerController.logout({hash:_model.getToken()},function(e){
			//success
			debug&&console.log(e);
			debug&&console.log('we have logged out!');

			_model.removeUser();
			globalEvent.notify("user:loggedout");
			settings.hideLoader();
			return true;
		},function(e){
			//fail
			debug&&console.error('Could not log out, error: ' + e);
			_model.removeUser();
			globalEvent.notify("user:loggedout");
			settings.hideLoader();
			return false;
		});
	};

	settings.start = function(){
		 _ajaxTemplate = _.template($('.ajax-loader-template').html());
	};

	return settings;
}());
