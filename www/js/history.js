var historyModel = (function(){
	var settings = {},
		_history = [];
		//_current = {};

	settings.getHistory = function(id){
		return _history;
	};

	settings.getBackHistory = function(){
		if(_history.length <= 0){ return false; }
		return _history[_history.length-1];
	};

	settings.addHistory = function(_data){
		if(_history.length > 0){
			if(_history[_history.length-1].id === _data.id)return true;
		};

		_history.push(_data);
	};
	settings.addCurrent = function(_data){
		_current = _data;
	};
	settings.getCurrent = function(){
		return _history.length > 0 ? _history[_history.length-1] : false;
	};

	settings.popHistory = function(){
		_history.pop();
	};
	settings.clearAll = function(){
		_history.length = 0;
	};
	
	return settings;
}());

var historyController = (function(){
	var settings = {},
		_model = historyModel,
		_waitForCallBack = false;

	globalEvent.attach("history:add",function(e){
		_model.addHistory(e);
	});


	function _hideCurrent(args){
		var _current = _model.getCurrent();
		if(!_current){ debug&&console.warn('Nothing to return in current history'); return false; };
		debug&&console.log('modifying the current history');

		var _returnObj = $.extend(true,{},_current);
			_returnObj.id = _returnObj.id.replace(/show/g,'hide');

		globalEvent.notify(_returnObj.id,{dir:'left'});
	};
	

	globalEvent.attach("history:back",function(args){
		if(_waitForCallBack)return false;
		_waitForCallBack = true;
		if(!_model.getBackHistory() || _model.getCurrent().id.match(/home/g)){
			debug&&console.error('THERE IS NO MORE HISTORY!');
			//globalEvent.notify('home:show');
			navigator.app.exitApp();
			return false;
		};

		_hideCurrent(args);

		_model.popHistory();
		var _history = _model.getBackHistory();
		globalEvent.notify(_history.id,{dir:'right'});
		setTimeout(function(){
			_waitForCallBack = false;
		},2000);
	});

	globalEvent.attach("history:clear",function(){
		_model.clearAll();
	});

	return settings;
}());