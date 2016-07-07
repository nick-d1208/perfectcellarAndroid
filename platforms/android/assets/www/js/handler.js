
var handlerController = (function(){
	"use strict";
	var settings = {},
		API = 'http://www.perfcellapi.vitaminlabs.co.uk/',
		LOGIN = 'logIn.php',
		GETINFO = 'getUInfo.php',
		LOGOUT = 'logOut.php',
		FORGOTPASSWORD = 'forgotPasswd.php',
		CONTENT = 'http://www.perfectcellar.com/pages/e2-98-15-d5-f7-ed-3a-9f-c7-4b';

	settings.content = function(params,success,fail){
		if(typeof(params)!=='object'){ debug&&console.error('Params are undefined!'); return false; };
		var ajaxData = {url:CONTENT+objectToAjaxParameters({time:new moment().unix()})};
		debug&&console.log(ajaxData);
		getContent(ajaxData,success,fail);
	};

	settings.getinfo = function(params,success,fail){
		if(typeof(params)!=='object'){ debug&&console.error('Params are undefined!'); return false; };
		var ajaxData = {url:GETINFO,data:params};
		debug&&console.log(ajaxData);
		post(ajaxData,success,fail);
	};

	settings.forgotpassword = function(params,success,fail){
		if(typeof(params)!=='object'){ debug&&console.error('Params are undefined!'); return false; };
		var ajaxData = {url:FORGOTPASSWORD,data:params};
		debug&&console.log(ajaxData);
		post(ajaxData,success,fail);
	};

	settings.login = function(params,success,fail){
		if(typeof(params)!=='object'){ debug&&console.error('Params are undefined!'); return false; };
		var ajaxData = {url:LOGIN,data:params};
		debug&&console.log(ajaxData);
		post(ajaxData,success,fail);
	};

	settings.logout = function(params,success,fail){
		if(typeof(params)!=='object'){ debug&&console.error('Params are undefined!'); return false; };
		var ajaxData = {url:LOGOUT,data:params};
		debug&&console.log(ajaxData);
		post(ajaxData,success,fail);
	};

	function post(params,success,fail){
		$.ajax({
	      url:API + params.url + (typeof(params.ajaxParams)!=='undefined' ? params.ajaxParams : ''),
	      type: "POST",
	      headers:{
	        // token
	      },
	      dataType:params.dataType || 'json',
	      data:JSON.stringify(params.data),
	      success: function(response){
	        try{
	          var obj;

	          if(typeof(response)==='object'){
	            obj = response;
	          }else{
	            response = JSON.stringify(response);
	            obj = JSON.parse(response);
	          }
	          
	          if(typeof(success)==='function')success(obj);
	        }catch(e){
	          debug&&console.log('FAILED TO PARSE OBJECT, ERROR: ' + e);
	        }
	      },
	      complete:function(response){
	      },
	      error: function(xhr, statusText , err) { 

	        if(xhr.status >= 400){
	          if(typeof(fail)==='function')fail(xhr.responseText);
	          return;
	        }
	        if(typeof(fail)==='function')fail(xhr.responseText);
	        debug&&console.log('GENERIC ERROR: ' + xhr.status + ' ' + statusText + ' ' + err + ' ' + xhr.responseText );
	      }
	    }); 
	};

	function getContent(params,success,fail){

		$.ajax({
	      url:params.url,
	      type: "GET",
	      success: function(response){
	      	
	        var data = {
	            yotpo: '',
	            quizzes: [],
	            lessons: [],
	            wines: []
	          };
	          
	        try 
	        {
	            var div = document.createElement('div');
	            div.innerHTML = response;
	            var scripts = div.getElementsByTagName('script');
	            var i = scripts.length;
	            while (i--) 
	            {
	              scripts[i].parentNode.removeChild(scripts[i]);
	            }
	            
	            var $html = $(div.innerHTML);
	  
	            var $quizzes = $html.find('#quizzes');
	            var $lessons = $html.find('#lessons');
	            var $wines = $html.find('#wines');
	            var $ratings = $html.find('#wines-ratings');
	            
	            $quizzes.find('>div').each(function ()
	            {
	              var $thisQuiz = $(this);
	              var idx = Number($thisQuiz.attr('quiz'))-1;
	              var name = $thisQuiz.attr('name');
	              var img = $thisQuiz.attr('img');
	              
	              var quiz = {
	                index: idx,
	                name: name,
	                img: img,
	                questions: []
	              };
	              
	              $thisQuiz.find('strong').each(function (questionIdx)
	              {
	                var question = $.trim($(this).text());
	                var answers = [];
	                var indexOfCorrentAnswer = 0;
	                
	                $thisQuiz.find('ul').eq(questionIdx).find('li').each(function (answerIdx)
	                {
	                  if ($(this).find('a').length) indexOfCorrentAnswer = answerIdx;
	                  answers.push($.trim($(this).text()));
	                });

	                quiz.questions.push({
	                  q: question,
	                  a: answers,
	                  c: indexOfCorrentAnswer
	                });            
	              });
	              
	              data.quizzes.push(quiz);
	            });
	            
	            data.quizzes.sort(function(a,b) 
	            {
	              return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);
	            }); 
	            
	            $lessons.find('>div').each(function ()
	            {
	              var $thisSet = $(this);
	              var idx = Number($thisSet.attr('set'))-1;
	              var lessons = [];
	              $thisSet.find('>div').each(function ()
	              {
	                var lesson = {
	                  set : idx,
	                  index : Number($(this).attr('lesson'))-1,
	                  title : $(this).find('>.title').text(),
	                  subtitle : $(this).find('>.subtitle').text(),
	                  imgs : {
	                    top : $(this).find('>.top-image').text(),
	                    middle : $(this).find('>.middle-image').text()
	                  },
	                  videos: {
	                    top: $(this).find('>.top-video').text(),
	                    bottom: $(this).find('>.bottom-video').text()
	                  },
	                  parts : []
	                };
	                
	                $(this).find('>.part').each(function ()
	                {
	                  var part = {
	                    name: 'part ' + $(this).attr('number'),
	                    index: Number($(this).attr('index'))-1,
	                    icon: $(this).find('>.icon').text(),
	                    title: $(this).find('>.title').text(),
	                    subtitle: $(this).find('>.subtitle').text(),
	                    img: $(this).find('>.img').text(),
	                    p:[]
	                  };
	                  
	                  $(this).find('>.p').each(function ()
	                  {
	                    part.p.push($(this).html());
	                  });
	                  
	                  lesson.parts.push(part);
	                });
	                lesson.parts.sort(function(a,b) 
	                {
	                  return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);
	                });
	                lessons.push(lesson);
	              });
	              lessons.sort(function(a,b) 
	              {
	                return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);
	              }); 
	              data.lessons.push(lessons);
	            });
	            
	            data.lessons.sort(function(a,b) 
	            {
	              return (a[0].set > b[0].set) ? 1 : ((b[0].set > a[0].set) ? -1 : 0);
	            }); 
	            
	            $wines.find('>[set]').each(function ()
	            {
	              var $thisSet = $(this);
	              var idx = Number($thisSet.attr('set'))-1;
	              var wines = [];
	              $thisSet.find('>div').each(function ()
	              {
	                var windex = Number($(this).attr('wine'));
	                var wine = {
	                  price: $(this).find('>.price').text(),
	                  purl: $(this).attr('url'),
	                  variant: $(this).attr('vid'),
	                  set : idx,
	                  index : windex-1,
	                  title : $(this).find('>.title').text(),
	                  subtitle : $(this).find('>.subtitle').text(),
	                  img : $(this).find('>.top-image').text(),
	                  sections : [],
	                  video: $(this).find('>.bottom-video').text(),
	                  pimg: $(this).find('>.pimage').text(),
	                  rating: $ratings.find('[set="'+(idx+1)+'"][wine="'+windex+'"]').html()
	                };
	                
	                $(this).find('>[section]').each(function ()
	                {
	                  var section = {
	                    index: Number($(this).attr('section'))-1,
	                    title: $(this).find('>.title').text(),
	                    img: $(this).find('>.image').text(),
	                    p:[],
	                    video: $(this).find('>.video').text()
	                  };
	                  
	                  $(this).find('>.p').each(function ()
	                  {
	                    section.p.push($(this).html());
	                  });
	                  
	                  wine.sections.push(section);
	                });
	                wine.sections.sort(function(a,b) 
	                {
	                  return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);
	                });
	                wines.push(wine);
	              });
	              wines.sort(function(a,b) 
	              {
	                return (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0);
	              }); 
	              data.wines.push(wines);
	            });
	            
	            data.wines.sort(function(a,b) 
	            {
	              return (a[0].set > b[0].set) ? 1 : ((b[0].set > a[0].set) ? -1 : 0);
	            }); 
	            
	            data.discount = {
	              value: Number($wines.find('>.discount-value').text()),
	              text: $wines.find('>.discount-text').text()
	            };
	            
	            data.yotpo = $ratings.attr('url');

	        } 
	        catch (err) 
	        {
	           data = null;
	           debug&&console.log('FAILED, ERROR: ' + err);
	           return false;
	        }

	          if(typeof(success)==='function')success(data);
	       
	      },
	      complete:function(response){
	      	
	      },
	      error: function(xhr, statusText , err) {

	        if(xhr.status >= 400){
	          if(typeof(fail)==='function')fail(xhr.responseText);
	          return;
	        }
	        if(typeof(fail)==='function')fail(xhr.responseText);
	        debug&&console.log('GENERIC ERROR: ' + xhr.status + ' ' + statusText + ' ' + err + ' ' + xhr.responseText );
	      }
	    });
	};

	return settings;
}());