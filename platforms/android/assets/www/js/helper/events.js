/*
    Event function to dispatch changes 
*/
function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index,
            len;

        for (index = 0, len = this._listeners.length; index < len; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

var globalEvent = (function(){
    "use strict";
    
    var settings = {};

    settings.listeners = {};

    //event,callback
    settings.attach = function(event,listener){
        if(!settings.listeners[event])settings.listeners[event] = [];
        settings.listeners[event].push(listener);
    };

    settings.notify = function(event,args){
        if(!settings.listeners[event]){ return false; };
        for(var i = 0, len = settings.listeners[event].length; i < len; i++){
            settings.listeners[event][i](args);
        };
    };

    return settings;
}());