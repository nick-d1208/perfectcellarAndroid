var lessonsModel = (function(){
	"use strict";
	var settings = {},
		_id = 'lessonsModel',
		_complementaryLesson = [{
			imgs:{
				middle:'img/top image_72.jpg',
				top:'img/top image_72.jpg'
			},
			index:0,
			nCat:'Sample Lesson - How to taste',
			parts:[
				{
					icon:'img/complesson/1.png',
					img:'img/complesson/part1 72.jpg',
					index:0,
					name:'part one',
					p:[
						"Firstly, hold the glass at a 45oC angle against a white background – this will reveal the wine’s colour i.e. white and the depth of colour i.e. opaque, straw yellow or golden.",
						"As wines age they tend to change color towards more yellow and brown colors. Red wines also tend to become more translucent.",
						"And finally, swirl the wine to identify any legs that run down the side of the glass. This will demonstrate the level of alcohol in the wine, the longer the legs and slower the run down the side of the glass, the higher the alcohol."
					],
					subtitle:'',
					title:'Sight'
				},
				{
					icon:'img/complesson/2.png',
					img:'img/complesson/part2 72.jpg',
					index:1,
					name:'part two',
					p:[
						"Give the glass another swirl and hover your nose over the top and breath in through your nose to identify various aromas",
						"Aromas in wine provide a lot of information about a wine; from grape variety, whether or not the wine was oak-aged, where the wine is from and how old the wine is.",
						"There can be hundreds of different aroma compounds in a single glass, which is why people smell so many different things.",
					],
					subtitle:'',
					title:'Smell'
				},
				{
					icon:'img/complesson/3.png',
					img:'img/complesson/part3 72.jpg',
					index:2,
					name:'part three',
					p:[
						"Fruit aroma – Try to identify the types of fruit aromas, this may include citrus fruits (lemon or lime), stone fruits (peaches or apricots), red fruits (cranberry, strawberry or raspberry) and black fruits (blackcurrants or black cherry). Tip: youthful wines tend to have more vibrant fruit aromas.",
						"Secondary aromas – these aromas are the product of methods used by the winemaker such as lees stirring (yeast or dough) oak aging (cedar, toast, vanilla or coconut)",
						"Tertiary aromas – These aromas are a product of age. See if you can identify any of the following: savoury aromas (mushroom or meat), leather and/or tobacco. If not, the wine is most likely youthful. Tip: oak aromas don’t necessarily indicate a mature wine."
					],
					subtitle:'',
					title:'Aromas'
				},
				{
					icon:'img/complesson/4.png',
					img:'img/complesson/part4 72.jpg',
					index:3,
					name:'part four',
					p:[
						"Body – We’re looking to identify the weight of a wine. For example, fuller bodied wines coat the sides of your mouth, appearing more viscous. At the other end of the scale, lighter wines will feel closer to water in weight.",
						"Sweetness – The sugar content of a wine can be detected on the tip of your tongue and ranges from low or no detectable sugar as ‘dry’ to high sugar content as ‘luscious’",
						"Alcohol – Detecting alcohol can be difficult, a warming sensation on your palate will indicate high levels of alcohol. A bit more",
						"Acidity – This is detected on the sides of your tongue. The more your mouth salivates, the higher the levels of acidity in the wine.",
						"Tannin (only in red and rose wines) – Tannins create a drying sensation in your mouth and are easily detected by your gums. The drier your mouth feels the higher the levels of tannin.",
						"Flavour characteristics – Following on from flavour aromas on the nose we’re looking to identify them on the palate. Try to identify fruit, floral, herbal or oak characters.",
						"Length – The length of a wine is the amount of time the flavours linger in your mouth after you’ve swallowed the wine. The longer the linger, the longer the length."
					],
					subtitle:'',
					title:'Taste'
				},
				{
					icon:'img/complesson/5.png',
					img:'img/complesson/part5 72.jpg',
					index:4,
					name:'part five',
					p:[
						"The balance of the wine – Here we identify how the separate components behave together i.e. fruit flavours, alcohol, acidity and tannin. A good wine will demonstrate harmony, creating an easy drinking experience.",
						"The complexity of flavours – Generally speaking, better wines demonstrate more things going on in the glass. This may include an array of flavours including fruit, oak and maturation. Poorer wines lean towards being one dimensional.",
						"Length – Better wines tend to provide a lasting experience in your mouth. The longer the length, the better the wine!",
					],
					subtitle:'',
					title:'Evaluation of quality'
				},
			],
			set:"free",
			subtitle:'',
			title:'Sample Lesson - How to taste',
			videos:{
				top:'',
				bottom:''
			}
		}],
		_lessons = [];

	settings.lessonsAdded = new Event(_id);
	settings.lessonsRemoved = new Event(_id);

	settings.addLessons = function(lessons){
		_lessons = lessons;
		
		for(var i = 0, len = _lessons.length; i < len; i++){
			for(var j = 0, len2 = _lessons[i].length; j < len2; j++){
				_lessons[i][j].nCat = j === 0 ? 'Grape' : j === 1 ? 'Region' : 'How to...';
			};
		};

		settings.lessonsAdded.notify({lessons:$.extend(true,[],_lessons)});
	};

	settings.removeLessons = function(){
		//remove quizzes;
		_lessons.length = 0;
		settings.lessonsRemoved.notify();
	};

	settings.getLessons = function(){
		return $.extend(true,[],_lessons);
	};
	settings.getLesson = function(currindex){

		if(typeof(currindex)==='object' && !$.isEmptyObject(currindex)){
			if(currindex.id==='free'){
				return _complementaryLesson[0];
			};
			return _lessons[currindex.id][currindex.cat];
		}
		
		if(currindex==='free'){
			return {curr:_complementaryLesson, prev:_lessons};
		}

		return {curr:_lessons[currindex], prev:_lessons};

		return lessons;
	};

	return settings;
}());


