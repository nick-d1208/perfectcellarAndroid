function ParallaxImageScroll(_args){
	this.image = typeof(_args)==='object'&&_args.image ? _args.image : '';
	this.scrollView =  typeof(_args)==='object'&&_args.scrollView ? _args.scrollView : '';
	this.springClass = typeof(_args)==='object'&&_args.springClass ? _args.springClass  : '';
	this.iosScroll = typeof(_args)==='object'&&_args.iosScroll ? _args.iosScroll : '';
	
	this.start();

	return this;
};

ParallaxImageScroll.prototype.start = function(){
	if(!this.iosScroll)return false;
	var _self = this;
	this.iosScroll.on('scroll',function(){ _self.onScroll() });
};

ParallaxImageScroll.prototype.onScroll = function(){
	
	var _self = this;

	$(_self.image).removeClass(_self.springClass);
	var _scrollTop = parseInt($(_self.scrollView).css('transform').replace(/\)/,'').split(',')[5]);
	var _scrollTopCache = _scrollTop;
		_scrollTop *= -0.5;
		_scrollTop = _scrollTop < 0 ? 0 : (_scrollTop*-1);

	var _scale = (_scrollTopCache / 100) + 1;
	_scale = _scale < 1 ? 1 : _scale;

	var _translateY = _scrollTop / 2;
	
	$(_self.image).css({
		'-webkit-transform' : 'translate3d(0px,'+_translateY+'px,0px) scale3d('+_scale+','+_scale+','+_scale+') ',
		'transform'         : 'translate3d(0px,'+_translateY+'px,0px) scale3d('+_scale+','+_scale+','+_scale+') '
	});
};

ParallaxImageScroll.prototype.onScrollEnd = function(){
	/*var _self = this;

	if($(_self.scrollView).offset().top >= 0){
		$(_self.image).addClass(_self.springClass);
		$(_self.image).css({
			'-webkit-transform' : 'translate3d(0,0,0)',
			'transform'         : 'translate3d(0,0,0)'
		});
	};*/
};

