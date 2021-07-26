var size = [1097,940]; 
var rows = 50;
var columns = 50;
var ele;
 var currentZoom = 1.0;
 var gridNum;
 var disabledSquare;
var $row = $("<div />", {
    class: 'row'
});
var $square = $("<div />", {
    class: 'square',
	title: 'Hold shift and double click to toggle tile background color.'
});
$( window ).load( function(){

var dpi_x = $('.container img').width;
var dpi_y = $('.container img').height;

window.resizeTo(size[0],size[1]);
});

$(document).ready(function () {

$(window).resize(function(){
    window.resizeTo(size[0],size[1]);
	init($('.new-tile'));
});
	//add columns to the the temp row object
    for (var i = 0; i < columns; i++) {
        $row.append($square.clone());
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < rows; i++) {
        $("#gridwrapper").append($row.clone());
    }
gridNum = $('.square')[0].getBoundingClientRect().height;

   var trashFull;

		$('#trash').droppable({
								   accept: ".trashable",
                                   drop : function ( event , img ) {
                                          var $element = img.draggable;
                                       
                                          $element.detach();
										  $(this).removeClass('trash-full');
										  setTimeout(
											  function() 
											  {
											trashFull = false;
											  }, 1);
										  
                                   },
								   over: function ( event, ui ) {
								   $(this).addClass('trash-full');
								   trashFull = true;
								   },
								   out: function (event, ui) {
								   $(this).removeClass('trash-full');
								   trashFull = false;
								   },
                            });
	$('.container').on("contextmenu",function(){
       return false;
    }); 
	$('#container').css('width',$('.row').eq(0).height() * rows);
	$('#container').css('height',$('.row').eq(0).height() * rows);
	$('#container').css('left', $('#container').width() / -2);
	$('#container').css('top', $('#container').height() / -2);
$('.square').each(function () {
		if ($(this).visible( true )) {
			$(this).droppable(dropOptions);
		}else if ($(this).hasClass('ui-droppable')) {
			$(this).droppable("destroy");
		};
	});
	$(document).on('keyup','textarea', function() {
		if ($(this).parent().hasClass('sign') || $(this).parent().hasClass('lbl')) {
		$('.draggable').not('div[id^="house"]').not('div[id^="building"]').draggable({containment: '.container'});
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
        
$(document).on('click', 'div[id^=PS]', function(e){

        var backImg = $('#'+$(this).attr('id')+' svg:first');
		
        backImg.hide();
        backImg.remove();
		
		
		var handleImg = $('#'+$(this).attr('id')+' div.ui-rotatable-handle.ui-draggable');

		
        $('.container #'+$(this).attr('id')+':first' ).append( backImg );
		handleImg.css('position','relative');
		 $(this).append( handleImg );
		backImg.css("z-index","999");
	
		$( ".rotator" ).rotatable();
		backImg.show();
		$('#'+$(this).attr('id')+' image:not(:first)').hide();
		$('#'+$(this).attr('id')+' image:first').show();
		

		
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
  $( ".draggable" ).not('div[id^="house"]').not('div[id^="building"]').draggable({
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

	$('#addIV-hatchback').click(function() {
			IV("hatchback", 238, 116);
	});
	$('#addIV-sedan').click(function() {
			IV("sedan", 289, 125);
	});
	$('#addIV-wagon').click(function() {
			IV("wagon", 279, 119);
	});
	$('#addIV-van').click(function() {
			IV("van", 316, 149);
	});
	$('#addIV-pickup').click(function() {
			IV("pickup", 323, 138);
	});
	$('#addIV-moto').click(function() {
			IV("motorcycle", 132, 50);
	});
	$('#addIV-bike').click(function() {
			IV("bike", 124, 38);
	});
	$('#addIV-semi').click(function() {
			IV("semi", 542, 176);
	});
	$('#addIV-bus').click(function() {
			IV("bus", 737, 179);
	});
	$('#addIV-ped').click(function() {
			IV("pedestrian", 70, 70);
	});
	$('#addCV-hatchback').click(function() {
			CV("hatchback", 238, 116);
	});
	$('#addCV-sedan').click(function() {
			CV("sedan", 289, 125);
	});
	$('#addCV-wagon').click(function() {
			CV("wagon", 279, 119);
	});
	$('#addCV-van').click(function() {
			CV("van", 316, 149);
	});
	$('#addCV-pickup').click(function() {
			CV("pickup", 323, 138);
	});
	$('#addCV-moto').click(function() {
			CV("motorcycle", 132, 50);
	});
	$('#addCV-bike').click(function() {
			CV("bike", 124, 38);
	});
	$('#addCV-semi').click(function() {
			CV("semi", 542, 176);
	});
	$('#addCV-bus').click(function() {
			CV("bus", 737, 179);
	});
	$('#addCV-ped').click(function() {
			CV("pedestrian", 70, 70);
	});
	$('#addOther-police').click(function() {
			otherVeh("police", 289, 129);
	});
	$('#addOther-ambulance').click(function() {
			otherVeh("ambulance", 368, 179);
	});
	$('#addOther-fire').click(function() {
			otherVeh("fire", 620, 209);
	});
	$('#stopSign').click(function() {
		trafficControls('stopSign', 'stop', 50, 50);
	});
	$('#addYield').click(function() {
		trafficControls('yield', 'yield', 50, 50);
	});
	$('#addPC').click(function() {
		trafficControls('PC', 'ped-cross', 50, 50);
	});
	$('#addNLT').click(function() {
		trafficControls('NLT', 'no-left', 50, 50);
	});
	$('#addOWL').click(function() {
		trafficControls('OWL', 'one-left', 50, 100);
	});
	$('#addOWR').click(function() {
		trafficControls('OWR', 'one-right', 50, 100);
	});
	$('#addNoU').click(function() {
		trafficControls('noU', 'no-U', 50, 50);
	});
	$('#addNTOR').click(function() {
		trafficControls('noTurn', 'no-turn', 50, 50);
	});
	$('#addNoPark').click(function() {
		trafficControls('noPark', 'no-park', 50, 50);
	});
	$('#addNRT').click(function() {
		trafficControls('NRT', 'no-right', 50, 50);
	});
	$('#addBuilding').click(function() {
		diagIcons('building', 'building', 450, 450);
	});
	$('#addHouse').click(function() {
		diagIcons('house', 'house2', 350, 350);
	});
	$('#addDNE').click(function() {
		trafficControls('DNE', 'DNE', 50, 50);
	});
	$('#trafficLight').click(function() {
		var ele = $('<div title="Click to change light color" class="trashable rotatorIcons draggableIcons" id="trafficLight'+($('div[id^=trafficLight]').length+1)+'"><svg width="50" height="50" >  <image   width="50" height="50" href="files/images/light.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/red_light.png" ></image></svg><svg width="50" height="50" ><image style="display:none;z-index:900"  width="50" height="50" href="files/images/yellow_light.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/green_light.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/green_turn.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=trafficLight]').show();
		$('.draggableIcons').draggable({
			containment: '.container',
			start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
			});
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
	$('#addPS').click(function() {
		var ele = $('<div title="Click to change light color" class="trashable rotatorIcons draggableIcons" id="PS'+($('div[id^=PS]').length+1)+'"><svg width="50" height="50" >  <image   width="50" height="50" href="files/images/ped-signal.png" ></image></svg><svg width="50" height="50" ><image  style="display:none;z-index:900" width="50" height="50" href="files/images/ped-signal-stop.png" ></image></svg><svg width="50" height="50" ><image style="display:none;z-index:900"  width="50" height="50" href="files/images/ped-signal-go.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=PS]').show();
		$('.draggableIcons').draggable({
			containment: '.container',
			start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
			});
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
	$('#addbangIcon').click(function() {
		trafficControls('bangIcon', 'bang', 25, 25, false);
		$('div[id^=bangIcon]').removeClass('rotatorIcons');
	});
	$('#speedLimitAdd').click(function() {
		var ele = $('<div id="speedLimitIcon'+($('div[id^=speedLimitIcon]').length+1)+'" class="trashable draggableIcons rotatorIcons"><div class="speed-limit-wrapper"><div class="speed-limit visible"><div class="limit-label">SPEED<br>LIMIT</div><div contenteditable="true" onclick="selectAllText()" title="Click to change Speed Limit" class="limit-text">45</div></div></div></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=speedLimitIcon]').show();
		$('#speedLimitRemove').show();
		$('.draggableIcons').draggable({
			containment: '.container',
			start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
			cancel:'[contenteditable]'});
		$('.rotatorIcons').rotatable({ snap: true });
		
	});

	$('#stickyAdd').click(function() {
		var ele = $('<div id="stickyIcon'+($('div[id^=stickyIcon]').length+1)+'" class="trashable draggableIcons"><div class="sticky">  <b>Note:</b> <span contenteditable onclick="document.execCommand("selectAll",false,null)">Type note text here.</span></div></div>');
		$('#gridwrapper').append(ele);
		ele.center()
		$('div[id^=stickyIcon]').show();
		$('#stickyRemove').show();
		$('.draggableIcons').draggable({
			containment: '.container',
			start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
			cancel:'[contenteditable]'});
		
	});
	$('#stickyRemove').click(function() {
				let num = $('div[id^=stickyIcon]').length;
				if (num == 1) {
					$(this).hide();
				};
				$('#stickyIcon'+num).remove();
	});
	$('#addCW').click(function() {
		var ele = $('<div style="z-index:800" class=" trashable" id="CW1'+($('div[id^=CW1]').length+1)+'"><svg width="180" height="180" >  <image   width="180" height="180" href="files/images/cross-walk-3.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=CW1]').css('position','absolute');
		$('div[id^=CW1]').show();
	var newGrid = parseInt(gridNum/2);
	$('div[id^=CW1]').draggable({
			handle: 'svg',
			snap: '.square',
			appendTo: "#gridwrapper",
			cursor: "move",
			hoverClass: "highlight",
	start: function(event, ui) {
	   ui.position.left = 0;
       ui.position.top = 0;
    },
    drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft /  currentZoom; // adjust new left by our zoomScale
        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale
        ui.position.left = newLeft;
        ui.position.top = newTop;
    },
	stop: function (ev, ui) {
		//$('#gridwrapper').css({ transform: 'scale('+currentZoom+')' });
	},
	revert: function (obj) {
				if (!obj) {
					$(event['target']).addClass('above');
					$(event['target']).css('z-index','888');
					}else{
					$(event['target']).removeClass('above');
				};
	},
	});
	$('div[id^=CW1]').rotatable({
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
	  step: 90,                  

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
	$('#addCW2').click(function() {
		var ele = $('<div style="z-index:800" class=" trashable" id="CW2'+($('div[id^=CW2]').length+1)+'"><svg width="180" height="90" >  <image   width="180" height="90" href="files/images/cross-walk-4.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=CW2]').css('position','absolute');
		$('div[id^=CW2]').show();
	var newGrid = parseInt(gridNum/2);
	$('div[id^=CW2]').draggable({
			handle: 'svg',
			//snap: '.square',
			//snapTolerance: 22.5,
			//snapMode: "inner",
			appendTo: "#gridwrapper",
			cursor: "move",
			hoverClass: "highlight",
	start: function(event, ui) {
	   ui.position.left = 0;
       ui.position.top = 0;
    },
    drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft /  currentZoom; // adjust new left by our zoomScale
        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale
        ui.position.left = newLeft;
        ui.position.top = newTop;
    },
	stop: function (ev, ui) {
		//$('#gridwrapper').css({ transform: 'scale('+currentZoom+')' });
	},
	revert: function (obj) {
				if (!obj) {
					$(event['target']).addClass('above');
					$(event['target']).css('z-index','888');
					}else{
					$(event['target']).removeClass('above');
				};
	},
	});
	$('div[id^=CW2]').rotatable({
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
	  step: 90,                  

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
	$('#addLT').click(function() {
		var ele = $('<div style="z-index:800" class=" trashable" id="LT1'+($('div[id^=LT1]').length+1)+'"><svg width="360" height="180" >  <image   width="360" height="180" href="files/images/left-turn-1.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=LT1]').css('position','absolute');
		$('div[id^=LT1]').show();
	var newGrid = parseInt(gridNum/2);
	$('div[id^=LT1]').draggable({
			//grid: [45, 45],
			//snapTolerance: 45,
			//handle: 'svg',
			snap: '.square',
			appendTo: "#gridwrapper",
			cursor: "move",
			hoverClass: "highlight",
	start: function(event, ui) {
	   ui.position.left = 0;
       ui.position.top = 0;
	},
    drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft /  currentZoom; // adjust new left by our zoomScale
        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale
        ui.position.left = newLeft;
        ui.position.top = newTop;
    },
	stop: function (ev, ui) {
		//$('#gridwrapper').css({ transform: 'scale('+currentZoom+')' });
	},
	revert: function (obj) {
				if (!obj) {
					
					$(event['target']).addClass('above');
					$(event['target']).css('z-index','888');
					}else{
					$(event['target']).removeClass('above');
				};
	},
			});
	$('div[id^=LT1]').rotatable({
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
	  step: 180,                  

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
$('#addLT2').click(function() {
		var ele = $('<div style="z-index:800" class=" trashable" id="LT2'+($('div[id^=LT2]').length+1)+'"><svg width="180" height="360" >  <image   width="180" height="360" href="files/images/left-turn-3.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center();
		$('div[id^=LT2]').css('position','absolute');
		$('div[id^=LT2]').show();
	var newGrid = parseInt(gridNum/2);
	$('div[id^=LT2]').draggable({
			//grid: [45, 45],
			//snapTolerance: 45,
			//handle: 'svg',
			snap: '.square',
			appendTo: "#gridwrapper",
			cursor: "move",
			hoverClass: "highlight",
	start: function(event, ui) {
	   ui.position.left = 0;
       ui.position.top = 0;
	},
    drag: function(event, ui) {
        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft /  currentZoom; // adjust new left by our zoomScale
        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale
        ui.position.left = newLeft;
        ui.position.top = newTop;
    },
	stop: function (ev, ui) {
		//$('#gridwrapper').css({ transform: 'scale('+currentZoom+')' });
	},
	revert: function (obj) {
				if (!obj) {
					
					$(event['target']).addClass('above');
					$(event['target']).css('z-index','888');
					}else{
					$(event['target']).removeClass('above');
				};
	},
			});
	$('div[id^=LT2]').rotatable({
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
	  step: 180,                  

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
var textover_api;
$('#addLabel').on('click', streetLabel);
	function streetLabel () {
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
	
	
	
		
	$('#removeLabel').click(function() {
		removeTextArea($('.sign').length-1);
	});


$('#addLabel2').on('click', textLabel);
	function textLabel () {
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
				

};
$('#gridwrapper').mousemove(function() {
		
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
var elm_container = document.querySelector('#gridwrapper');
 
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
    var arrsvg = $('<svg  class="arrsvg" style="position:absolute; top:0; left:0; margin:0; "><title>Click to change arrow color</title><defs><marker id="arrow'+$('.arrsvg').length+'" markerWidth="8" markerHeight="8" refx="3" refy="4" orient="auto"><path d="M1,1 L1,7 L7,4 L1,1" style="fill:red;" /></marker></defs><path d="M'+ c_e1.x +','+ c_e1.y +' L'+ c_e2.x +','+ c_e2.y +'" style="stroke:red; stroke-width: 2.3px; fill: none; marker-end: url('+ location.href.replace(/[#]*$/ig, '') +'#arrow'+$('.arrsvg').length+');"/></svg>');
    //container.insertAdjacentHTML('beforeend', arrsvg);  //add the arrow to the end in #container
  $(container).append(arrsvg);
  /*$(arrsvg).draggable({
	  start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
  });*/
 $(arrsvg).click(function(e){
	 var $this = $(e.target);

	if ($this.children('path').css('stroke') === 'rgb(255, 0, 0)') {
	$this.children('path').css('stroke', 'rgb(0, 0, 255)');
	$this.children('defs').children('marker').children('path').css('fill','rgb(0, 0, 255)');
	
	}else{
	$this.children('path').css('stroke', 'rgb(255, 0, 0)'); 
	$this.children('defs').children('marker').children('path').css('fill','rgb(255, 0, 0)');
	};
  });

var arrsvg1 = $('.arrsvg');
 	let num = arrsvg1.length;
	let numPath = $('.arrsvg path').length - 1;
				if (num > 0) {
					
					$('#btn_delar').show();
					var svg = arrsvg[0];//document.getElementsByTagName("svg")[numPath];
					
					var bbox = svg.getBBox();
			svg.setAttribute("viewBox", (bbox.x-10)+" "+(bbox.y-10)+" "+(bbox.width+20)+" "+(bbox.height+20));
			svg.setAttribute("width", (bbox.width+20)  + "px");
			svg.setAttribute("height",(bbox.height+20) + "px");
			$(svg).css({top:bbox.y+'px',left:bbox.x+'px'});

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
$('#up').click(function (){
	var top = $('#gridwrapper').css('top');
	$('#gridwrapper').css('top',parseInt(top)+45+'px');
});
$('#down').click(function (){
	var top = $('#gridwrapper').css('top');
	$('#gridwrapper').css('top',parseInt(top)-45+'px');
});
$('#left').click(function (){
	var left = $('#gridwrapper').css('left');
	$('#gridwrapper').css('left',parseInt(left)+45+'px');
});
$('#right').click(function (){
	var left = $('#gridwrapper').css('left');
	$('#gridwrapper').css('left',parseInt(left)-45+'px');
});
$('#intersectionDropdown').ddslick({
    data: ddData,
    width: 250,
	truncateDescription: true,
    imagePosition: "right",
    selectText: "Make a Selection",
    onSelected: function (data) {
		
		ele = $('<div class="new-tile trashable" title="Drag and drop tiles anywhere on the grid."><svg width="'+data.selectedData.width+'" height="'+data.selectedData.height+'"><image href="'+data.selectedData.imageSrc+'" width="'+data.selectedData.width+'" height="'+data.selectedData.height+'" cursor="move"></image></svg></div>');
		 let floater = $(ele)[0];
		 $('#wrapper').append(ele);
		 //ele.find('svg').css('z-index',$('.new-tile').length);
		 ele.find('svg').css('z-index',1);
		var width = data.selectedData.width;
		var height = data.selectedData.height;
		const onMouseMove = (e) =>{
							
			$('.ui-droppable').each(function(){
				$(this).removeClass('highlight');	
			});
			highlightElem(width, height);
			
		  floater.style.left = e.pageX + 5 + 'px';
		  floater.style.top = e.pageY + 5 + 'px';
		  floater.style.display = 'block';
		  floater.style.position = 'absolute';
		  $(floater).hide();
		  
		};
		document.addEventListener('mousemove', onMouseMove);
		const onMouseUp = (e) =>{
			var width = data.selectedData.width;
			var height = data.selectedData.height;
			disableElem(e.target, width, height);
			$('.square').removeClass('highlight');	
			init(floater);
			document.removeEventListener('mousedown', onMouseClick);
			$('.square').unbind('mouseenter');
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('mousemove', onMouseMove);
		};
		const onMouseClick = (e) =>{
			document.removeEventListener('mouseup', onMouseUp);
			if ($(e.target).hasClass('square')) {

			document.removeEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
			floater.style.display = 'contents';
			floater.style.position = 'relative';
			if ($(e.target).hasClass('ui-droppable')) {
				$(e.target).append(floater);
				disabledSquare = $(e.target);
			};
			}else{
				$(floater).remove();
				floater = '';
				document.removeEventListener('mousedown', onMouseClick);
				document.removeEventListener('mousemove', onMouseMove);
				$('.square').unbind('mouseenter');
			};
		};
		document.addEventListener('mousedown', onMouseClick);
	 $('#column1').show();
	 $('#rotateMode').show();
	   $('#compass').show();
	   $('#trash').show();
	   $('.zoom-control').show();
	  // $('.scale-vis-control').show();
	   var $el = $(".dropdown > li");
        
        // put things back to normal
        $el
            .height(100)
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
			
    }
	
});


var maxHeight = 800;
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
              //  paddingTop: $container.data("origHeight")
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
    

var dropOptions = {
		accept: ".new-tile",
		greedy: true,
		//hoverClass: "highlight",
		drop: function(event, ui) {
		var ele = ui.draggable.clone(false);
		var width = $(ui.helper).find('image').width();
		var height = $(ui.helper).find('image').height()
		ui.draggable.detach();
		  $this = this;
		 $(event['target']).droppable('disable');
		 $('.disabled').each(function () {
				if ($(this).visible( true )) $(this).droppable('disable');
			});
		 $(ele).addClass('trashable');
		 $(ele).removeClass('dd-selected-image');
			if (!trashFull) {$(ele).appendTo(document.elementFromPoint(event.pageX, event.pageY))};
		$( this ).addClass( "ui-state-highlight" );
		$(ui.helper).remove();
		$(ele).draggable(dragOptions);
		disableElem(event.target, width, height);
							
		  },
		activate: function (event, ui) {
		//	$(event['target']).not('.above').css('z-index','0');
		//$('.ui-droppable').not(ele.parent()).find('svg').removeClass('above');
		},
	};  
var dragOptions = {
		snap: '.square',
		snapTolerance: 5,
		//appendTo: "#gridwrapper",
		cursor: "move",
			start: function(ev, ui) { 
			var width = $(ui.helper).find('image').width();
			var height = $(ui.helper).find('image').height()
			enableElem(ev.target, width, height);
					$('.ui-droppable').each(function(i, el) {
					  if (!$(el).find('.ui-draggable').length) $(el).droppable('enable');
					});
			$('.disabled').each(function () {
				if ($(this).visible( true )) $(this).droppable('disable');
			});
			//$('.disabled').droppable('disable');
				$(this).draggable('instance').offset.click = {
					left: Math.floor(ui.helper.width() / 2),
					top: Math.floor(ui.helper.height() / 2)
				};
		  },
		  drag: function ( event, ui) {
			  $('.ui-droppable').removeClass('highlight');
				var width = $(ui.helper).find('image').width();
				var height = $(ui.helper).find('image').height()
												
					highlightElem(width, height);
					
				},
		  stop: function (ev, ui) {
			  var width = $(ui.helper).find('image').width();
			var height = $(ui.helper).find('image').height()
			  disableElem(event.target, width, height);
			$('.disabled').each(function () {
				if ($(this).visible( true )) $(this).droppable('disable');
			});	
		$('.ui-droppable').removeClass('highlight');
		  },
		  //revert: true,
	};	
function init(elem) {
	$(elem).draggable(dragOptions);
	$('.square').each(function () {
		if ($(this).visible( true )) {
			$(this).droppable(dropOptions);
		}else if ($(this).hasClass('ui-droppable')) {
			$(this).droppable("destroy");
		};
	});
	if (disabledSquare && disabledSquare.hasClass('ui-droppable')) {
		disabledSquare.droppable('disable');
	}
}	



$('#gridwrapper').draggable({
	grid: [ 10, 10 ],
	cancel:'[contenteditable]',
	start: function ( event, ui ) {},
	drag: function ( event, ui ) {
		init($('.new-tile'));
	},
	stop: function ( event, ui ) {},
	});
$('div.square').dblclick( function () {
	if (event.shiftKey) {
        $(this).toggleClass('cement');
    }
	
});
$('.zoom-button').eq(0).click(function () {
	if ($('.zoom-bar + .active').index() !== -1) {
	zoomOut(.1);
	let $ele = $('.active');
	let num = $('.active').index()-1;
	$('.zoom-bar').eq(num-1).addClass('active');
	$ele.removeClass('active');
	};
	if (parseInt($('.scale-vis-control-label').html()) < 19) {
		//$('.scale-vis-control-label').html((parseInt($('.scale-vis-control-label').html())+1)+" ft");
		$('.scale-vis-control-label').html(Math.ceil(13/currentZoom)+ " ft");
	};
});
$('.zoom-button').eq(1).click(function () {
	if ($('.active').index() !== 6) {
	zoomIn(.1);
	let $ele = $('.active');
	let num = $('.active').index();
	$ele.removeClass('active');
	$('.zoom-bar').eq(num).addClass('active');
	};
	if (parseInt($('.scale-vis-control-label').html()) > 11) {
		//$('.scale-vis-control-label').html((parseInt($('.scale-vis-control-label').html())-1)+" ft");
		$('.scale-vis-control-label').html(Math.ceil(13/currentZoom)+ " ft");
	};
});

$('.zoom-bar').click(function () {
	for (let i = 0;i<$(this).index();i++) {
		if ($(this).index() === 1) {
			$('#gridwrapper').css({ transform: 'scale(.7)' });
			currentZoom = .7;
			$('.scale-vis-control-label').html('19 ft');
		};
		if ($(this).index() === 2) {
			$('#gridwrapper').css({ transform: 'scale(.8)' });
			currentZoom = .8;
			$('.scale-vis-control-label').html('17 ft');
		};
		if ($(this).index() === 3) {
			$('#gridwrapper').css({ transform: 'scale(.9)' });
			currentZoom = .9;
			$('.scale-vis-control-label').html('15 ft');
		};
		if ($(this).index() === 4) {
			$('#gridwrapper').css({ transform: 'scale(1)' });
			currentZoom = 1;
			$('.scale-vis-control-label').html('14 ft');
		};
		if ($(this).index() === 5) {
			$('#gridwrapper').css({ transform: 'scale(1.1)' });
			currentZoom = 1.1;
			$('.scale-vis-control-label').html('12 ft');
		};
		if ($(this).index() === 6) {
			$('#gridwrapper').css({ transform: 'scale(1.2)' });
			currentZoom = 1.2;
			$('.scale-vis-control-label').html('11 ft');
		};
	};
	$('.zoom-bar').removeClass('active');
	$(this).addClass('active');
	gridNum = $('.square')[0].getBoundingClientRect().height;
	init($('.new-tile'));
});
function zoomOut(int) {
	$('#gridwrapper').css({ transform: 'scale('+(currentZoom -=int)+')' });
	gridNum = $('.square')[0].getBoundingClientRect().height;
	init($('.new-tile'));
}
function zoomIn(int) {
	$('#gridwrapper').css({ transform: 'scale('+(currentZoom +=int)+')' });
	gridNum = $('.square')[0].getBoundingClientRect().height;
	init($('.new-tile'));
}

$(".titlebar-inactive").on('click', handlerShow);

}); /*end of document ready*/


function highlightElem(w, h) {
var el = document.elementFromPoint(event.pageX, event.pageY);	

	for (var i = 0;i<w/180;i++) {
		$('.row').eq($(el).parent('.row').index()).children('.square').eq($(el).index()).addClass('highlight');
		for (var j = 1;j<h/180;j++) {
			$('.row').eq($(el).parent('.row').index()+j).children('.square').eq($(el).index()).addClass('highlight');
			$('.row').eq($(el).parent('.row').index()).children('.square').eq($(el).index()+i).addClass('highlight');
		};			
	};
	for (var i = 0;i<h/180;i++) {
		for (var j = 1;j<w/180;j++) {
			$('.row').eq($(el).parent('.row').index()+i).children('.square').eq($(el).index()).addClass('highlight');
			$('.row').eq($(el).parent('.row').index()+i).children('.square').eq($(el).index()+j).addClass('highlight');		
		};			
	
	};
	
};
function disableElem(elem, w, h) {
	var el = document.elementFromPoint(event.pageX, event.pageY);	
	for (var i = 0;i<w/180;i++) {
		$('.row').eq($(el).parent().parent().parent().parent('.row').index()).children('.square').eq($(el).parent().parent().parent().index()).addClass('disabled');
		for (var j = 1;j<h/180;j++) {
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()+j).children('.square').eq($(el).parent().parent().parent().index()).addClass('disabled');
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()).children('.square').eq($(el).parent().parent().parent().index()+i).addClass('disabled');
		};			
	};
	for (var i = 0;i<h/180;i++) {
		for (var j = 1;j<w/180;j++) {
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()+i).children('.square').eq($(el).parent().parent().parent().index()).addClass('disabled');
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()+i).children('.square').eq($(el).parent().parent().parent().index()+j).addClass('disabled');
		};			
	
	};
};
function enableElem(elem, w, h) {
	var el = document.elementFromPoint(event.pageX, event.pageY);	
	for (var i = 0;i<w/180;i++) {
		$('.row').eq($(el).parent().parent().parent().parent('.row').index()).children('.square').eq($(el).parent().parent().parent().index()).removeClass('disabled');
		for (var j = 1;j<h/180;j++) {
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()+j).children('.square').eq($(el).parent().parent().parent().index()).removeClass('disabled');
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()).children('.square').eq($(el).parent().parent().parent().index()+i).removeClass('disabled');
		};			
	};
	for (var i = 0;i<h/180;i++) {
		for (var j = 1;j<w/180;j++) {
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()+i).children('.square').eq($(el).parent().parent().parent().index()).removeClass('disabled');
			$('.row').eq($(el).parent().parent().parent().parent('.row').index()+i).children('.square').eq($(el).parent().parent().parent().index()+j).removeClass('disabled');
		};			
	
	};
};
function handlerShow() {
	$(".AccordionArrow").hide();
	$(".title-bar-body").hide();
	$(".titlebar-inactive").removeClass("titlebar-active");
	$(this).addClass("titlebar-active");
	$(".AccordionArrow").eq($(this).index("h3")).show();
	$(".title-bar-body").eq($(this).index("h3")).show();	
	//$(this).one("click", handlerHide);
}
function handlerHide() {
	//$(".AccordionArrow").eq($(this).index("h3")).hide();
	//$(".title-bar-body").eq($(this).index("h3")).hide();	
	$(this).removeClass("titlebar-active");
	$(this).one("click", handlerShow);
}
function otherVeh(veh, h, w) {
	var vehImage = $('<div style="width: '+w/2+'px;height: '+h/2+'px" class="rotator draggable trashable" id="IV'+($('div[id^=IV]').length+1)+'"><svg width="'+w/2+'" height="'+h/2+'"><image href="files/images/vehicles/'+veh+'/'+veh+'.png"></image></svg></div>');
	var svg = $(vehImage).find('svg'), 
	img = $(vehImage).find('image');
	$('#gridwrapper').append(vehImage);
	vehImage.center();
	//$(svg).width(w/2);
	$(img).width(w/2);
		$('div[id^=IV]').show();
		$('.draggable').not('div[id^="house"]').not('div[id^="building"]').draggable({containment: '.container',
		handle: "image",
		start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
		stop: function(e, ui) {
								var perc = ui.position.left / ui.helper.parent().width() * 100;
								var perc2 = ui.position.top / ui.helper.parent().height() * 100;
								ui.helper.css('left', perc + '%');
								
								ui.helper.css('top', perc2 + '%');
							  }
  });
		$('.rotator').rotatable({
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
}
function IV(veh, h, w) {
	var vehImage = $('<div style="width: '+w/2+'px;height: '+h/2+'px" class="rotator draggable trashable" id="IV'+($('div[id^=IV]').length+1)+'"><svg width="'+w/2+'" height="'+h/2+'"><image href="files/images/vehicles/'+veh+'/blue.png"></image></svg></div>');
	var svg = $(vehImage).find('svg'), 
	img = $(vehImage).find('image');
	$('#gridwrapper').append(vehImage);
	vehImage.center();
	//$(svg).width(w/2);
	$(img).width(w/2);
		$('div[id^=IV]').show();
		$('.draggable').not('div[id^="house"]').not('div[id^="building"]').draggable({containment: '.container',
		handle: "image",
		start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
		stop: function(e, ui) {
								var perc = ui.position.left / ui.helper.parent().width() * 100;
								var perc2 = ui.position.top / ui.helper.parent().height() * 100;
								ui.helper.css('left', perc + '%');
								
								ui.helper.css('top', perc2 + '%');
							  }
  });
		$('.rotator').rotatable({
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
}
function CV(veh, h, w) {
	var vehImage = $('<div style="width: '+w/2+'px;height: '+h/2+'px" class="rotator draggable trashable" id="CV'+($('div[id^=CV]').length+1)+'"><svg width="'+w/2+'" height="'+h/2+'"><image href="files/images/vehicles/'+veh+'/red.png"></image></svg></div>');
	var svg = $(vehImage).find('svg'), 
	img = $(vehImage).find('image');
	$('#gridwrapper').append(vehImage);
	vehImage.center();
	//$(svg).width(w/2);
	$(img).width(w/2);
		$('div[id^=CV]').show();
		$('.draggable').not('div[id^="house"]').not('div[id^="building"]').draggable({containment: '.container',
		handle: "image",
		start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
		stop: function(e, ui) {
								var perc = ui.position.left / ui.helper.parent().width() * 100;
								var perc2 = ui.position.top / ui.helper.parent().height() * 100;
								ui.helper.css('left', perc + '%');
								
								ui.helper.css('top', perc2 + '%');
							  }
  });
		$('.rotator').rotatable({
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
};
function trafficControls(id, img, h, w, boolean = true) {
	var ele = $('<div class="rotatorIcons draggableIcons trashable" id="'+id+($('div[id^='+id+']').length+1)+'"><svg width="'+w+'" height="'+h+'" >  <image   width="'+w+'" height="'+h+'" href="files/images/'+img+'.png" ></image></svg></div>')
		$('#gridwrapper').append(ele);
		ele.center()
		$('div[id^='+id+']').show();
		$('.draggableIcons').draggable({
			containment: '.container',
			start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },
			});
	if (boolean) {
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
	};
};
function diagIcons(id, img, h, w) {
	var ele = $('<div class="rotator draggable trashable" id="'+id+($('div[id^='+id+']').length+1)+'"><svg width="'+w+'" height="'+h+'" >  <image   width="'+w+'" height="'+h+'" href="files/images/'+img+'.png" ></image></svg></div>');
		$('#gridwrapper').append(ele);
		ele.center()
		$('div[id^='+id+']').show();
		$('.draggable').draggable({start: function(event, ui) {
        ui.position.left = 0;
        ui.position.top = 0;
    },
    drag: function(event, ui) {

        var changeLeft = ui.position.left - ui.originalPosition.left; // find change in left
        var newLeft = ui.originalPosition.left + changeLeft / (( currentZoom)); // adjust new left by our zoomScale

        var changeTop = ui.position.top - ui.originalPosition.top; // find change in top
        var newTop = ui.originalPosition.top + changeTop / currentZoom; // adjust new top by our zoomScale

        ui.position.left = newLeft;
        ui.position.top = newTop;

    },});
		$('.rotator').rotatable({
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
};

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()+4500-(parseInt($('#gridwrapper').css('top'))/(currentZoom))) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()+4500-(parseInt($('#gridwrapper').css('left'))/(currentZoom))) + "px");
    return this;
};
function selectAllText() {
	document.execCommand('selectAll',false,null);
}
var ddData = [
    {
        text: "Roadway 1",
        selected: false,
        description: "Horizontal 2 Lane",
        imageSrc: "files/images/road-1.png",
		height: "180",
		width: "180"

    },
	{
        text: "Roadway 2",
        selected: false,
        description: "Vertical 2 Lane",
        imageSrc: "files/images/road-2.png",
		height: "180",
		width: "180"
    },
    {
        text: "Roadway 3",
        selected: false,
        description: "Horizontal 4 Lane",
        imageSrc: "files/images/road-3.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 4",
        selected: false,
        description: "Vertical 4 Lane",
        imageSrc: "files/images/road-4.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 5",
        selected: false,
        description: "Horizontal 1 Lane",
        imageSrc: "files/images/road-5.png",
		height: "180",
		width: "180"
    },
	{
        text: "Roadway 6",
        selected: false,
        description: "Vertical 1 Lane",
        imageSrc: "files/images/road-6.png",
		height: "180",
		width: "180"
    },
	{
        text: "Roadway 7",
        selected: false,
        description: "Curved 2 Lane<br>Up Right",
        imageSrc: "files/images/road-curve-1.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 8",
        selected: false,
        description: "Curved 2 Lane<br>Up Left",
        imageSrc: "files/images/road-curve-2.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 9",
        selected: false,
        description: "Curved 2 Lane<br>Down Right",
        imageSrc: "files/images/road-curve-3.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 10",
        selected: false,
        description: "Curved 2 Lane<br>Down Left",
        imageSrc: "files/images/road-curve-4.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 11",
        selected: false,
        description: "Curved 2 Lane<br>Right Two North",
        imageSrc: "files/images/road-curve-5.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 12",
        selected: false,
        description: "Curved 2 Lane<br>Left Two North",
        imageSrc: "files/images/road-curve-6.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 13",
        selected: false,
        description: "Curved 2 Lane<br>Right Two South",
        imageSrc: "files/images/road-curve-7.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 14",
        selected: false,
        description: "Curved 2 Lane<br>Left Two South",
        imageSrc: "files/images/road-curve-8.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 15",
        selected: false,
        description: "Curved 2 Lane<br>Right Two West",
        imageSrc: "files/images/road-curve-9.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 16",
        selected: false,
        description: "Curved 2 Lane<br>Left Two East",
        imageSrc: "files/images/road-curve-10.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 17",
        selected: false,
        description: "Curved 2 Lane<br>Left Two West",
        imageSrc: "files/images/road-curve-11.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 18",
        selected: false,
        description: "Curved 2 Lane<br>Right Two East",
        imageSrc: "files/images/road-curve-12.png",
		height: "360",
		width: "360"
    },
	
	{
        text: "Roadway 19",
        selected: false,
        description: "Curved 1 Lane<br>Upward Right",
        imageSrc: "files/images/road-curve-13.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 20",
        selected: false,
        description: "Curved 1 Lane<br>Upward Left",
        imageSrc: "files/images/road-curve-14.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 21",
        selected: false,
        description: "Curved 1 Lane<br>Downward Right",
        imageSrc: "files/images/road-curve-15.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 22",
        selected: false,
        description: "Curved 1 Lane<br>Downward Left",
        imageSrc: "files/images/road-curve-16.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 23",
        selected: false,
        description: "Curved 2 Lane<br>One East",
        imageSrc: "files/images/road-curve-17.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 24",
        selected: false,
        description: "Curved 2 Lane<br>One West",
        imageSrc: "files/images/road-curve-18.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 25",
        selected: false,
        description: "Curved 2 Lane<br>One East",
        imageSrc: "files/images/road-curve-19.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 26",
        selected: false,
        description: "Curved 2 Lane<br>One West",
        imageSrc: "files/images/road-curve-20.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 27",
        selected: false,
        description: "Curved 2 Lane<br>One South",
        imageSrc: "files/images/road-curve-21.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 28",
        selected: false,
        description: "Curved 2 Lane<br>One South",
        imageSrc: "files/images/road-curve-22.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 29",
        selected: false,
        description: "Curved 2 Lane<br>One North",
        imageSrc: "files/images/road-curve-23.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 30",
        selected: false,
        description: "Curved 2 Lane<br>One North",
        imageSrc: "files/images/road-curve-24.png",
		height: "360",
		width: "360"
    },
	{
        text: "Roadway 31",
        selected: false,
        description: "Angled 1 Lane<br>South East",
        imageSrc: "files/images/road-angle-1.png",
		height: "360",
		width: "180"
    },
	{
        text: "Roadway 32",
        selected: false,
        description: "Angled 1 Lane<br>North East",
        imageSrc: "files/images/road-angle-2.png",
		height: "360",
		width: "180"
    },
	{
        text: "Roadway 33",
        selected: false,
        description: "Angled 1 Lane<br>South East",
        imageSrc: "files/images/road-angle-3.png",
		height: "180",
		width: "360"
    },
	{
        text: "Roadway 34",
        selected: false,
        description: "Angled 1 Lane<br>North East",
        imageSrc: "files/images/road-angle-4.png",
		height: "180",
		width: "360"
    },
	{
        text: "Intersection 1",
        selected: false,
        description: "Two Lane T<br>Down",
        imageSrc: "files/images/intersection-1.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 2",
        selected: false,
        description: "Two Lane T<br>Up",
        imageSrc: "files/images/intersection-2.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 3",
        selected: false,
        description: "Two Lane T<br>Right",
        imageSrc: "files/images/intersection-3.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 4",
        selected: false,
        description: "Two Lane T<br>Left",
        imageSrc: "files/images/intersection-4.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 5",
        selected: false,
        description: "Two Lane Cross",
        imageSrc: "files/images/intersection-5.png",
		height: "540",
		width: "540"
    },
	{
        text: "Intersection 6",
        selected: false,
        description: "Two Lane Roundabout",
        imageSrc: "files/images/intersection-6.png",
		height: "540",
		width: "540"
    },
	{
        text: "Intersection 7",
        selected: false,
        description: "Four Lane Cross",
        imageSrc: "files/images/intersection-7.png",
		height: "720",
		width: "720"
    },
	{
        text: "Intersection 8",
        selected: false,
        description: "Two Horizontal<br>One Vertical Down",
        imageSrc: "files/images/intersection-8.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 9",
        selected: false,
        description: "Two Horizontal<br>One Vertical Up",
        imageSrc: "files/images/intersection-9.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 10",
        selected: false,
        description: "Two Vertical<br>One Horizontal Right",
        imageSrc: "files/images/intersection-10.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 11",
        selected: false,
        description: "Two Vertical<br>One Horizontal Left",
        imageSrc: "files/images/intersection-11.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 12",
        selected: false,
        description: "Two Horizontal<br>Two Angled Up Right",
        imageSrc: "files/images/intersection-12.png",
		height: "540",
		width: "900"
    },
	{
        text: "Intersection 13",
        selected: false,
        description: "Two Horizontal<br>Two Angled Up Left",
        imageSrc: "files/images/intersection-13.png",
		height: "540",
		width: "900"
    },
	{
        text: "Intersection 14",
        selected: false,
        description: "Two Horizontal<br>Two Angled Down Right",
        imageSrc: "files/images/intersection-14.png",
		height: "540",
		width: "900"
    },
	{
        text: "Intersection 15",
        selected: false,
        description: "Two Horizontal<br>Two Angled Down Left",
        imageSrc: "files/images/intersection-15.png",
		height: "540",
		width: "900"
    },
	{
        text: "Intersection 16",
        selected: false,
        description: "Two Vertical<br>Two Angled Down Right",
        imageSrc: "files/images/intersection-16.png",
		height: "900",
		width: "540"
    },
	{
        text: "Intersection 17",
        selected: false,
        description: "Two Vertical<br>Two Angled Down Left",
        imageSrc: "files/images/intersection-17.png",
		height: "900",
		width: "540"
    },
	{
        text: "Intersection 18",
        selected: false,
        description: "Two Vertical<br>Two Angled Up Right",
        imageSrc: "files/images/intersection-18.png",
		height: "900",
		width: "540"
    },
	{
        text: "Intersection 19",
        selected: false,
        description: "Two Vertical<br>Two Angled Up Left",
        imageSrc: "files/images/intersection-19.png",
		height: "900",
		width: "540"
    },
	{
        text: "Intersection 20",
        selected: false,
        description: "Two Vertical<br>One Angled Up Left",
        imageSrc: "files/images/intersection-20.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 21",
        selected: false,
        description: "Two Vertical<br>One Angled Up Right",
        imageSrc: "files/images/intersection-21.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 22",
        selected: false,
        description: "Two Vertical<br>One Angled Down Left",
        imageSrc: "files/images/intersection-22.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 23",
        selected: false,
        description: "Two Vertical<br>One Angled Down Right",
        imageSrc: "files/images/intersection-23.png",
		height: "540",
		width: "360"
    },
	{
        text: "Intersection 24",
        selected: false,
        description: "Two Horizontal<br>One Angled Down Left",
        imageSrc: "files/images/intersection-24.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 25",
        selected: false,
        description: "Two Horizontal<br>One Angled Down Right",
        imageSrc: "files/images/intersection-25.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 26",
        selected: false,
        description: "Two Horizontal<br>One Angled Up Left",
        imageSrc: "files/images/intersection-26.png",
		height: "360",
		width: "540"
    },
	{
        text: "Intersection 27",
        selected: false,
        description: "Two Horizontal<br>One Angled Up Right",
        imageSrc: "files/images/intersection-27.png",
		height: "360",
		width: "540"
    },
	{
        text: "Parking Lot 1",
        selected: false,
        description: "Horizontal Stalls<br>Two Way N & S",
        imageSrc: "files/images/parking-1.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 2",
        selected: false,
        description: "Angled Stalls<br>Two Way N & S",
        imageSrc: "files/images/parking-2.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 3",
        selected: false,
        description: "Angled Stalls<br>One Way South",
        imageSrc: "files/images/parking-3.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 4",
        selected: false,
        description: "Angled Stalls<br>One Way North",
        imageSrc: "files/images/parking-4.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 5",
        selected: false,
        description: "Horizontal Stalls<br>Two Way E & W",
        imageSrc: "files/images/parking-5.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 6",
        selected: false,
        description: "Angled Stalls<br>Two Way E & W",
        imageSrc: "files/images/parking-6.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 7",
        selected: false,
        description: "Angled Stalls<br>One Way West",
        imageSrc: "files/images/parking-7.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 8",
        selected: false,
        description: "Angled Stalls<br>One Way East",
        imageSrc: "files/images/parking-8.png",
		height: "540",
		width: "540"
    },
	{
        text: "Parking Lot 9",
        selected: false,
        description: "Horizontal Stalls<br>Two Way N & S",
        imageSrc: "files/images/parking-9.png",
		height: "180",
		width: "540"
    },
	{
        text: "Parking Lot 10",
        selected: false,
        description: "Angled Stalls<br>Two Way N & S",
        imageSrc: "files/images/parking-10.png",
		height: "180",
		width: "540"
    },
	{
        text: "Parking Lot 11",
        selected: false,
        description: "Angled Stalls<br>One Way South",
        imageSrc: "files/images/parking-11.png",
		height: "180",
		width: "540"
    },
	{
        text: "Parking Lot 12",
        selected: false,
        description: "Vertical Stalls<br>Two Way E & W",
        imageSrc: "files/images/parking-12.png",
		height: "540",
		width: "180"
    },
	{
        text: "Parking Lot 13",
        selected: false,
        description: "Angled Stalls<br>Two Way E & W",
        imageSrc: "files/images/parking-13.png",
		height: "540",
		width: "180"
    },
	{
        text: "Parking Lot 14",
        selected: false,
        description: "Angled Stalls<br>One Way West",
        imageSrc: "files/images/parking-14.png",
		height: "540",
		width: "180"
    },
	{
        text: "Parking Lot 15",
        selected: false,
        description: "Angled Stalls<br>One Way East",
        imageSrc: "files/images/parking-15.png",
		height: "540",
		width: "180"
    }
	
];


