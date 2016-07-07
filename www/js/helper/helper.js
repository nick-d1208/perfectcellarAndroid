
function SwipeCarousel(element,args)
{
  element = $(element);

  var self = this,
    _stop = false,
    onCarouselChange = typeof(args)==='object'&&args.onCarouselChange ? args.onCarouselChange : null,
    onCarouselTap = typeof(args)==='object'&&args.onCarouselTap ? args.onCarouselTap : null;

  /**
  * initial
  */

  this.stop = function(){
    _stop = true;
  };

  this.start = function(){
    _stop = false;
  };


  function handleHammer(ev) {
    // disable browser scrolling
    ev.gesture.preventDefault();
    
    if(_stop)return false;

    switch(ev.type) {

    
      case 'swipeleft':
        if(onCarouselChange)onCarouselChange('left');
        ev.gesture.stopDetect();
        break;

      case 'swiperight':
        if(onCarouselChange)onCarouselChange('right');
        ev.gesture.stopDetect();
        break;

      case 'tap':
        if(onCarouselTap)onCarouselTap();
      break;
      
    }
  }

  new Hammer(element[0], { dragLockToAxis: true }).on("tap swipeleft swiperight", handleHammer);
};

function centerCarousel(element, args){
  var self = this,
      element = $(element),
      container = $('>ul',element),
      panes = $('>ul>li',element),
      pane_width = 0,
      pane_count = panes.length,
      current_pane = 0,
      onCarouselChange = typeof(args)==='object'&&args.onCarouselChange ? args.onCarouselChange : null,
      onCarouselTap = typeof(args)==='object'&&args.onCarouselTap ? args.onCarouselTap : null,
      onCarouselSwipe = typeof(args)==='object'&&args.onCarouselSwipe ? args.onCarouselSwipe : null,
      _noDrag = typeof(args)==='object'&&args.noDrag ? args.noDrag : false;


  this.init = function(){
    setPaneDimensions();
    if(onCarouselChange)onCarouselChange(current_pane,pane_count);
  };

  function setPaneDimensions(){
    pane_width = panes.eq(0).outerWidth();
    container.width(pane_width*pane_count);
  };

  this.showPane = function(index, animate) {
    // between the bounds
    index = Math.max(0, Math.min(index, pane_count-1));

    current_pane = index;
    
    var offset = -((100/pane_count)*current_pane);
    setContainerOffset(offset, animate);
  };

  function setContainerOffset(percent, animate) {
    container.removeClass("animate");

    if(animate) {
      container.addClass("animate");
    }

    container.css("transform", "translate3d("+ percent +"%,0,0)");

  }

  this.next = function() { this.showPane(current_pane+1, true); if(onCarouselChange)onCarouselChange(current_pane,pane_count); };
  this.prev = function() { this.showPane(current_pane-1, true); };
  this.slidePane = function(_index,ncb) { this.showPane(_index, true); if(onCarouselChange&&!ncb)onCarouselChange(current_pane,pane_count); };
  this.movePane = function(_index,cb) { this.showPane(_index, false); if(onCarouselChange&&cb)onCarouselChange(current_pane,pane_count); };
  this.getCurrentPane = function(){ return current_pane; }

  function handleHammer(ev) {
    // disable browser scrolling
    ev.gesture.preventDefault();
  

    switch(ev.type) {

      case 'dragright':
      case 'dragleft':
      if(_noDrag)break;
        // stick to the finger
        var pane_offset = -(100/pane_count)*current_pane;
        var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

        // slow down at the first and last pane
        if((current_pane == 0 && ev.gesture.direction == "right") ||
           (current_pane == pane_count-1 && ev.gesture.direction == "left")) {
          drag_offset *= .4;
        }

        setContainerOffset(drag_offset + pane_offset);
        break;


      case 'swipeleft':
        self.next();
        if(onCarouselChange)onCarouselChange(current_pane,pane_count);
        if(onCarouselSwipe)onCarouselSwipe(current_pane,pane_count);
        ev.gesture.stopDetect();
        break;

      case 'swiperight':
        self.prev();
        if(onCarouselChange)onCarouselChange(current_pane,pane_count);
        if(onCarouselSwipe)onCarouselSwipe(current_pane,pane_count);
        ev.gesture.stopDetect();
        break;

      case 'tap':
      if(onCarouselTap)onCarouselTap(current_pane);
      break;

      case 'release':
        // more then 50% moved, navigate
        if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
          if(ev.gesture.direction == 'right') {
            self.prev();
          } else {
            self.next();
          }
          if(onCarouselChange)onCarouselChange(current_pane,pane_count);
        }
        else {
          self.showPane(current_pane, true);
        }
        break;
    }
  };
  new Hammer(element[0], { dragLockToAxis: true }).on("release tap dragleft dragright swipeleft swiperight", handleHammer);

  this.init();
  return this;
};



