var myWinesModel = (function(){
	"use strict";
	var settings = {},
		_id = 'myWinesModel',
		_wines = [];

	settings.winesAdded = new Event(_id);
	settings.winesRemoved = new Event(_id);

	settings.addWines = function(wines){
		_wines = wines;
		settings.winesAdded.notify({wines:$.extend(true,[],_wines)});
	};

	settings.removeWines = function(){
		//remove wines;
		_wines.length = 0;
		settings.winesRemoved.notify();
	};

	settings.getWines = function(){
		return $.extend(true,[],_wines);
	};
	settings.getWine = function(currindex,amount){

		if(typeof(currindex)==='object' && !$.isEmptyObject(currindex)){
			if(typeof(currindex.sIndex)==='undefined'){
				return _wines[currindex.id][currindex.cat];
			}else{
				return {content:_wines[currindex.id][currindex.cat],sIndex:(currindex.sIndex || 0)};
			}
		}
		if(typeof(currindex)!=='number' || currindex < 0){
			debug&&console.log('index invalid');
			return false;
		};

		if(amount <= 0){
			return { curr:_wines[currindex]};
		};

		var _prevIndex = (currindex - 1) < 0 ? 11 : (currindex - 1);
		return {curr:_wines[currindex], prev:_wines[_prevIndex]};
		
	};

	return settings;
}());

var myWinesView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'myWinesView',
		_template = null,
		_carousels = {},
		//_iosScrollView = null,
		_ajaxTimeout = null,
		_timeout = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.previousWineButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);

	settings.start = function(){
		
		$('#mywines').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#mywines').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#mywines').on('click','.previous-container .previous-button',function(){
			settings.previousWineButtonClicked.notify();
		});
		$('#mywines').on('click','.bar-item, .wine-item, .previous-container .previous-item',function(){
			settings.selectionClicked.notify({id:$(this).attr('data-id'), cat:$(this).attr('data-cat')});
		});

		_pageTransitions =  new PageTransitions({
			el:'#mywines',
			transition:'left'
		});
		_template = _.template($('.mywines-main-template').html());
		//_iosScrollView = new IScroll('#mywines .wrapper-scroller',{probeType:3, hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	settings.populateTemplate = function(templateData){
		//populate template
		settings.removeTemplate();
		$('#mywines .scroller').append(_template(templateData));

		_carousels["center"] = new centerCarousel("#mywines .wine-container",{
			onCarouselTap:function(e){
			},
			onCarouselChange:function(e,pc){
				$('#mywines .bar .content .bar-list .bar-item').eq(e).addClass('active').siblings().removeClass('active');
				
				$('#mywines .bar .content .bar-list').height($('#mywines .bar .content .bar-list .bar-item').eq(e).outerHeight()).css({
					'-webkit-transform':'translate3d('+(-((100/pc)*e))+'%,0,0)',
					'transform':'translate3d('+(-((100/pc)*e))+'%,0,0)'
				});

				$('.generic-button a').attr('href',$('#mywines .wine-item').eq(e).attr('data-product-link'));
			}
		});

		_carousels["center"].next();

		//_iosScrollView.refresh();

		$('#mywines .image-load').waitForImages({
		    each: function() {
		       $(this).addClass('active');
		    },
   		 waitForAll: true
		});
	};

	settings.removeTemplate = function(){
		$('#mywines .content-wrapper').remove();
	};

	settings.togglePreviousWines = function(){
		clearTimeout(_timeout);
		var _prevList = $('#mywines .previous-container .previous-list'),
			_prevButton = $('#mywines .previous-container .previous-button');

		_prevList.toggleClass('active');
		_prevButton.toggleClass('active');

		var _height = _prevList.hasClass('active') ? (_prevList.get(0).scrollHeight+$('#mywines .generic-button-container').outerHeight()) : 0;
		_prevList.height(_height);

		//if(!_iosScrollView)return true;
		//_iosScrollView.scrollTo(0,0,300, IScroll.utils.ease.quadratic);
		//transitionEnd(_prevList,function(){
		//		_iosScrollView.refresh();
		//});
		
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#mywines, .trans-overlay').addClass('active');
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
			$('#mywines').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	return settings;
}());

