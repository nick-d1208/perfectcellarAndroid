var quizzesModel = (function(){
	"use strict";
	var settings = {},
		_id = 'quizzesModel',
		_complementaryQuiz = {
			img:'',
			index:'0',
			name:'Q01 - Free',
			questions:[
				{
					a:[
						"Thai green curry", "Scallops", "Beef Bourguignon", "Sticky toffee pudding"
					],
					c: 1,
					q:"What food pairs well with Chablis Premier Cru?"
				},
				{
					a:[
						"Viognier and Shiraz", "Merlot and Cabernet Sauvignon", "Garnacha and Carignan", "Pinot Noir and Chardonnay"
					],
					c: 2,
					q:"Which varieties are commonly blended with Tempranillo?"
				},
				{
					a:[
						"Traditional method", "Tank", "Soda stream", "Charmat"
					],
					c: 0,
					q:"What is the method used to make Cremant d’Loire"
				},
				{
					a:[
						"Nuit-Saint- George", "Mâconnais", "Cote d’Or", "Beaujolais"
					],
					c: 1,
					q:"Which area in Burgundy produces the most white wine?"
				},
				{
					a:[
						"Continental", "Mediterranean", "Maritime", "High altitudes"
					],
					c: 0,
					q:"What climate influences the wines made in Rioja?"
				}
				
			]
		},
		_quizzes = [];

	settings.quizzesAdded = new Event(_id);
	settings.quizzesRemoved = new Event(_id);

	settings.addQuizzes = function(quizzes){
		_quizzes = quizzes;
		settings.quizzesAdded.notify({quizzes:$.extend(true,[],_quizzes)});
	};

	settings.removeQuizzes = function(){
		//remove quizzes;
		_quizzes.length = 0;
		settings.quizzesRemoved.notify();
	};

	settings.getQuizzes = function(){
		return $.extend(true,[],_quizzes);
	};
	settings.getQuizz = function(currindex){
		/*if(typeof(currindex)!=='number' || currindex < 0){
			debug&&console.log('index invalid');
			return false;
		};*/

		if(currindex==='free'){
			return {curr:_complementaryQuiz, prev:_quizzes};
		}
		
		return {curr:_quizzes[currindex], prev:_quizzes};
	};

	return settings;
}());


