
var forgottenPassView = (function(){
	"use strict";

	var settings = {},
		_pageTransitions = null,
		_id = 'forgottenPassView',
		_ajaxTimeout = null,
		_ajaxTemplate = null,
		//_iosScrollView = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.submitButtonClicked = new Event(_id);

	settings.start = function(){
		
		$('#forgotten-password').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#forgotten-password').on('click','.submit',function(){
			$('#forgotten-password input').removeClass('invalid');
			settings.submitButtonClicked.notify({email:$('#forgotten-password .input-email')});
		});

		_pageTransitions =  new PageTransitions({
			el:'#forgotten-password',
			transition:'left'
		});
		//_iosScrollView = new IScroll('#forgotten-password .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		_ajaxTemplate = _.template($('.ajax-loader-template').html());
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#forgotten-password, .trans-overlay').addClass('active');
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
			$('#forgotten-password').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
		settings.hideLoader(true);
        $('#forgotten-password').append(_ajaxTemplate());
	};

	settings.hideLoader = function(onlyLoader){
		if(!onlyLoader)
            $('.disable-overlay').removeClass('show');
        $('#forgotten-password .ajax-loader').remove();
	};

	settings.clearDetails = function(){
		$('#forgotten-password input').val('');
	};

	return settings;
}());

var forgottenPassController = (function(){
	"use strict";

	var settings = {},
		_inView = false,
		_canSubmit = true,
		_view = forgottenPassView;
	
	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("forgottenpassword:show",function(args){
		settings.show(false,args);
	});
	globalEvent.attach("forgottenpassword:hide",function(args){
		settings.hide(false,args);
	});

	_view.backButtonClicked.attach(function(sender, args){
		// check permissions and show account / login
		settings.hide(false, {dir:'left'});
		globalEvent.notify('login:show',{dir:'right'});
	});
	_view.submitButtonClicked.attach(function(sender, args){
		// submit forgotten pass.
		_forgotPassSubmit(args);
	});

	function _forgotPassSubmit(args){
		_canSubmit = true;
		if(args.email.val() === ''){ args.email.addClass('invalid'); _canSubmit = false;};
		if(!_canSubmit){ debug&&console.log('invalid cannot Submit'); return false; };

		_view.showLoader();

		var data = { "email": args.email.val() };


		handlerController.forgotpassword(data,function(e){
			// success
			debug&&console.log('ajax success - forgotten password');
			debug&&console.log(e);

			Popup.createConfirmPopup('Successful','Please check your email / spam folder for an email regarding the change of your password',null,'Okay');

			settings.hide(false, {dir:'left'});
			globalEvent.notify('login:show',{dir:'right'});

			_view.hideLoader();
			return true;

		},
		function(e){
			// fail
			debug&&console.error('Failed to get forgotpass: ' + e);
			_view.hideLoader();
			
			Popup.createConfirmPopup('Unsuccessful','Please check your internet connection.',null,'Okay');
			
			return false;
		});
	};

	function _backButton(e){
		e.preventDefault();
		settings.hide(false, {dir:'left'});
		globalEvent.notify('login:show',{dir:'right'});
	};

	function _addBackEvents(){
		document.addEventListener("backbutton",_backButton, false);
	};
	function _removeBackEvents(){
		document.removeEventListener("backbutton",_backButton,false);
	};

	settings.start = function(){
		_view.start();
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
		//globalEvent.notify('history:add',{id:'forgottenpassword:show',dir:'left'});
		_view.show(function(){
			_addBackEvents();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());