var myWinesController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = myWinesModel,
		_view = myWinesView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("mywines:show",function(args){

		Queueing.get('mywines').addTo(function(){
			settings.show(function(){
				Queueing.get("mywines").setActive(false).trigger();
			},args);
		});

		_view.showLoader();

		globalEvent.notify("permission:populatemywines",{
			callback:function(e){
				if(!e.value){
					Queueing.get('mywines').addTo(function(){
						_view.hideLoader();
						globalEvent.notify('home:show');
						settings.hide(function(){
							Queueing.get("mywines").setActive(false).removeAll();
						},{dir:'left'});
					});
				};

	
				if(e.complimentary){
					_populateWines(e);
					return true;
				};
				
				// get this months quizz and previous ones since they are a 12 month member
				_populateWines(e);
			}
		});
	});

	globalEvent.attach('mywines:hide',function(args){
		settings.hide(false,args);
	});

	_model.winesAdded.attach(function(sender, args){
		// quizzes added.
		debug&&console.log('wines added');
	});

	_model.winesRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('wines removed');
		_view.removeTemplate();
		if(!_inView)return true;
		_goToHome();*/
	});

	_view.backButtonClicked.attach(function(sender, args){
		_goToHome();
	});

	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});

	_view.previousWineButtonClicked.attach(function(sender, args){
		globalEvent.notify("permission:canShowPreviousItems",{
			callback:function(e){
				if(!e.value){
					globalEvent.notify("messages:nonmember");
					return false;
				};
				_view.togglePreviousWines();
			}
		});
	});

	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify("mywineslist:show",args);
		settings.hide(false,{dir:'right'});
	});


	settings.start = function(){
		_view.start();
		Queueing.set('mywines');
	};

	function _populateWines(e){
		var _data = _model.getWine(e.current, e.amount); 
		debug&&console.log(_data);
		_view.populateTemplate(_data);
		_view.hideLoader();
	};

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	function _backButton(e){
		e.preventDefault();
		_goToHome();
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
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		
		//globalEvent.notify('history:add',{id:'mywines:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());

/* wines list */

var myWinesListView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'myWinesListView',
		_template = null,
		//_iosScrollView = null,
		_ajaxTimeout = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);

	settings.start = function(){
		
		$('#mywines-list').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#mywines-list').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#mywines-list').on('click','.list-item',function(){
			settings.selectionClicked.notify({id:$(this).attr('data-id'), cat:$(this).attr('data-cat'), sIndex:$(this).attr('data-section')});
		});


		_pageTransitions =  new PageTransitions({
			el:'#mywines-list',
			transition:'left'
		});
		_template = _.template($('.mywines-list-template').html());
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	settings.populateTemplate = function(templateData){
		//populate template
		settings.removeTemplate();
		$('#mywines-list').append(_template(templateData));
		
		//if(_iosScrollView){
		//_iosScrollView.destroy();
		//_iosScrollView = null;
		//};
		//_iosScrollView = new IScroll('#mywines-list .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		
		$('#mywines-list .image-load').waitForImages({
		    each: function() {
		       $(this).addClass('active');
		    },
   		 waitForAll: true
		});
	};

	settings.removeTemplate = function(){
		$('#mywines-list > *').remove();
	};


	settings.show = function(callback,args){
		_inView = true;
		$('#mywines-list, .trans-overlay').addClass('active');
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
			$('#mywines-list').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};


	return settings;
}());


var myWinesListController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = myWinesModel,
		_cachedIDS = {},
		_view = myWinesListView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("mywineslist:show",function(args){

		Queueing.get('mywineslist').addTo(function(){
			settings.show(function(){
				Queueing.get("mywineslist").setActive(false).trigger();
			},args);
		});

		_cachedIDS["id"] = typeof(args.id)!=='undefined' ? args.id : _cachedIDS["id"];
		_cachedIDS["cat"] = typeof(args.cat)!=='undefined' ? args.cat : _cachedIDS["cat"];

		_view.populateTemplate(_model.getWine(_cachedIDS));
		
	});
	globalEvent.attach('mywineslist:hide',function(args){
		settings.hide(false,args);
	});


	_model.winesRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('wines removed');
		_view.removeTemplate();
		if(!_inView)return true;
		_goToHome();*/
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("mywines:show",{dir:'right'});
		settings.hide();
	});

	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});
	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify("mywinesdesc:show",args);
		settings.hide(false,{dir:'right'});
	});


	settings.start = function(){
		_view.start();
		Queueing.set('mywineslist');
	};

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("mywines:show",{dir:'right'});
		settings.hide();
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
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		
		//globalEvent.notify('history:add',{id:'mywineslist:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}()); 

/* wines desc */

