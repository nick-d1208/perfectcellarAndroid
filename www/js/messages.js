var messagesModel = (function(){
	var settings = {},
		_messages = {
			nonmember:{
				message:'To access this content, you need to either sign in or become a My Perfect 3 member',
				title:'Member only content'
			},
			restrictedmember:{
				title:'Member only content',
				message:'To access this content, you need to become a 12 month member'
			},
			nointernet:{
				message:'Please connect to the internet to view all content',
				title:'You are not connected to the internet'
			},
			restrictedNoInternet:{
				message:'Please connect to the internet to view this content',
				title:'You are not connected to the internet'
			}
		};

	settings.getMessage = function(id){
		if(typeof(_messages[id])==='undefined')return '';
		return _messages[id];
	};

	return settings;
}());

var messagesController = (function(){
	var settings = {},
		_userModel = userModel,
		_model = messagesModel;

	globalEvent.attach("messages:nonmember",function(e){
		_createMessageButtonPopup('nonmember');
	});
	globalEvent.attach("messages:restrictedmember",function(e){
		if(!_userModel.getUser()){
			_createMessageButtonPopup('nonmember');
			return true;
		}
		_createMessagePopup('restrictedmember');
	});
	globalEvent.attach("messages:nointernet",function(e){
		_createMessagePopup('nointernet');
	});
	globalEvent.attach("messages:restrictedNoInternet",function(e){
		_createMessagePopup("restrictedNoInternet");
	});

	function _createMessagePopup(id){
		var _item = _model.getMessage(id);
		if(!_item)return false;
		Popup.createConfirmPopup(_item.title,_item.message,null,'Okay');
	};

	function _createMessageButtonPopup(id){
		var _item = _model.getMessage(id);
		if(!_item)return false;
		Popup.createButtonPopup(_item.title, _item.message, function(e){
			if(e === 1){
				showPageInAppBrowser('http://www.perfectcellar.com/pages/my-perfect-3');
			}else{
				
			}
		}, ['Sign up', 'OK']);
	};

	return settings;
}());