var quizzesView = (function(){
	"use strict";
	var settings = {},
		_pageTransitions = null,
		_id = 'quizzesView',
		_template = null,
		_quizListTemplate = null,
		_scoreTemplate = null,
		//_iosScrollView = null,
		_ajaxTimeout = null,
		_timeout = null,
		_inView = false;

	settings.backButtonClicked = new Event(_id);
	settings.quizAnswerClicked = new Event(_id);
	settings.homeButtonClicked = new Event(_id);
	settings.shareButtonClicked = new Event(_id);
	settings.previousQuizButtonClicked = new Event(_id);
	settings.previousQuizItemClicked = new Event(_id);
	settings.selectionMemberOnlyClicked = new Event(_id);


	settings.start = function(){
		
		$('#quizzes').on('click','.mp3-header .icon-left',function(){
			settings.backButtonClicked.notify();
		});
		$('#quizzes').on('click','.quiz-item .answer-item',function(){
			$(this).addClass('active').siblings().removeClass('active');
			settings.quizAnswerClicked.notify({quizid:$(this).attr('data-quiz'), id:$(this).attr('data-id')});
		});
		$('#quizzes').on('click','.mp3-header .icon-right',function(){
			settings.homeButtonClicked.notify();
		});
		$('#quizzes').on('click','.share .sharebox',function(){
			settings.shareButtonClicked.notify();
		});
		$('#quizzes').on('click','.previous-container .previous-button',function(){
			settings.previousQuizButtonClicked.notify();
		});
		$('#quizzes').on('click','.previous-container .previous-item',function(){
			if($(this).hasClass('noclick')){
				settings.selectionMemberOnlyClicked.notify();
				return true;
			};
			settings.previousQuizItemClicked.notify({id:$(this).attr('data-id')});
		});

		_pageTransitions =  new PageTransitions({
			el:'#quizzes',
			transition:'left'
		});
		_template = _.template($('.quiz-template').html());
		_scoreTemplate = _.template($('.quiz-score-template').html());
		_quizListTemplate = _.template($('.quiz-list-template').html());
	};

	settings.moveQuiz = function(index){
		var elem = $('#quizzes .quiz-item'),
			offset = ((100/elem.length)*index);
		$('#quizzes .quiz-list').css({
			'-webkit-transform':'translate3d(-'+offset+'%,0,0)',
			'transform':'translate3d(-'+offset+'%,0,0)'
		});
		$('#quizzes > .tab-arrows .tab-container').css({
			'-webkit-transform':'translate3d('+(offset>>0)+'%,0,0)',
			'transform':'translate3d('+(offset>>0)+'%,0,0)'
		});

	};
	

	settings.showLoader = function(){
		$('.disable-overlay').addClass('show');
	};

	settings.hideLoader = function(){
		$('.disable-overlay').removeClass('show');
	};

	settings.populateScoreTemplate = function(templateData){
		settings.removeScoreTemplate();
		$('#quizzes .quiz-item.score .yourscore').append(_scoreTemplate(templateData));
	};

	settings.populateTemplate = function(templateData){
		debug&&console.log(templateData);

		settings.removeTemplate();

		$('#quizzes').append(_template(templateData));
		
		/* Adjust widths */
		var quizItem = $('#quizzes > .content > .scroller > .content-wrapper .quiz-list .quiz-item'),
			quizParent = $('#quizzes > .content > .scroller > .content-wrapper .quiz-list');
		quizItem.width(quizParent.width()-(window.innerWidth <= 320 ? 20 : 60));
		quizParent.width(quizItem.length * (quizParent.width()));

		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		//};
		//_iosScrollView = new IScroll('#quizzes .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
	};	

	settings.populateQuizListTemplate = function(templateData){
		settings.removeQuizListTemplate();
		$('#quizzes .scroller .previous-container').before(_quizListTemplate(templateData));

		var quizItem = $('#quizzes > .content > .scroller > .content-wrapper .quiz-list .quiz-item'),
			quizParent = $('#quizzes > .content > .scroller > .content-wrapper .quiz-list');
		quizItem.width(quizParent.width()-(window.innerWidth <= 320 ? 20 : 60));
		quizParent.width(quizItem.length * (quizParent.width()));

		//if(_iosScrollView){
		//	_iosScrollView.destroy();
		//	_iosScrollView = null;
		//};
		//_iosScrollView = new IScroll('#quizzes .wrapper-scroller',{hScrollbar:false, vScrollbar:false,hideScrollbar: true, hideScrollbars: true,preventDefaultException: { tagName:/.*/ },click:true});
		
		settings.moveQuiz(0);
	};

	settings.removeQuizListTemplate = function(){
		$('#quizzes .content-wrapper').remove();
	};

	settings.removeTemplate = function(){
		$('#quizzes .tab-arrows, #quizzes .wrapper-scroller').remove();
	};
	settings.removeScoreTemplate = function(){
		$('#quizzes .quiz-item.score .yourscore .score-container').remove();
	};

	settings.togglePreviousQuizzes = function(){
		clearTimeout(_timeout);
		var _prevList = $('#quizzes .previous-container .previous-list'),
			_prevButton = $('#quizzes .previous-container .previous-button');

		_prevList.toggleClass('active');
		_prevButton.toggleClass('active');

		var _height = _prevList.hasClass('active') ? (_prevList.get(0).scrollHeight) : 0;
		_prevList.height(_height);

		//if(!_iosScrollView)return true;
		//if(!_prevList.hasClass('active'))_iosScrollView.scrollTo(0,0,300, IScroll.utils.ease.quadratic);
		//transitionEnd(_prevList,function(){
		//		_iosScrollView.refresh();
		//});
		
	};

	settings.show = function(callback,args){
		_inView = true;
		$('#quizzes, .trans-overlay').addClass('active');
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
			$('#quizzes').removeClass('active');
			if(typeof(callback)==='function'){ callback(); };
		});
	};

	return settings;
}());

