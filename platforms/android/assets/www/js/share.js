var shareModel = (function(){
	"use strict";
	var settings = {},
		_shareContent = {
			quiz:function(score){
				return {message:'I scored ' + score + ' on my perfect 3 quiz.',subject:'Perfect Cellar - My perfect 3',url:'http://www.perfectcellar.com/pages/my-perfect-3'};
			},
			matchmaker_sharefriend:function(content){
				return {message:'Download My Perfect 3 app today!', url:'http://www.perfectcellar.com/pages/my-perfect-3'}
			}
		};

	settings.getShareContent = function(args){
		if(!_shareContent.hasOwnProperty(args.id))return false;
		return _shareContent[args.id](args.content);
	};

	return settings;
}());

var shareController = (function(){
	"use strict";
	var settings = {},
		_model = shareModel;

	globalEvent.attach("share",function(args){
		if(typeof(args)==='undefined'){
			return false;
		};
		_share(args);
	});

	function _share(args){
		var _content = _model.getShareContent(args);
		if(!_content){ return false; };

		window.plugins.socialsharing.share(_content.message,_content.subject,null,_content.url,function(){
			//success
		},function(){
			//fail
		});

	};

	return settings;
}());