var lessonsView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'lessonsView',
		_template = null,
		_carousels = {},
		_timeout = null,
		//_iosScrollView = null,
		_ajaxTimeout = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.previousLessonButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);
	settings.selectionMemberOnlyClicked = new Event(_id);

	settings.start = function(){
			
		$('#lessons').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});

		$('#lessons').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});

		$('#lessons').on('click','.previous-container .previous-button',function(){
			settings.previousLessonButtonClicked.notify();
		});

		$('#lessons').on('click','.bar-item, .lesson-item, .previous-item',function(){
			if($(this).hasClass('noclick')){
				settings.selectionMemberOnlyClicked.notify();
				return true;
			}
			settings.selectionClicked.notify({id:$(this).attr('data-id'), cat:$(this).attr('data-cat')});
		});


		_pageTransitions =  new PageTransitions({
			el:'#lessons',
			transition:'left'
		});
		_template = _.template($('.lesson-main-template').html());
		//_iosScrollView = new IScroll('#lessons .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
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
		$('#lessons .scroller').append(_template(templateData));

		_carousels["center"] = new centerCarousel("#lessons .lesson-container",{
			onCarouselTap:function(e){
			},
			onCarouselChange:function(e,pc){
				$('#lessons .bar .content .bar-list .bar-item').eq(e).addClass('active').siblings().removeClass('active');
				$('#lessons .bar-list').height($('#lessons .bar .content .bar-list .bar-item').eq(e).outerHeight()).css({
					'-webkit-transform':'translate3d('+(-((100/pc)*e))+'%,0,0)',
					'transform':'translate3d('+(-((100/pc)*e))+'%,0,0)'
				});
				
			}
		});

		//_iosScrollView.refresh();

		$('#lessons .image').waitForImages({
		    each: function() {
		       $(this).addClass('active');
		    },
   		 waitForAll: true
		});
	};

	settings.removeTemplate = function(){
		$('#lessons .content-wrapper').remove();
	};

	settings.togglePreviousLessons = function(){
		//$('#lessons .previous-container .previous-list').toggleClass('active');
		clearTimeout(_timeout);
		var _prevList = $('#lessons .previous-container .previous-list'),
			_prevButton = $('#lessons .previous-container .previous-button');

		_prevList.toggleClass('active');
		_prevButton.toggleClass('active');

		var _height = _prevList.hasClass('active') ? (_prevList.get(0).scrollHeight+$('#lessons .generic-button-container').outerHeight()) : 0;
		_prevList.height(_height);

		/*if(!_iosScrollView)return true;
		_iosScrollView.scrollTo(0,0,300, IScroll.utils.ease.quadratic);
		transitionEnd(_prevList,function(){
				_iosScrollView.refresh();
		});*/
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#lessons, .trans-overlay').addClass('active');
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
			$('#lessons').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};


	return settings;
}());