var quizzesController = (function(){
	"use strict";
	var settings = {},
		_inView = false,
		_model = quizzesModel,
		_currentQuizStats = {},
		_view = quizzesView;

	globalEvent.attach("app:ready",function(args){
		// initialise now that the app is ready.
		settings.start();
	});

	globalEvent.attach("quizzes:show",function(args){
		
		Queueing.get('quizzes').addTo(function(){
			settings.show(function(){
				Queueing.get("quizzes").setActive(false).trigger();
			},args);
		});

		_view.showLoader();

		globalEvent.notify("permission:populatequizzes",{
			callback:function(e){
				if(!e.value){
					Queueing.get('quizzes').addTo(function(){
						_view.hideLoader();
						globalEvent.notify('home:show');
						settings.hide(function(){
							Queueing.get("quizzes").setActive(false).removeAll();
						},{dir:'left'});
					});
				};

				resetCurrentQuizStats();

				if(e.complimentary){
					_populateQuizzes($.extend({current:'free'},e));
					return true;
				};

				_populateQuizzes(e);
	
			}
		});
	});

	globalEvent.attach("quizzes:hide",function(args){
		settings.hide(false,args);
	});


	_model.quizzesAdded.attach(function(sender, args){
		// quizzes added.
		debug&&console.log('quizzes added');
	});

	_model.quizzesRemoved.attach(function(sender, args){
		// quizzes added.
		/*debug&&console.log('quizzes removed');
		_view.removeTemplate();
		resetCurrentQuizStats();
		if(!_inView)return true;
		_goToHome();*/
	});

	_view.backButtonClicked.attach(function(sender, args){
		
		if(_currentQuizStats.cid<=0){
			globalEvent.notify("home:show",{dir:'right'});
			settings.hide();
			return true;
		};
		
		_currentQuizStats.pid = (_currentQuizStats.cid);
		_currentQuizStats.cid = parseInt(_currentQuizStats.cid)-1;
		_view.moveQuiz(_currentQuizStats.cid);

	});
	
	_view.shareButtonClicked.attach(function(sender,args){
		globalEvent.notify("share",{id:'quiz',content:_currentQuizStats.cscore});
	});

	_view.selectionMemberOnlyClicked.attach(function(sender, args){
		globalEvent.notify('messages:restrictedmember');
	});

	//_view.previousQuizItemClicked.notify({id:$(this).attr('data-id')});
	_view.previousQuizItemClicked.attach(function(sender, args){
		resetCurrentQuizStats(parseInt(args.id));
		_populateQuizListOnly(args);
	});

	_view.quizAnswerClicked.attach(function(sender, args){
		_currentQuizStats.userAnswers[args.quizid] = args.id;
		_currentQuizStats.pid = (args.quizid);
		_currentQuizStats.cid = (parseInt(args.quizid)+1);

		var _curQuiz = _model.getQuizz(_currentQuizStats.id).curr.questions;

		if(_currentQuizStats.cid >= _curQuiz.length){
			var data = {
				score:0,
				maxscore:_curQuiz.length,
				desc:'Congratulations!',
			}

			for(var i = 0, len = _curQuiz.length, keys=Object.keys(_currentQuizStats.userAnswers); i < len; i++){
				if(parseInt(_currentQuizStats.userAnswers[keys[i]]) === parseInt(_curQuiz[i].c)){
					data.score++;
				};
			};
			
			_currentQuizStats.cscore = data.score;
			_currentQuizStats.maxscore = data.maxscore;

			_view.populateScoreTemplate(data);
		}

		_view.moveQuiz(_currentQuizStats.cid);
	});

	_view.homeButtonClicked.attach(function(sender, args){
		_goToHome();
	});

	_view.previousQuizButtonClicked.attach(function(sender, args){
		globalEvent.notify("permission:canShowPreviousItems",{
			callback:function(e){
				if(!e.value){
					globalEvent.notify("messages:nonmember");
					return false;
				};
				_view.togglePreviousQuizzes();
			}
		});
	});


	settings.start = function(){
		_view.start();
		Queueing.set('quizzes');
	};

	function _populateQuizzes(e){
		_currentQuizStats.id = e.current;
		var _data = _model.getQuizz(_currentQuizStats.id, e.amount); 
		_view.populateTemplate($.extend(true,{allowed:e.allowed},_data));
		_view.hideLoader();
	};

	function _populateQuizListOnly(e){
		var _data = _model.getQuizz(parseInt(e.id)); 
		_view.populateQuizListTemplate($.extend(true,{},_data));
	};

	function resetCurrentQuizStats(id){
		_currentQuizStats = {
			userAnswers:{},
			cid:0,
			pid:0,
			cscore:0,
			mscore:0,
			id:typeof(id)==='undefined' ? new Date().getMonth() : id
		};
	};

	function _goToHome(){
		globalEvent.notify("home:show",{dir:'right'});
		settings.hide();
	};


	function _backButton(e){
		e.preventDefault();
		if(_currentQuizStats.cid<=0){
			globalEvent.notify("home:show",{dir:'right'});
			settings.hide();
			return true;
		};
		
		_currentQuizStats.pid = (_currentQuizStats.cid);
		_currentQuizStats.cid = parseInt(_currentQuizStats.cid)-1;
		_view.moveQuiz(_currentQuizStats.cid);
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
			resetCurrentQuizStats();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};

	settings.show = function(callback,args){
		_inView = true;
		//globalEvent.notify('history:add',{id:'quizzes:show',dir:'left'});
		_view.showLoader();
		_view.show(function(){
			_addBackEvents();
			_view.hideLoader();
			if(typeof(callback)==='function'){ callback(); };
		},args);
	};


	return settings;
}());