var prefix=(function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();


var animationStart = function(elem,callback){
  elem.off("webkitAnimationStart animationstart");
  if(!parseFloat(elem.css(prefix.css+'animation-duration')) || elem.length <= 0){callback.call(elem); return true;}
  elem.one("webkitAnimationStart animationstart",function(e) {
    $(this).off("webkitAnimationStart animationstart");
    callback.call($(this));
  });
};

var animationEnd=function(elem,callback){
  elem.off("webkitAnimationEnd animationend");
  if(!parseFloat(elem.css(prefix.css+'animation-duration')) || elem.length <= 0){callback.call(elem); return true;}
  elem.one("webkitAnimationEnd animationend",function(e) {
    $(this).off("webkitAnimationEnd animationend");
    callback.call($(this));
  });
}

var transitionEnd=function(elem,callback){
    elem.off("webkitTransitionEnd transitionend");
    if(!parseFloat(elem.css(prefix.css+'transition-duration')) || elem.length <= 0){callback.call(elem); return true;}
    elem.one("webkitTransitionEnd transitionend",function(e) {
      $(this).off("webkitTransitionEnd transitionend");
      callback.call($(this));
    });
};


function PageTransitions(args){
  var defaults = {
    transition:'bottom',
    transitionDict:{
      bottom:{
        out:'animBottomOut',
        in:'animBottomIn'
      },
      left:{
        out:'animLeftOut',
        in:'animLeftIn'
      },
      right:{
        out:'animRightOut',
        in:'animRightIn'
      },
      top:{
        out:'animTopOut',
        in:'animTopIn'
      },
      empty:{
        out:'none',
        in:'none'
      }
    },
    classes:'animBottomIn animBottomOut animLeftIn animLeftOut animRightOut animRightIn animTopOut animTopIn',
    el:null
  };

  this.settings = $.extend(true,{},defaults,args);

  return this;
};
PageTransitions.prototype = {
  out:function(transition,startcb,endcb){
    if(transition)this.settings.transition = transition;
    if(this.settings.transition==='none'){
      if(endcb)endcb();
      return true;
    };
    var _self = this;
    animationStart($(this.settings.el),function(){ if(startcb)startcb(); });
    $(this.settings.el).removeClass(this.settings.classes);
    $(this.settings.el).addClass(this.settings.transitionDict[this.settings.transition].out);
    animationEnd($(this.settings.el),function(){
      $(_self.settings.el).removeClass(_self.settings.classes);
      if(endcb)endcb();
    });

  },
  in:function(transition,startcb,endcb){
    if(transition)this.settings.transition = transition
    if(this.settings.transition==='none'){
      if(endcb)endcb();
      return true;
    };
    var _self = this;
    animationStart($(this.settings.el),function(){ if(startcb)startcb(); });
    $(this.settings.el).removeClass(this.settings.classes);
    $(this.settings.el).addClass(this.settings.transitionDict[this.settings.transition].in);
    animationEnd($(this.settings.el),function(){
      if(endcb)endcb();
    });
  }
};


function showPageInAppBrowser(_url){
  if(!_url || typeof(_url)!=='string'){
    return false;
  };
  window.open(_url, "_blank", "location=yes, toolbar=yes, EnableViewPortScale=yes");
  return true;
};

function objectToAjaxParameters(obj){
  if(typeof(obj)==='undefined' || $.isEmptyObject(obj)){ return ''; }
  var _str = [],
      _index = 0;
  for(var key in obj){
    if(_index===0){
      _str.push('?'+key+'='+encodeURIComponent(obj[key]));
    }else{
      _str.push('&'+key+'='+encodeURIComponent(obj[key]));
    }
    _index++;
  };
  return _str.join('');
};


function numberToTextName(index){
  if(typeof(index)!=='number'){ debug&&console.log('index is not of type number!'); return index; };
  switch(index){
    case 0:
    return 'One';
    break;

    case 1:
    return 'Two';
    break;

    case 2:
    return 'Three';
    break;

    case 3:
    return 'Four';
    break;

    case 4:
    return 'Five';
    break;

    default:
    return 'null';
  };
};

var Queueing = (function(){
  var settings = {}, 
      queues = {};


    function Queue(){
      this.func = [];
      this.active = false;
    };
    Queue.prototype = {
      addTo:function(_func){
        this.func.push(_func);
        this.checkIfNextQueueIsAvailable();
        return this;
      },
      setActive:function(_bool){
        this.active = _bool;
        return this;
      },
      trigger:function(){
        if(this.func.length <= 0)return this;
        this.runQueue();
        return this;
      },
      checkIfNextQueueIsAvailable:function(){
        if(this.active || this.func.length <= 0){ return this; }
        this.runQueue();
        return this;
      },
      runQueue:function(){
        var _func = $.extend(true,[],this.func);
        this.func.shift();
        _func[0]();
        debug&&console.log(this.func.length);
        return this;
      },
      removeAll:function(){
        this.func.length = 0;
        return this;
      }
    };


  settings.get = function(id){
    if(typeof(id)==='undefined' || typeof(queues[id])==='undefined'){
      debug&&console.error('id is not defined or there is not queue with that id');
      return false;
    };

    return queues[id];

  };

  settings.set = function(id){
      if(typeof(id)==='undefined'){ debug&&console.error('id is not defined!'); return false; };
      queues[id] = new Queue();
  };

  return settings;
}());


function trimStringLength(text,length){
  if(typeof(text)!=='string' || typeof(length)!=='number')return '';
  return (text.substring(0, length-3) + '...');
};

function unixToMonth(unix){
  if(typeof(unix)==='undefined' || !unix){ return false; };
  return moment.unix(unix).month();
};

function arrayToObject(arr){
    if(!$.isArray(arr))return arr;
    var _obj = {};
    for(var i = 0, len = arr.length; i < len; i++){
      _obj[arr[i]] = arr[i];
    };
    return (arr = _obj);
};



function orbRotation(container,elem,orbcenter){
    var _size = elem.mm.outerWidth(),
        slots = {
            baseSize:_size,
            right:{angle:360, size:0.7, id:'right'},
            left:{angle:180, size:0.7, id:'left'},
            top:{angle:270, size:0.6, id:'top'},
            bottom:{angle:90,size:1, id:'bottom'}
        };
    var w = container.outerWidth(),
    h = container.outerHeight(),
    angle = 3 * Math.PI / 180,
    cx = w/2,
    cy = h/2,
    radius = (w/2) - (_size/2),
    _requestAnim = null;


    if(window.innerWidth <= 320 && window.innerHeight <= 480){
      radius = _size - 10;
    }

    function Item(args){
        this.size = _size;
        this.tween = null;
        this.slots = args.slots;
        this.currentSlotElem = $.extend(true,{},this.slots[0]);
        this.currentSlot = 0;
        this.previousSlot = 0;
        this.maxSlot = this.slots.length-1;
        this.image = new Image();
        this.image.src = args.image;
        this.angle = this.slots[0].angle;
        this.x = 0;
        this.y = 0;
        this.offset = 0;
        this.elem = args.elem;
        this.prevAngle = null;

        this.draw();
    };
    Item.prototype.next = function(){
        var self = this;
        this.currentSlot++;
        this.previousSlot = this.currentSlot - 1;
        if(this.currentSlot > this.maxSlot){
            this.currentSlot = 0;
        }

      this.elem.removeClass('active');
      if(this.slots[this.currentSlot].id === 'bottom')this.elem.addClass('active');

      this.prevAngle = this.slots[this.previousSlot].angle;
       this.tween = new TWEEN.Tween($.extend(true,{angle2:0},this.slots[this.previousSlot]))
        .to($.extend(true,{angle2:90},this.slots[this.currentSlot]), 800)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function(){
            self.currentSlotElem.angle = self.prevAngle + this.angle2;
            self.currentSlotElem.size = this.size;
            self.draw();
        }).start();

    };
    Item.prototype.prev = function(){
        var self = this;
        this.currentSlot--;
        this.previousSlot = this.currentSlot + 1;
        if(this.currentSlot < 0){
            this.currentSlot = this.maxSlot;
        }     

      this.elem.removeClass('active');
      if(this.slots[this.currentSlot].id === 'bottom')this.elem.addClass('active');
       
       this.prevAngle = this.slots[this.previousSlot].angle;
        this.tween = new TWEEN.Tween($.extend(true,{angle2:0},this.slots[this.previousSlot]))
        .to($.extend(true,{angle2:90},this.slots[this.currentSlot]), 800)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function(){
            self.currentSlotElem.angle = self.prevAngle - this.angle2;
            self.currentSlotElem.size = this.size;
            self.draw();
        }).start();

    };
    Item.prototype.draw = function(){
      
        this.angle = this.currentSlotElem.angle * Math.PI / 180;
        this.x = cx + radius * Math.cos(this.angle);
        this.y = cy + radius * Math.sin(this.angle);
        this.elem.css({
          'width':this.size*this.currentSlotElem.size+'px',
          'height':this.size*this.currentSlotElem.size+'px',
          'transform':'translate3d('+(this.x - (this.size * (this.currentSlotElem.size/2)))+'px,'+(this.y - (this.size * (this.currentSlotElem.size/2)))+'px,0px)'
        });
    };
    var matchmaker = new Item({
        slots:[slots.bottom, slots.left, slots.top, slots.right],
        image:'img/_0004_matchmaker-icon.png',
        elem:elem.mm
        
    }),
    lessons = new Item({
        slots:[slots.top, slots.right, slots.bottom, slots.left],
        image:'img/_0003_lessons-icon.png',
        elem:elem.ls
        
    }),
    quizzes = new Item({
        slots:[slots.left, slots.top, slots.right, slots.bottom],
        image:'img/_0002_quiz-icon.png',
        elem:elem.qz
    }),
    mywines = new Item({
        slots:[slots.right, slots.bottom, slots.left, slots.top],
        image:'img/_0002_quiz-icon.png',
        elem:elem.mw
       
    }),
    items = [matchmaker, lessons, quizzes, mywines];
   
    // orb center
    var drawOrbCenter = function(){
    var angle = slots.bottom.angle * Math.PI / 180,
        x = cx + radius * Math.cos(angle),
        y = cy + radius * Math.sin(angle);
      orbcenter.css({
        'width':_size+'px',
        'height':_size+'px',
        'transform':'translate3d('+(x - (_size * (slots.bottom.size/2)))+'px,'+(y - (_size * (slots.bottom.size/2)))+'px,0px) scale3d(1.1,1.1,1.1)'
      });
    };


    this.next = function(){
      for(var i = 0, len = items.length; i < len; i ++){
          items[i].next();
      };
    };
    this.prev = function(){
      for(var i = 0, len = items.length; i < len; i ++){
          items[i].prev();
      };
    };

   /* window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();*/

  function animate() {
    _requestAnim =  requestAnimationFrame(animate);
    TWEEN.update();
  };

  this.stop = function(){
    if(_requestAnim){
      window.cancelAnimationFrame(_requestAnim);
    }
  };

  this.start = function(){
    animate();
  };

  drawOrbCenter();
  this.start();

  return this;
};