var myWinesDescView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'myWinesDescView',
		_carousels = {},
		_template = null,
		//_iosScrollView = {},
		_ajaxTimeout = null,
		_parallaxImageScroll = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.iconClicked = new Event(_id);


	settings.start = function(){
		
		$('#mywines-desc').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#mywines-desc').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#mywines-desc').on('click','.icon-item',function(){
			settings.iconClicked.notify();
			if(_carousels["center"]){
				_carousels["center"].slidePane($(this).index());
			};
			if(_carousels["left"]){
				_carousels["left"].slidePane($(this).index());
			}
		});

		_pageTransitions =  new PageTransitions({
			el:'#mywines-desc',
			transition:'left'
		});
		_template = _.template($('.mywines-desc-template').html());
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	settings.populateTemplate = function(templateData){
		//populate template

		debug&&console.log(templateData);

		settings.removeTemplate();
		$('#mywines-desc').append(_template(templateData));
		

		_carousels["center"] = new centerCarousel("#mywines-desc .icon-container",{
			noDrag:true,
			onCarouselTap:function(e){
			},
			onCarouselChange:function(e){
				$('#mywines-desc .content > .icon-container .icon-list .icon-item').eq(e).addClass('active').siblings().removeClass('active');
				if(_carousels["left"])_carousels["left"].slidePane(e,true);
			}
		});

		_carousels["left"] = new centerCarousel("#mywines-desc .desc-container",{
			noDrag:true,
			onCarouselTap:function(e){
			},
			onCarouselChange:function(e){
				if(_carousels["center"])_carousels["center"].slidePane(e);
			}
		});

		/*if(_iosScrollView){
		_iosScrollView.destroy();
		_iosScrollView = null;
		};
		_iosScrollView = new IScroll('#mywines-desc .wrapper-scroller',{probeType:3, hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true});
		
		_createNewImageParallax();*/

		if(typeof(templateData.sIndex) !=='undefined'){
			_carousels["center"].movePane(templateData.sIndex,true);
			_carousels["left"].movePane(templateData.sIndex);
		};

		//if(!$.isEmptyObject(_iosScrollView)){
		//	for(var key in _iosScrollView){
		//		_iosScrollView[key].destroy();
		///		_iosScrollView[key] = null;
		//		_iosScrollView[key] = new IScroll('#'+key,{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		//	};
		//}else{
		//	$('#mywines-desc .desc-item').each(function(){
		//		_iosScrollView["desc-item-"+$(this).index()] = new IScroll('#'+$(this).attr('id'),{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
			//});
		//}

		$('#mywines-desc .image-load').waitForImages({
		    each: function() {
		       $(this).addClass('active');
		    },
   		 waitForAll: true
		});
	};

	function _createNewImageParallax(){
		return false;
		/*if(ParallaxImageScroll){ 

			_parallaxImageScroll = new ParallaxImageScroll({
				image:'#mywines-desc .paraScroll',
				scrollView:'#mywines-desc .scroller',
				iosScroll:_iosScrollView
			});
			return true;
		}else{
			debug&&console.error('There is no function of "ParallaxImageScroll" in the document');
			return false;
		};*/
	};

	settings.removeTemplate = function(){
		$('#mywines-desc > *').remove();
	};


	settings.show = function(callback,args){
		_inView = true;
		$('#mywines-desc, .trans-overlay').addClass('active');
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
			$('#mywines-desc').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};


	return settings;
}());


var myWinesDescController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = myWinesModel,
		_cachedIDS = {},
		_view = myWinesDescView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("mywinesdesc:show",function(args){

		Queueing.get('mywinesdesc').addTo(function(){
			settings.show(function(){
				Queueing.get("mywinesdesc").setActive(false).trigger();
			},args);
		});

		_cachedIDS["id"] = typeof(args.id)!=='undefined' ? args.id : _cachedIDS["id"];
		_cachedIDS["cat"] = typeof(args.cat)!=='undefined' ? args.cat : _cachedIDS["cat"];
		_cachedIDS["sIndex"] = typeof(args.sIndex)!=='undefined' ? args.sIndex : _cachedIDS["sIndex"];

		_view.populateTemplate(_model.getWine(_cachedIDS));
		
	});

	globalEvent.attach('mywinesdesc:hide',function(args){
		settings.hide(false,args);
	});


	_model.winesRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('wines removed');
		_view.removeTemplate();
		if(!_inView)return true;
		_goToHome();*/
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("mywineslist:show",{dir:'right'});
		settings.hide();
	});

	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});
	


	settings.start = function(){
		_view.start();
		Queueing.set('mywinesdesc');
	};

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("mywineslist:show",{dir:'right'});
		settings.hide();	
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
			_view.removeTemplate();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		//globalEvent.notify('history:add',{id:'mywinesdesc:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}()); 