var lessonsController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = lessonsModel,
		_view = lessonsView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("lessons:show",function(args){

		Queueing.get('lessons').addTo(function(){
			settings.show(function(){
				Queueing.get("lessons").setActive(false).trigger();
			},args);
		});

		_view.showLoader();

		globalEvent.notify("permission:populatelessons",{
			callback:function(e){
				if(!e.value){
					Queueing.get('lessons').addTo(function(){
						_view.hideLoader();
						globalEvent.notify('home:show');
						settings.hide(function(){
							Queueing.get("lessons").setActive(false).removeAll();
						},{dir:'left'});
					});
				};

	
				if(e.complimentary){
					_populateLessons($.extend({current:'free'},e));
					return true;
				};
				
				// get this months quizz and previous ones since they are a 12 month member
				_populateLessons(e);
				
			}
		});
	});

	globalEvent.attach("lessons:hide",function(args){
		settings.hide(false,args);
	});

	_model.lessonsAdded.attach(function(sender, args){
		// quizzes added.
		debug&&console.log('lessons added');
	});

	_model.lessonsRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('lessons removed');
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

	_view.previousLessonButtonClicked.attach(function(sender, args){
		globalEvent.notify("permission:canShowPreviousItems",{
			callback:function(e){
				if(!e.value){
					globalEvent.notify("messages:nonmember");
					return false;
				};
				_view.togglePreviousLessons();
			}
		});
	});

	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify("lessonstastelist:show",args);
		settings.hide(false,{dir:'right'});
	});

	_view.selectionMemberOnlyClicked.attach(function(sender, args){
		globalEvent.notify('messages:restrictedmember');
	});

	settings.start = function(){
		_view.start();
		Queueing.set('lessons');
	};

	function _populateLessons(e){
		/*
			var _data = _model.getLesson(new Date().getMonth(), 12); // debug for now.
				_view.populateTemplate(_data);
				_view.hideLoader();
		*/
		var _data = _model.getLesson(e.current, e.amount); 
		_view.populateTemplate($.extend(true,{allowed:e.allowed},_data));
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
		//globalEvent.notify('history:add',{id:'lessons:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}());


/* Lessons taste list */

var lessonsTasteListView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'lessonsTasteListView',
		_template = null,
		///_iosScrollView = null,
		_ajaxTimeout = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.selectionClicked = new Event(_id);

	settings.start = function(){
		
		$('#lesson-how-to-taste-list').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#lesson-how-to-taste-list').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#lesson-how-to-taste-list').on('click','.list-item',function(){
			settings.selectionClicked.notify({id:$(this).attr('data-id'), cat:$(this).attr('data-cat'), sIndex:$(this).index()});
		});


		_pageTransitions =  new PageTransitions({
			el:'#lesson-how-to-taste-list',
			transition:'left'
		});
		_template = _.template($('.lesson-taste-list-template').html());
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
		$('#lesson-how-to-taste-list').append(_template(templateData));
		
		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		//}

		//_iosScrollView = new IScroll('#lesson-how-to-taste-list .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	
		$('#lesson-how-to-taste-list .image').waitForImages({
		    each: function() {
		       $(this).addClass('active');
		    },
   		 waitForAll: true
		});

	};

	settings.removeTemplate = function(){
		$('#lesson-how-to-taste-list > *').remove();
	};


	settings.show = function(callback,args){
		_inView = true;
		$('#lesson-how-to-taste-list, .trans-overlay').addClass('active');
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
			$('#lesson-how-to-taste-list').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};


	return settings;
}());


var lessonsTasteListController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = lessonsModel,
		_cachedIDS = {},
		_view = lessonsTasteListView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("lessonstastelist:show",function(args){

		Queueing.get('lessonstastelist').addTo(function(){
			settings.show(function(){
				Queueing.get("lessonstastelist").setActive(false).trigger();
			},args);
		});

		_cachedIDS["id"] = typeof(args.id)!=='undefined' ? args.id : _cachedIDS["id"];
		_cachedIDS["cat"] = typeof(args.cat)!=='undefined' ? args.cat : _cachedIDS["cat"];

		_view.populateTemplate(_model.getLesson(_cachedIDS));
		
	});

	globalEvent.attach("lessonstastelist:hide",function(args){
		settings.hide(false,args);
	});


	_model.lessonsRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('lessons removed');
		_view.removeTemplate();
		if(!_inView)return true;
		_goToHome();*/
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("lessons:show",{dir:'right'});
		settings.hide();
	});

	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});
	_view.selectionClicked.attach(function(sender, args){
		globalEvent.notify("lessonstastedesc:show",args);
		settings.hide(false,{dir:'right'});
	});


	settings.start = function(){
		_view.start();
		Queueing.set('lessonstastelist');
	};

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};


	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("lessons:show",{dir:'right'});
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
		//globalEvent.notify('history:add',{id:'lessonstastelist:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}()); 


