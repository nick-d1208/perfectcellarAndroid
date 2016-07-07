/*
App.js

Initialise modules here
only after the 'deviceready' callback has been done
*/

var debug = false;


var appController = (function(){
    "use strict";
    var settings = {},
        _quizzesModel = quizzesModel,
        _lessonsModel = lessonsModel,
        _userModel = userModel,
        _ajaxTemplate = null,
        _iniRecieved = false,
        _myWinesModel = myWinesModel;

    globalEvent.attach("app:ini",function(args){
       _callToIni();
    });

    globalEvent.attach("app:updateUser",function(args){
        _checkIfUserLoggedIn(function(e){
            if(typeof(arg)!=='undefined'&&typeof(args.callback)==='function')args.callback(e);
        });
    });

    globalEvent.attach("user:loggedin",function(){
        if(!_iniRecieved){
            _callToIni();
        }
    });

    function _initialise(){
        _events();
    };

    function _events(){
        document.addEventListener('deviceready',_onDeviceReady, false);
    };

    function _showAjaxLoader(){
        $('.disable-overlay').addClass('show');
        _removeAjaxLoader(true);
        $('body').append(_ajaxTemplate());
    };
    function _removeAjaxLoader(onlyLoader){
        if(!onlyLoader)
            $('.disable-overlay').removeClass('show');
        $('body > .ajax-loader').remove();
    };

    function _onDeviceReady(){
        
        FastClick.attach(document.body);
        
        $(document).on('touchend click', function(e){
            if (document.activeElement && document.activeElement !== e.target) document.activeElement.blur();
        });

        $(document).on('click touchend','a',function(e){
            e.preventDefault();
            showPageInAppBrowser($(this).attr('href'));
        });

        document.addEventListener("backbutton",_backButton, false);

        /* Kick start the modules since cordova has been loaded */
        Statusbar.start('#021326');

        _ajaxTemplate = _.template($('.ajax-loader-template').html());

        _callToIni();

        globalEvent.notify("app:ready"); // Let the app know that it's ready!

        navigator.splashscreen.hide();

    };

    function _backButton(e){
        e.preventDefault();
    };

    function _callToIni(){
         _showAjaxLoader();

        _ini({
            onSuccess:function(){
                debug&&console.log('Ini done');
                _checkIfUserLoggedIn(function(){
                    _removeAjaxLoader();
                });
            },
            onError:function(){
                debug&&console.error('didnt receieve ini!!');
                _removeAjaxLoader();
            }
        }); 
    };

    function _checkIfUserLoggedIn(cb){
        var _token = _userModel.getToken();
         _showAjaxLoader();
         if(_token){
            // logged in.
            _getUserInfo({
                onSuccess:function(e){
                    if(typeof(cb)==='function')cb(true);
                     _removeAjaxLoader();
                },
                onError:function(e){
                    if(typeof(cb)==='function')cb(false);
                    _removeAjaxLoader();
                },
                token:_token
            });
        }else{
            // logged out.
            debug&&console.log('logging out as there is no user in');
            globalEvent.notify('user:logout',{logoutNoPopup:true});
             _removeAjaxLoader();
            if(typeof(cb)==='function')cb(false);
        } 
    };

    function _getUserInfo(args){
        handlerController.getinfo({hash:args.token},function(e){
            //success
            _userModel.updateUser(e.d);
            globalEvent.notify('user:loggedin');
            if(args&&args.onSuccess)args.onSuccess();
        },function(e){
            // fail
            debug&&console.error('ERROR: ' + e);
            if(args&&args.onError)args.onError(e);
            return false;
        })
    };

    function _ini(args){
        handlerController.content({},function(e){
            // success

            debug&&console.log('content recieved.');
            debug&&console.log(e);

            if(typeof(e.quizzes)!=='undefined' && e.quizzes.length > 0){
                _quizzesModel.removeQuizzes();
                _quizzesModel.addQuizzes(e.quizzes);
            };

            if(typeof(e.lessons)!=='undefined' && e.lessons.length > 0){
                _lessonsModel.removeLessons();
                _lessonsModel.addLessons(e.lessons);
            };

            if(typeof(e.wines)!=='undefined' && e.wines.length > 0){
                _myWinesModel.removeWines();
                _myWinesModel.addWines(e.wines);
            };

            globalEvent.notify('ini:recieved');
            _iniRecieved = true;

            if(args&&args.onSuccess)args.onSuccess();
        },function(e){
            // fail
            debug&&console.log('Error! :' + e);
             globalEvent.notify('ini:notrecieved');
             _iniRecieved = false;
            if(args&&args.onError)args.onError();
        });
    };

    _initialise();


    return settings;
}());