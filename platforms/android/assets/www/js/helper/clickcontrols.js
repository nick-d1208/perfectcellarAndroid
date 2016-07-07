/* Controls touch events, so user won't click a button if the user has moved! */

function ClickControl(_args){
	if(typeof(_args)==='undefined')return false;

	this.selector = _args.selector;
	this.childSelector = _args.childSelector;
	this.callback = _args.callback;
	this.customEvent = typeof(_args)==='object'&&_args.customEvent ? _args.customEvent : 'touchend';
	this.startTimer = 0;
	this.pos = {
		x:0,
		y:0
	};
	this.lastpos = {
		x:0,
		y:0
	};


	var _self = this;

	
	var _start = function(){
		if(_self.customEvent!=='touchend'){
			if(typeof(_self.childSelector) !== 'undefined'){
				$(_self.selector).on(_self.customEvent,_self.childSelector,function(e){ debug&&console.log('clicked 1'); _self.onCustomEvent(e,$(this)); });
			}else{
				$(_self.selector).on(_self.customEvent,function(e){ debug&&console.log('clicked 2'); _self.onCustomEvent(e,$(this)); });
			}
			return true;
		};

		if(typeof(_self.childSelector) !== 'undefined'){
			$(_self.selector).on('touchstart touchmove '+_self.customEvent,_self.childSelector,function(e){ debug&&console.log('clicked 3'); _self.checkIfTouchMoved(e,$(this)); });
		}else{
			$(_self.selector).on('touchstart touchmove '+_self.customEvent,function(e){ debug&&console.log('clicked 4'); _self.checkIfTouchMoved(e,$(this)); });
		}
	};

	_start();

	return this;

};
ClickControl.prototype.trigger = function(){
	if(this.childSelector==='undefined'){
		$(this.selector).trigger(this.customEvent);
	}else{
		$(this.selector+' '+this.childSelector).trigger(this.customEvent);
	}
};

ClickControl.prototype.onCustomEvent = function(e,jq){
	if(this.callback){ this.callback.call($(jq),e); };
};

ClickControl.prototype.checkIfTouchMoved = function(e,jq){
	e.preventDefault();
	if(e.type==='touchstart'){ this.startTimer = Date.now(); this.pos.x = e.originalEvent.touches[0].pageX; this.pos.y=e.originalEvent.touches[0].pageY; return false;}else
	if(e.type==='touchmove'){
		this.lastpos.x = e.originalEvent.touches[0].pageX;
		this.lastpos.y = e.originalEvent.touches[0].pageY;
	}else
	if(e.type==='touchend'){
		if(Math.abs((this.pos.x - this.lastpos.x)) > 10 || Math.abs((this.pos.y - this.lastpos.y)) > 10){
			return false;
		};
		if(this.callback){ this.callback.call($(jq),e); };
	}
	return false;
};