/* Lessons taste desc */

var lessonsTasteDescView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'lessonsTasteDescView',
		_carousels = {},
		_template = null,
		//_iosScrollView = {},
		_ajaxTimeout = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.iconClicked = new Event(_id);

	settings.start = function(){
		
		$('#lesson-how-to-taste-desc').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#lesson-how-to-taste-desc').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#lesson-how-to-taste-desc').on('click','.icon-item',function(){
			settings.iconClicked.notify();
			if(_carousels["center"]){
				_carousels["center"].slidePane($(this).index());
			};
			if(_carousels["left"]){
				_carousels["left"].slidePane($(this).index());
			}
		});

		_pageTransitions =  new PageTransitions({
			el:'#lesson-how-to-taste-desc',
			transition:'left'
		});
		_template = _.template($('.lesson-taste-desc-template').html());
	};

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	settings.populateTemplate = function(templateData,sIndex){
		//populate template
		settings.removeTemplate();
		$('#lesson-how-to-taste-desc').append(_template(templateData));

		_carousels["center"] = new centerCarousel("#lesson-how-to-taste-desc .icon-container",{
			noDrag:true,
			onCarouselTap:function(e){
			},
			onCarouselChange:function(e){
				$('#lesson-how-to-taste-desc .content > .icon-container .icon-list .icon-item').eq(e).addClass('active').siblings().removeClass('active');
				if(_carousels["left"])_carousels["left"].slidePane(e,true);
			}
		});

		_carousels["left"] = new centerCarousel("#lesson-how-to-taste-desc .desc-container",{
			noDrag:true,
			onCarouselTap:function(e){
			},
			onCarouselChange:function(e){
				if(_carousels["center"])_carousels["center"].slidePane(e);
			}
		});

		if(typeof(sIndex) !=='undefined'){
			_carousels["center"].movePane(sIndex,true);
			_carousels["left"].movePane(sIndex);
		};

		//if(!$.isEmptyObject(_iosScrollView)){
		//	for(var key in _iosScrollView){
		//		_iosScrollView[key].destroy();
		//		_iosScrollView[key] = null;
		//		_iosScrollView[key] = new IScroll('#'+key,{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		//	};
		//}else{
		//	$('#lesson-how-to-taste-desc .desc-item').each(function(){
		//		_iosScrollView["desc-item-"+$(this).index()] = new IScroll('#'+$(this).attr('id'),{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		//	});
		//}

		$('#lesson-how-to-taste-desc .image-load').waitForImages({
		    each: function() {
		       $(this).addClass('active');
		    },
   		 waitForAll: true
		});
		
	};

	settings.removeTemplate = function(){
		$('#lesson-how-to-taste-desc > *').remove();
	};


	settings.show = function(callback,args){
		_inView = true;
		$('#lesson-how-to-taste-desc, .trans-overlay').addClass('active');
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
			$('#lesson-how-to-taste-desc').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};


	return settings;
}());


var lessonsTasteDescController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = lessonsModel,
		_cachedIDS = {},
		_view = lessonsTasteDescView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("lessonstastedesc:show",function(args){

		Queueing.get('lessonstastedesc').addTo(function(){
			settings.show(function(){
				Queueing.get("lessonstastedesc").setActive(false).trigger();
			},args);
		});

		_cachedIDS["id"] = typeof(args.id)!=='undefined' ? args.id : _cachedIDS["id"];
		_cachedIDS["cat"] = typeof(args.cat)!=='undefined' ? args.cat : _cachedIDS["cat"];

		_view.populateTemplate(_model.getLesson(_cachedIDS),(typeof(args.sIndex)==='undefined' ? 0 : args.sIndex));
		
	});

	globalEvent.attach('lessonstastedesc:hide',function(args){
		settings.hide(false,args);
	});	

	_model.lessonsRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('lessons removed');
		_view.removeTemplate();
		if(!_inView)return true;
		_goToHome();*/
	});

	_view.backButtonClicked.attach(function(sender, args){
		globalEvent.notify("lessonstastelist:show",{dir:'right'});
		settings.hide();
	});

	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});


	settings.start = function(){
		_view.start();
		Queueing.set('lessonstastedesc');
	};

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};

	function _backButton(e){
		e.preventDefault();
		globalEvent.notify("lessonstastelist:show",{dir:'right'});
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
		//globalEvent.notify('history:add',{id:'lessonstastedesc:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	return settings;
}()); 


