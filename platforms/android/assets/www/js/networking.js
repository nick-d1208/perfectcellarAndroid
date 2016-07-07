var networkingModel = (function(){
	var settings = {},
		_state = true;

	settings.setNetworkStatus = function(_bool){
		_state = _bool;
	};
	settings.getNetworkStatus = function(){
		return _state;
	};

	return settings;
}());

var networkingController = (function(){
	var settings = {},
		_model = networkingModel,
		_pendingIni = false;
		_iniRecieved = false;

	globalEvent.attach("app:ready",function(){
		globalEvent.attach('ini:notrecieved',function(){
			_pendingIni = false;
			_iniRecieved = false;
		});
		globalEvent.attach('ini:recieved',function(){
			_iniRecieved = true;
			_pendingIni = false;
		});

		document.addEventListener('online',function(){
			_model.setNetworkStatus(true);
			_checkIfContentLoaded();
		},false);

		document.addEventListener('offline',function(){
			_model.setNetworkStatus(false);
			globalEvent.notify("messages:nointernet");
		},false);

		document.addEventListener('resume',function(){
			_updateIni();
		},false);

		function _checkIfContentLoaded(){
			if(!_iniRecieved&&!_pendingIni){
				_pendingIni = true;
				globalEvent.notify("app:ini");
			};
		};

		function _updateIni(){
			if(!_pendingIni){
				_pendingIni = true;
				globalEvent.notify("app:ini");
			};
		};

	});

	return settings;
}());