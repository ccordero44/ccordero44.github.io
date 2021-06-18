var size = [1075,837]; 
$( window ).load( function(){

var dpi_x = $('.container img').width;
var dpi_y = $('.container img').height;

window.resizeTo(size[0],size[1]);
});
$(window).resize(function(){
    window.resizeTo(size[0],size[1]);
});
$(document).ready(function () {
	$('.container').on("contextmenu",function(){
       return false;
    }); 
	$(document).on('keyup','textarea', function() {
		if ($(this).parent().hasClass('sign') || $(this).parent().hasClass('lbl')) {
		$('.draggable').draggable({containment: '.container'});
		$('.rotator').rotatable({ snap: true });
		};
		});	
    var _intervalId;
    
    $(document).on('click', 'div[id^=trafficLight]', function(e){
		//console.log($(this).find('#trafficLight1'));
	
	/*   function fadeInLastImg()
    {*/
        var backImg = $('#'+$(this).attr('id')+' svg:first');
		
        backImg.hide();
        backImg.remove();
		
		
		var handleImg = $('#'+$(this).attr('id')+' div.ui-rotatable-handle.ui-draggable');
		//var handleImg = $(this).next().find('.ui-rotatable-handle .ui-draggable');
	
		//handleImg.remove();
		
        $('.container #'+$(this).attr('id')+':first' ).append( backImg );
		handleImg.css('position','relative');
		 $(this).append( handleImg );
		backImg.css("z-index","999");
	
		$( ".rotator" ).rotatable();
		backImg.show();
		$('#'+$(this).attr('id')+' image:not(:first)').hide();
		$('#'+$(this).attr('id')+' image:first').show();
		
/*     };
        
    _intervalId = setInterval( function() {
        fadeInLastImg();
    }, 5000 ); */
		
    });
        

	
$('#column1').mouseover(function(){
       $('#column2').show();
		$(this).hide();
    });
	$('#column1').mouseout(function(){
       $('#column2').hide();
    
    }, function() {
		$('#column2').mouseover(function(){
			$(this).show();
			$('#column1').hide();
		});
		$('#column2').mouseout(function(){
			$(this).hide();
			$('#column1').show();
		});
	});
$(function(){
  $( ".draggable" ).draggable({
	containment: '.container',
  start: function() {

  },
  drag: function() {

  },
  stop: function() {

  }
});
});


$(function(){
$('.rotator').rotatable({
	// specify an angle in radians (for backward compatability)
  angle: false,       

  // specify angle in degrees
  degrees: false,     

  // an image to use for a handle
  handle: false,      

   // where the handle should appear
  handleOffset: {    
    top: 0,
    left: 0
  },

  // specify angle in radians
  radians: false,           

  // offset the center of the element for rotation
  rotationCenterOffset: {   
    top: 0,
    left: 0
  },

  // should the element snap to a certain rotation?
  snap: true,              

  // angle in degrees that the rotation should be snapped to
  step: 22.5,                  

  // other transforms to performed on the element
  transforms: null,   

  // should the element rotate when the mousewheel is rotated?
  wheelRotate: true,   

  // a callback for during rotation
  rotate: function(event, ui) {
	  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
  },  

  // callback when rotation starts
  start: function(event, ui) {
	  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
	
  },  

  // callback when rotation stops
  stop: function(event, ui) {
	 $('body').css('cursor', "default");
  },  

});
});

$("#addIV").click(function(){
			if (jQuery("span", this).hasClass('minus')) {
				$('#IV').hide()
				$(this).html('<span class="plus"></span><span class="underline">Add</span>');
			}else{
				$('#IV').show()
				$(this).html('<span class="minus"></span><span class="underline">Remove</span>');
			};	
            
        });
$("#addCV").click(function(){
			
				$('.container').append($('<div class="rotator draggable" id="CV'+($('div[id^=CV]').length+1)+'"><svg width="124.31500000000003" height="124.31500000000003" >  <image   width="124.31500000000003" height="124.31500000000003" href="files/images/vehicle2.png" ></image></svg></div>'));
				$( ".draggable" ).draggable({
					containment: '.container',
				  start: function() {

				  },
				  drag: function() {

				  },
				  stop: function() {

				  }
				});
				$('.rotator').rotatable({
				  angle: false,
				  degrees: false,
				  handle: false,      
				  handleOffset: {    
					top: 0,
					left: 0
				  },
				  radians: false,           
				  rotationCenterOffset: {   
					top: 0,
					left: 0
				  },
				  snap: true,              
				  step: 22.5,                  
				  transforms: null,   
				  wheelRotate: true,   
				  rotate: function(event, ui) {
					  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
				  },  

				  // callback when rotation starts
				  start: function(event, ui) {
					  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
					
				  },  

				  // callback when rotation stops
				  stop: function(event, ui) {
					 $('body').css('cursor', "default");
				  },    

				});
				$('div[id^=CV]').show();
				$('#removeCV').show();
				//$(this).text('Remove CV');
			
            
        });
	$('#removeCV').click(function() {
		
				let num = $('div[id^=CV]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#CV'+num).remove();
			
	});
	$('#stopSign').click(function() {
		$('.container').append($('<div class="rotatorIcons draggableIcons" id="stopSign'+($('div[id^=stopSign]').length+1)+'"><svg width="50" height="50" >  <image   width="50" height="50" href="files/images/stop.png" ></image></svg></div>'));
		$('div[id^=stopSign]').show();
		$('#removeSS').show();
		$('.draggableIcons').draggable({containment: '.container'});
		$('.rotatorIcons').rotatable({
				snap: true,
				rotate: function(event, ui) {
				  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
			  },  

			  // callback when rotation starts
			  start: function(event, ui) {
				  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
				
			  },  

			  // callback when rotation stops
			  stop: function(event, ui) {
				 $('body').css('cursor', "default");
			  },  
			});
	});
	$('#removeSS').click(function() {
		
				let num = $('div[id^=stopSign]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#stopSign'+num).remove();
			
	});
	$('#trafficLight').click(function() {
		$('.container').append($('<div title="Click to change light color" class="rotatorIcons draggableIcons" id="trafficLight'+($('div[id^=trafficLight]').length+1)+'"><svg width="50" height="50" >  <image   width="50" height="50" href="files/images/light.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/red_light.png" ></image></svg><svg width="50" height="50" ><image style="display:none;z-index:900"  width="50" height="50" href="files/images/yellow_light.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/green_light.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/green_turn.png" ></image></svg></div>'));
		$('div[id^=trafficLight]').show();
		$('#removeTL').show();
		$('.draggableIcons').draggable({containment: '.container'});
		$('.rotatorIcons').rotatable({
				snap: true,
				rotate: function(event, ui) {
				  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
			  },  

			  // callback when rotation starts
			  start: function(event, ui) {
				  $('body').css('cursor', 'url( "files/images/repeat.svg" ) 5 15, pointer');
				
			  },  

			  // callback when rotation stops
			  stop: function(event, ui) {
				 $('body').css('cursor', "default");
			  },  
			});
	});
	$('#removeTL').click(function() {
		
				let num = $('div[id^=trafficLight]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#trafficLight'+num).remove();
			
	});
	$('#addbangIcon').click(function() {
		$('.container').append($('<div class="draggableIcons icons" id="bangIcon'+($('div[id^=bangIcon]').length+1)+'"><svg width="25" height="25" >  <image   width="25" height="25" href="files/images/bang.png" ></image></svg></div>'));
		$('div[id^=bangIcon]').show();
		$('#removebangIcon').show();
		$('.draggableIcons').draggable({containment: '.container',});
		
	});
	$('#removebangIcon').click(function() {
		
				let num = $('div[id^=bangIcon]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#bangIcon'+num).remove();
			
	});
	$('#speedLimitAdd').click(function() {
		$('.container').append($('<div id="speedLimitIcon'+($('div[id^=speedLimitIcon]').length+1)+'" class="draggableIcons rotatorIcons"><div class="speed-limit-wrapper"><div class="speed-limit visible"><div class="limit-label">SPEED<br>LIMIT</div><div contenteditable title="Left click to change Speed Limit" class="limit-text">45</div></div></div></div>'));
		$('div[id^=speedLimitIcon]').show();
		$('#speedLimitRemove').show();
		$('.draggableIcons').draggable({containment: '.container',cancel:'[contenteditable]'});
		$('.rotatorIcons').rotatable({ snap: true });
		
	});
	$('#speedLimitRemove').click(function() {
		
				let num = $('div[id^=speedLimitIcon]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#speedLimitIcon'+num).remove();
			
	});
	$('#stickyAdd').click(function() {
		$('.container').append($('<div id="stickyIcon'+($('div[id^=stickyIcon]').length+1)+'" class="draggableIcons"><div class="sticky">  <b>Note:</b> <span contenteditable onclick="document.execCommand("selectAll",false,null)">Type note text here.</span></div></div>'));
		$('div[id^=stickyIcon]').show();
		$('#stickyRemove').show();
		$('.draggableIcons').draggable({containment: '.container',cancel:'[contenteditable]'});
		
	});
	$('#stickyRemove').click(function() {
		
				let num = $('div[id^=stickyIcon]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#stickyIcon'+num).remove();
			
	});
//jQuery(function($){

	
var textover_api;
$('#addLabel').on('click', streetLabel);
	function streetLabel () {
		
	//$('#addLabel').click(function() {
		if (jQuery("span", this).hasClass('minus')) {
				$(this).html('<span class="plus"></span><span class="underline">Enable</span>');
				$('#container').StreetLbl('off');
			}else{
				$(this).html('<span class="minus"></span><span class="underline">Disable</span>');
				$('#container').StreetLbl({}, function() {
					textover_api = this;
				});	
				html = '';
				$.each(textover_api.getData(), function() {
				html += 'Text &raquo; ' + this.text + ' Left &raquo; ' + this.left + ' Top &raquo; ' + this.top + '<br />';
				});
				$('#data').html(html).show();
				
				
				 var removeLabel = document.getElementById('removeLabel');
				if(removeLabel) removeLabel.addEventListener('click', function(e){
					var arr = $('.sign');
					let num = arr.length;
								if (num == 0) {
									$(this).hide();
								};
				});
			};	
	};		
	//});
	
	
		
	$('#removeLabel').click(function() {
		
		
		removeTextArea($('.sign').length-1);

	});
//});

//jQuery(function($){

var textover_api;
$('#addLabel2').on('click', textLabel);
	function textLabel () {
	//$('#addLabel2').click(function() {

		if (jQuery("span", this).hasClass('minus')) {
				$(this).html('<span class="plus"></span><span class="underline">Enable</span>');
				$('#container').TextOver('off');
			}else{
				$(this).html('<span class="minus"></span><span class="underline">Disable</span>');
				$('#container').TextOver({}, function() {
					textover_api = this;
				});	
				html = '';
				$.each(textover_api.getDataText(), function() {
				html += 'Text &raquo; ' + this.text + ' Left &raquo; ' + this.left + ' Top &raquo; ' + this.top + '<br />';
				});
				$('#data').html(html).show();
				
				
				 var removeLabel2 = document.getElementById('removeLabel2');
				if(removeLabel2) removeLabel2.addEventListener('click', function(e){
					var arr = $('.lbl');
					let num = arr.length;
								if (num == 0) {
									$(this).hide();
								};
				});
			};	
				
	//});
};
$('#diagram').mousemove(function() {
		
		var arr1 = $('.sign');
		let num1 = arr1.length;
					if (num1 > 0) {
						$('#removeLabel').show();
					};
		
		var arr2 = $('.lbl');
		let num2 = arr2.length;
					if (num2 > 0) {
						$('#removeLabel2').show();
					};
		});	
		
	$('#removeLabel2').click(function() {
		removeTextAreaText($('.lbl').length-1);
		
	});
//});
$('p[id^="addLabel"]').mouseup(function (e) {

	if (!jQuery("span", this).hasClass('minus')) {
		if (this.id == "addLabel") {
			$('#addLabel2').html('<span class="minus"></span><span class="underline">Disable</span>');
			$('#addLabel2').trigger('click');
		}else{
			$('#addLabel').html('<span class="minus"></span><span class="underline">Disable</span>');
			$('#addLabel').trigger('click');
		};

	};
});
//REPLACE 'container' WITH THE ID OF ELEMENT WHERE TO DRAW ARROWS
var elm_container = document.querySelector('#container');
 
//Draw arrows with SVG in the $parent element between the click coords
function drawArrowSVG(parent){
 
  var me = this;
  var x, y = 0;  //contain the coordinates
  var drawarrow =0;  //if 2, draw the arrow
  var c_e1 ={};  // x,y coords for base line
  var c_e2 ={};  // x,y coords for arrow
  var container = parent;
  me.draw =-1;  //if 1 allow to draw the arrow

  // Get X and Y position of the elm (from: vishalsays.wordpress.com)
  function getXYpos(elm) {
    x = elm.offsetLeft;        // set x to elm’s offsetLeft
    y = elm.offsetTop;         // set y to elm’s offsetTop

    elm = elm.offsetParent;    // set elm to its offsetParent

    //use while loop to check if elm is null
    // if not then add current elm’s offsetLeft to x
    //offsetTop to y and set elm to its offsetParent
    while(elm != null) {
      x = parseInt(x) + parseInt(elm.offsetLeft);
      y = parseInt(y) + parseInt(elm.offsetTop);
      elm = elm.offsetParent;
	
    }

    // returns an object with "xp" (Left), "=yp" (Top) position
    return {'xp':x, 'yp':y};
  }

  // Get X, Y coords
  function getCoords(e){
	
    //if $draw is 1, get the coords and draw arrow
    if(me.draw ==1){
      var xy_pos = getXYpos(this);
	
      // if IE
      if(navigator.appVersion.indexOf("MSIE") != -1) {
        // in IE scrolling page affects mouse coordinates into an element
        // This gets the page element that will be used to add scrolling value to correct mouse coords
        var standardBody = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

        x = event.clientX + standardBody.scrollLeft;
        y = event.clientY + standardBody.scrollTop;
      }
      else {
        x = e.pageX;
        y = e.pageY;
		
      }

      x = x - xy_pos['xp'];
      y = y - xy_pos['yp'];

      //set coords in c_e2 and c_e1; if drawarrow is 2 draw the arrow
      drawarrow++;
      if(drawarrow ==2){
        c_e2 = {x:x, y:y};
        drawarrow =0;
        drawArrow(c_e1, c_e2);
      }
      else c_e1 = {x:x, y:y};
    }
	
  }

  //append in #container SVG arrow with base in $c_e1 and the arrow in $c_e2 coords
  function drawArrow(c_e1, c_e2){
    var arrsvg = $('<svg class="arrsvg" style="position:absolute; top:0; left:0; margin:0; "><defs><marker id="arrow" markerWidth="8" markerHeight="8" refx="3" refy="4" orient="auto"><path d="M1,1 L1,7 L7,4 L1,1" style="fill:red;" /></marker></defs><path d="M'+ c_e1.x +','+ c_e1.y +' L'+ c_e2.x +','+ c_e2.y +'" style="stroke:red; stroke-width: 2.3px; fill: none; marker-end: url('+ location.href.replace(/[#]*$/ig, '') +'#arrow);"/></svg>');
    //container.insertAdjacentHTML('beforeend', arrsvg);  //add the arrow to the end in #container
  $(container).append(arrsvg);
  //$(container).click(function() {
var arrsvg1 = $('.arrsvg');
 	let num = arrsvg1.length;
	let numPath = $('.arrsvg path').length - 1;
				if (num > 0) {
					
					$('#btn_delar').show();
					var svg = arrsvg[0];//document.getElementsByTagName("svg")[numPath];
					console.log(svg);
					var bbox = svg.getBBox();
			svg.setAttribute("viewBox", (bbox.x-10)+" "+(bbox.y-10)+" "+(bbox.width+20)+" "+(bbox.height+20));
			svg.setAttribute("width", (bbox.width+20)  + "px");
			svg.setAttribute("height",(bbox.height+20) + "px");
			$(svg).css({top:bbox.y+'px',left:bbox.x+'px'});
					//$(arrsvg).css({width:$('.arrsvg path')[numPath].getBBox().width+8,height:$('.arrsvg path')[numPath].getBBox().height+16,top:$('.arrsvg path')[numPath].getBBox().y+'px',left:$('.arrsvg path')[numPath].getBBox().x+'px'});
					//console.log($('.arrsvg path').eq(numPath).attr('d'));
				
  //});
  }
  }
  //register click on $container to get the coords
  container.addEventListener('click', getCoords);
  
}

//draw arrow with SVG between the clicks coords in $elm_container
var drawAr = new drawArrowSVG(elm_container);

//register click on #btn_drawar to enable /disable drawing action
var btn_drawar = document.getElementById('btn_drawar');
if(btn_drawar) btn_drawar.addEventListener('click', function(e){
  drawAr.draw *=-1;
  var className = (drawAr.draw ==1) ? 'minus' :'plus';
	if (className == 'minus') {

		e.target.previousSibling.classList.add(className);
		e.target.previousSibling.classList.remove('plus');
	}else {
		e.target.previousSibling.classList.remove('minus');
		e.target.previousSibling.classList.add(className);
	};
  e.target.innerHTML = (drawAr.draw ==1) ? 'Disable' :'Enable';
  
});

//register click on #btn_delar to delete arrows
var btn_delar = document.getElementById('btn_delar');
if(btn_delar) btn_delar.addEventListener('click', function(e){
  var arrsvg = document.querySelectorAll('.arrsvg');
  var i = arrsvg.length-1;
   arrsvg[i].outerHTML ='';
	let num = arrsvg.length;
				if (num == 1) {
					$(this).hide();
				};
});

$('#intersectionDropdown').ddslick({
    data: ddData,
    width: 200,
    imagePosition: "left",
    selectText: "Select a diagram",
    onSelected: function (data) {
		if (data.selectedData.value == 7 || data.selectedData.value == 12) {
		   var styles = {
			  bottom :0,
			  top: "auto",
			  marginLeft: "0px"
			};
			
			$('.dropdown').css(styles);
	   }else if (data.selectedData.value == 9 || data.selectedData.value == 10 ) {
		    var styles = {
			  marginLeft: "500px"
			};
			$('.dropdown').css(styles);
	   }else{
		    var styles = {
			  bottom : "auto",
			  top: 0,
			  marginLeft: "0px"
			};
		    $('.dropdown').css(styles);
		};
		if (data.selectedData.value == 6 || data.selectedData.value == 13) {
			var styles = {
				marginTop: "25px",
				left: "885px"
			};
			$('#compass').css(styles);
		}else if (data.selectedData.value == 8 || data.selectedData.value == 11) {
			var styles = {
				marginTop: "630px",
				left: "25px"
			};
			$('#compass').css(styles);
		}else{
			 var styles = {
				 marginTop: "630px",
				 left: "885px"
			 };
			 $('#compass').css(styles);
			};
	
		
	   $('.container img').attr('src',data.selectedData.imageSrc);
	   $('#column1').show();
	   $('#compass').show();
	   
    }
});

var maxHeight = 600;

$(function(){

    $(".dropdown > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,       // make sure there is enough room at the bottom
             multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        // need to save height here so it can revert on mouseout            
        $container.data("origHeight", $container.height());
        
        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");
        
        // make sure dropdown appears directly below parent list item    
        $list
            .show()
            .css({
               // paddingTop: $container.data("origHeight")
            });
        
        // don't do any animation if list shorter than max
        if (multiplier > 1) {
			
            $container
                .css({
                    height: maxHeight,
                    overflow: "hidden"
                })
                .mousemove(function(e) {
                    var offset = $container.offset();
                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                    if (relativeY > $container.data("origHeight")) {
                        $list.css("top", -relativeY + $container.data("origHeight"));
                    };
					
                });
        }
        
    }, function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height(100)
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });
    

    
});

});


var ddData = [
    {
        text: "Four Way",
        value: 1,
        selected: false,
        description: "Two left turn",
        imageSrc: "files/images/intersection3.png"
    },
	{
        text: "Four Way",
        value: 4,
        selected: false,
        description: "Two left turn",
        imageSrc: "files/images/intersection4.png"
    },
    {
        text: "Four Way",
        value: 2,
        selected: false,
        description: "All left turn",
        imageSrc: "files/images/intersection2.png"
    },
/*    {
        text: "Intersection 3",
        value: 3,
        selected: false,
        description: "Intersection 3",
        imageSrc: "files/images/intersection3.png"
    },*/
	{
        text: "Four Way",
        value: 5,
        selected: false,
        description: "All through lanes",
        imageSrc: "files/images/intersection5.png"
    },
	{
        text: "Three Way",
        value: 6,
        selected: false,
        description: "All through lanes",
        imageSrc: "files/images/intersection6.png"
    },
	{
        text: "Three Way",
        value: 7,
        selected: false,
        description: "All through lanes",
        imageSrc: "files/images/intersection7.png"
    },
	{
        text: "Three Way",
        value: 8,
        selected: false,
        description: "All through lanes",
        imageSrc: "files/images/intersection8.png"
    },
	{
        text: "Three Way",
        value: 9,
        selected: false,
        description: "All through lanes",
        imageSrc: "files/images/intersection9.png"
    },
	{
        text: "Three Way",
        value: 10,
        selected: false,
        description: "One left turn",
        imageSrc: "files/images/intersection10.png"
    },
	{
        text: "Three Way",
        value: 11,
        selected: false,
        description: "One left turn",
        imageSrc: "files/images/intersection11.png"
    },
	{
        text: "Three Way",
        value: 12,
        selected: false,
        description: "One left turn",
        imageSrc: "files/images/intersection12.png"
    },
	{
        text: "Three Way",
        value: 13,
        selected: false,
        description: "One left turn",
        imageSrc: "files/images/intersection13.png"
    }
];


