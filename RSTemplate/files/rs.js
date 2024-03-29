/*
	This application was designed and coded by Carlos Cordero for the purpose of streamlining and improving the claims process.

	Contact Information:
	email: ccordero44@gmail.com
	phone: 630-461-7785
	git: https://github.com/ccordero44/ccordero44.github.io
	linkedin: https://www.linkedin.com/in/carloscordero44/
*/
var title = $(document).attr('title');
var timerID;
var docWidth = 0;
var docHeight = 0;
var checkedAll = [];
var hiddenEles = [];
$( window ).load( function(){

   docWidth = 900;
   docHeight = 1200;
});

$(window).bind('resolutionchange', function () {
	//$(this).bind('focus', function (event) {

		window.resizeTo(docWidth, docHeight);

	//});
});
$(document).ready(function () {
document.body.style.zoom = 1.0
document.getElementById('RSgeneral').addEventListener('wheel', event => {
  if (event.ctrlKey) {
    event.preventDefault()
  }
}, true)
display_dt();
$('.company').html("Falcon");
	var version = $('#version').html();
//	$('.OFACDate').each(function(){
	$('.OFACDate').dateRangePicker({
		monthSelect: true,
		yearSelect: [2009, moment().get('year')],
		/*startDate: moment().subtract(120, 'months').format('YYYY-MM-DD'),*/
		endDate: moment().endOf('day').format('YYYY-MM-DD'),
		customArrowPrevSymbol: '<i class="fa fa-arrow-circle-left"></i>',
		customArrowNextSymbol: '<i class="fa fa-arrow-circle-right"></i>'
//});
	});
$('.button').not('#resetButton').click(function(e){
	e.preventDefault();
});
$("input").keypress(function(e) {
  //Enter key
  if (e.which == 13) {
    return false;
  }
});
	$('form').on('submit', function (e) {
		e.preventDefault();
		const form = $(e.target);
		const json = convertFormToJson(form);
		console.log(json);
	});
	$("form").on('reset', function (event) {
		console.time('Reset Time');
		$("#resetButton i").addClass("rotate");
		$(':button').prop('disabled', true);
		$(document).attr('title','Please wait for form to reset...');
		$('input[type="text"]').each(function (index, value) {
			
			$(value).val('');
		});
		$('.VIN').trigger('change');
		$('input').each(function (index, value) {
				$(value).removeClass('banners');
		});
		var arr = $('span');
			for (i = 0; i<arr.length; i++ ) {
				$(arr[i]).removeClass('banners');
			}
			
		setTimeout(function () {
		//var scale = 'scale(1)';
		//document.body.style.zoom = (window.innerWidth / window.outerWidth)
			loadFunctions();
			resetReset();
			title = 'Recorded Statement General';
			$('#docTitle').html('GENERAL');
			$(document).attr('title', title);
			$('#footer').html(title);
			$("#resetButton i").removeClass("rotate");
			window.scrollTo(0, 0);
			var doctitle = document.title;
			document.title = "Form successfully reset!";
			setTimeout(function(){ document.title = title;$(':button').prop('disabled', false); }, 500);
			console.timeEnd('Reset Time');
		}, 1);
		
	});
	

		

		const formId = "RSgeneral"; // ID of the form
		const url = location.href; //  href for the page
		//const formIdentifier = `${formId}`; // Identifier used to identify the form
		//const keyID = $('#ClaimNo').val() + ' ' + $('#RStakenWith').val() + ' ' + $('#Date_of_RS').val() + ' ' + $("input[name='RSNo']:checked").val();
		//const formIdentifier = `${keyID}`; // Identifier used to identify the form
		const saveButton = document.querySelector("#save"); // select save button
		const alertBox = document.querySelector(".alert"); // select alert display div
		let form = document.querySelector(`#${formId}`); // select form
		let formElements = form.elements; // get the elements in the form
		var n = 0;
		  for (const element of formElements) {
			  n = n + 1
			
			if (element.name.length == 0) {
				$(element).attr('name', n);
			}
			if (element.type == 'radio') {
				if (element.value == 'on') {
					 $(element).val(n);
				}
			}
			if (element.type == 'checkbox') {
				if (element.value == 'on') {
					 $(element).val(n);
				}
			}
		  }
		const getFormData = (formIdentifier) => {
		  let data = { [formIdentifier]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
		
		  var nn = 0;
		  for (const element of formElements) {
			  nn = nn + 1
			
			if (element.name.length == 0) {
				$(element).attr('name', 'dynamic_'+nn);
			}
			if (element.name.length > 0) {
				
				if (element.type !== 'radio') {
					data[formIdentifier][element.name] = element.value;
				}
				if (element.type == 'radio') {
					if (element.checked) {
						data[formIdentifier][element.name] = element.value;
					}
				}
				if (element.type == 'checkbox') {
					if (element.checked) {
						data[formIdentifier][element.name] = element.value;
					}else{
						data[formIdentifier][element.name] = "";
						$(element).val(nn);
					}
				}
			}
		 
		  }
		  return data;
		};
	
		const displayAlert = message => {
		  alertBox.innerText = message; // add the message into the alert box
		  alertBox.style.display = "block"; // make the alert box visible
		  setTimeout(function() {
			alertBox.style.display = "none"; // hide the alert box after 1 second
		  }, 2000);
		};
		
		const populateForm = (formIdentifier) => {
		
		  if (localStorage.key(formIdentifier)) {
			 
			const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
			
			var nn = 0;
			for (const element of formElements) {
				
				
				nn = nn + 1;
			if (element.name.length == 0) {
				$(element).attr('name', 'dynamic_'+nn);
			};
			  if (element.name in savedData) {
				
					
				  if (element.type !== 'radio') {
					element.value = savedData[element.name];
					$(element).trigger('input');
				  };
				  if (element.type == 'radio') {
					  if (element.value == savedData[element.name]) {
						element.checked = true;
						$(element).trigger('change');
					  };
				  };
				  if (element.type == 'checkbox') {
					 
					  $(element).val(nn);
					  if (savedData[element.name] !== "") {
					  if (element.value == savedData[element.name]) {
						element.checked = true;
						$(element).trigger('change');
						
					  };
					  }else{
						  element.checked = false;
						  $(element).trigger('change');
					  };
					  
				  };
				  if (element.type == 'number') {
					  $(element).trigger('input');
				  };
					
			  }
			  //$(element).trigger('change');
			}
			
			const message = "Form has been filled with saved data.";
			
			var doctitle = document.title;
			doctitle = doctitle.replace(" - " + message, '');
			$('#footer').html(doctitle + " - " + message);
			//$('#statusTxt').html('done');
			setTimeout(function(){ $('#footer').html(doctitle); }, 2000);
			$('#save').prop('disabled', false);
			
		  }else{
			$('#blurDIV').addClass('blur');
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'No saved data found.',
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
						$('#save').prop('disabled', false);
					}
				}
			});
		  }
		  $('.phone').trigger('blur');
		  $('#get').empty();
		  $('#get').html('<i class="fa fa-folder-open-o" aria-hidden="true"></i>');
		  $('#blurDIV').removeClass('blur');
		  $('#overlay').hide();
		};
	$('#rightbutton').on('click', function () {
		//var keyID = $('#ClaimNo').val() + ' ' + $('#RStakenWith').val().toUpperCase() + ' ' + $('#Date_of_RS').val() + ' ' + $("input[name='RSNo']:checked").val() + ' ('+document.title+')';
		var keyID = $("input[id$='ClaimNo']:visible").val() + ' ' + $("input[id$='RStakenWith']:visible").val().toUpperCase() + ' ' + $("input[id$='Date_of_RS']:visible").val() + ' ' + $("input[name$='RSNo']:checked:visible").val() + ' ('+document.title+')';
		var formIdentifier = `${keyID}`;
		printFunction(getFormData(formIdentifier));
	});
	$('#save').on('mousedown',function () {
		var $this = $(this);
		$this.empty();
		$this.html('<i class="fa fa-spinner fa-pulse"></i>');
	});
	$('#save').on('mouseup',function () {
		//var keyID = $('#ClaimNo').val() + ' ' + $('#RStakenWith').val().toUpperCase() + ' ' + $('#Date_of_RS').val() + ' ' + $("input[name='RSNo']:checked").val() + ' ('+document.title+')';
		var keyID = $("input[id$='ClaimNo']:visible").val() + ' ' + $("input[id$='RStakenWith']:visible").val().toUpperCase() + ' ' + $("input[id$='Date_of_RS']:visible").val() + ' ' + $("input[name$='RSNo']:checked:visible").val() + ' ('+document.title+')';
		var formIdentifier = `${keyID}`; // Identifier used to identify the form

		var $this = $(this);
		$('#get').prop('disabled', true);
		event.preventDefault();
		 var doctitle = document.title; 
		  
		  $('#blurDIV').addClass('blur');
		  $.confirm({
			boxWidth: '40%',
			useBootstrap: false,
			type: 'blue',
			icon: 'fa fa-exclamation-circle',
			title: 'Information',
			content: 'Would you like to enable auto save, which will save your data every 60 seconds?<br/><br/>' +
			'<div class="checkbox"><label><input type="checkbox" checked id="enableCheckbox"> Enable autosave</label></div>',
			buttons: {
				save: {
					btnClass: 'btn-blue',
					action: function () {
					
					var $checkbox = this.$content.find('#enableCheckbox');
						if ($checkbox.prop('checked')) {
							
								$('#get').prop('disabled', false);
								$('#autoSaveOff').hide();
								$('#autoSaveOn').show();
							timerID = setInterval(function() {
								var doctitle = document.title; 
								
								data = getFormData(formIdentifier);
								localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
								const message = "Form data has been saved.";
								doctitle = doctitle.replace(" - " + message, '');
								$('#footer').html(doctitle + " - " + message);
								$('#get').prop('disabled', false);
								setTimeout(function(){ $('#footer').html(doctitle); }, 6000);
								console.log('Data Saved');
								
							}, 60 * 1000);
							
							$('#blurDIV').removeClass('blur');
						}else{
							$('#get').prop('disabled', false);
							$('#autoSaveOn').hide();
							$('#autoSaveOff').show();
							clearInterval(timerID);
							$('#blurDIV').removeClass('blur');
							
							setTimeout(function(){ $('#footer').html(doctitle); }, 6000);
							
						};
					  data = getFormData(formIdentifier);
					  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
					  const message = "Form data has been saved.";
					  doctitle = doctitle.replace(" - " + message, '');
					  $('#footer').html(doctitle + " - " + message);
					  $this.html('<i class="fa fa-floppy-o" aria-hidden="true"></i>');
					}  
				},
				cancel: function () {
					$('#blurDIV').removeClass('blur');
					setTimeout(function(){ $('#footer').html(doctitle); }, 6000);
					$('#get').prop('disabled', false);
					$this.html('<i class="fa fa-floppy-o" aria-hidden="true"></i>');
					return;
				}
			}
		});
		
	});
const btnRemove = document.querySelector('#modalDel');
const sb = document.querySelector('#savedData');
btnRemove.onclick = (e) => {
            e.preventDefault();
			
           $.confirm({
			boxWidth: '30%',
			useBootstrap: false,
			type: 'red',
			icon: 'fa fa-warning',
			content: 'Are you sure you\'d like to permanently delete this Recorded Statement?',
			title: 'Warning',
			buttons: {
				delete: {
					btnClass: 'btn-red',
					action: function () {

					 // save the selected option
						let selected = [];

						for (let i = 0; i < sb.options.length; i++) {
							selected[i] = sb.options[i].selected;
							
						}

						// remove all selected option
						let index = sb.options.length;
						while (index--) {
							if (selected[index]) {
								localStorage.removeItem(sb.value);
								sb.remove(index);
								
							}
						}
					 $('#savedData').trigger('change');
					}
				},
				cancel: function () {
					
					return;
				}
			}
		});
        };
		
	var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("get");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
$('.saved-data').select2({
  placeholder: 'Select a saved Recorded Statement'
});


btn.onclick = function() {
	$('#blurDIV').addClass('blur');
	$('button').prop('disabled', true);
	$('#modalDel').prop('disabled', true);
	$('#modalOk').prop('disabled', true);
	$(this).html('<i class="fa fa-spinner fa-pulse"></i>');
	$("#savedData").children('option:not(:first)').remove();
	var $dropdown = $("#savedData");
	var i = -1;
	$.each(Object.keys(localStorage), function() {
		i = i + 1;
	if (Object.keys(localStorage)[i].indexOf("Recorded Statement") >= 0) {	
		$dropdown.append($("<option />").val(Object.keys(localStorage)[i]).text(Object.keys(localStorage)[i]));
	};
	});
  modal.style.display = "block";
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  $('#blurDIV').removeClass('blur');
  $('#get').empty();
  $('#get').html('<i class="fa fa-folder-open-o" aria-hidden="true"></i>');
  $('button').prop('disabled', false);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
	$('#blurDIV').removeClass('blur');
	$('#get').empty();
	$('#get').html('<i class="fa fa-folder-open-o" aria-hidden="true"></i>');
	$('button').prop('disabled', false);
  }
}

	$('#select2-savedData-container').on('click',function () {
		$('input.select2-search__field').after('');
		$('input.select2-search__field').after('<img src="images/search.png" id="input_img" style="position: absolute;top: 8px;right: 7px;width: 20px;height: 20px;cursor:text;">');
		
	});
	$('#savedData').on('change',function () {
		if ($(this).val()) {
			$('#modalDel').prop('disabled', false);
			$('#modalOk').prop('disabled', false);
		}else{
			$('#modalDel').prop('disabled', true);
			$('#modalOk').prop('disabled', true);
		};
	});
	$('#modalOk').on('click',function () {
		$('#overlay').show();
		$('#savedData').blur(); 
		$('button').prop('disabled', false);		
		$('.txtAreaGrow').trigger('keyup');
		$('input:radio').not("input[name$='RSNo']").prop('checked', false);
		$('input:text').val('');
		$.when(modal.style.display = "none").done(function () { setTimeout(function(){populateForm($('#savedData').val());$('input:checkbox:checked').trigger('change');$(".txtAreaGrow").removeAttr("style");}, 500);});
		
		
	});

	$('.collapsible').click(function (e) {
		e.preventDefault();
		var arr = ["#THEFT", "#FIRE", "#FLOOD", "#WITNESS", "#FOLLOWUP", "#OFAC"].join(' ,');
		if ($('[id^=checkbox]:checked').length < 1 && $('.collapsible i').attr("class") == 'fa fa-minus' || $(arr).is(':visible')) {
			$('#blurDIV').addClass('blur');
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'Please select a valid RS template from the dropdown menu, then try again.',
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
			});
		}else{
			if ($('.collapsible i').attr("class") == 'fa fa-minus') {
				 hideMain();
				 numberCols();
			}else{
				showMain();
				numberCols();
			};
		};		
	});
	
	
	$('.customMapControlwrapper').hover(function () {
	$('#overlay').show();
	$('#blurDIV').addClass('blur');
	$('.customMapControldropdown-content').css({'display':'block','position':'relative','top':'35px','width':'auto'});
	}, function () {
		$('#overlay').hide();
		$('#blurDIV').removeClass('blur');
		$('.customMapControldropdown-content').hide();
	});
	$('#dropdownContent').hover(function () {
	$('#overlay').show();
	$('#blurDIV').addClass('blur');
	$('.customMapControldropdown-content').css({'display':'block','position':'relative','top':'35px','width':'auto'});
	}, function () {
		$('#overlay').hide();
		$('#blurDIV').removeClass('blur');
		$('.customMapControldropdown-content').hide();
	});
	$('#oaisys').click(function (e) {	
	e.preventDefault();
		$.ajax({
		  url: 'chrome-extension://fddhonoimfhgiopglkiokmofecgdiedb/client.html',
		  success: function( data ) {
			console.log( "Success:");
			//location.href='chrome-extension://fddhonoimfhgiopglkiokmofecgdiedb/client.html';
			window.open('chrome-extension://fddhonoimfhgiopglkiokmofecgdiedb/client.html', "_blank", "toolbar=no,scrollbars=no,resizable=yes,top=500,left=500,width=400,height=650");
		  },
		  error: function( data ) {
			console.log( "Error:");
		 window.open('https://chrome.google.com/webstore/detail/ringcentral-for-google/fddhonoimfhgiopglkiokmofecgdiedb');

		  $('#blurDIV').addClass('blur');
		  $.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'Missing Chrome extension detected.\n\nPlease download the Chrome extension <strong>"RingCentral for Google"</strong> in order to run RingCentral directly from this application, then try again.',
				boxWidth: '50%',
				useBootstrap: false,
				buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
			});
		  }
		});			
	});
	$('#leftbutton').click(function (e) {
		e.preventDefault();
		$('#blurDIV').addClass('blur');
		$.confirm({
			boxWidth: '30%',
			useBootstrap: false,
			type: 'red',
			icon: 'fa fa-warning',
			content: 'Are you sure you\'d like to reload the page and lose any unsaved data?',
			title: 'Warning',
			buttons: {
				reload: {
					btnClass: 'btn-red',
					action: function () {
					$('#blurDIV').removeClass('blur');
					location.reload();
					}
				},
				cancel: function () {
					$('#blurDIV').removeClass('blur');
					return;
				}
			}
		});
		

	});
	
	
	$('input[name="lang"]').change(function () {
		if ($(this).is(':checked')) {
			if ($(this).val() == "es" || $(this).val() == "pl") {
				$('td').not('.number').attr('title','Click to translate question to ' + $(this).closest('label').text());
				$('#statusTxt span').html($(this).closest('label').text());
			}else if ($(this).val() == "Other") {
				$('td').not('.number').attr('title','Click to translate question to ' + $('#other_lang option:selected').text());
				$('#statusTxt span').html($('#other_lang option:selected').text());
			}else{
				$('td').not('.number').attr('title','Select a language to translate.');
				$('#statusTxt span').html($(this).closest('label').text());
			};
		}else{
			$('td').not('.number').attr('title','Select a language to translate.');
			$('#statusTxt span').html('English');
		};
		$('input').attr('title','');
	});
	$('#other_lang').change(function () {
		$('input[name="lang"]').trigger('change');
	});
	$('input[name="FUQlang"]').change(function () {
		if ($(this).is(':checked')) {
			if ($(this).val() == "es" || $(this).val() == "pl") {
				$('td').not('.number').attr('title','Click to translate question to ' + $(this).closest('label').text());
				$('#statusTxt span').html($(this).closest('label').text());
			}else if ($(this).val() == "Other") {
				$('td').not('.number').attr('title','Click to translate question to ' + $('#FUQother_lang option:selected').text());
				$('#statusTxt span').html($('#other_lang option:selected').text());
			}else{
				$('td').not('.number').attr('title','Select a language to translate.');
				$('#statusTxt span').html($(this).closest('label').text());
			};
		}else{
			$('td').not('.number').attr('title','Select a language to translate.');
		};
	});
	$('#FUQother_lang').change(function () {
		$('input[name="FUQlang"]').trigger('change');
	});
	$('input[name="WITlang"]').change(function () {
		if ($(this).is(':checked')) {
			if ($(this).val() == "es" || $(this).val() == "pl") {
				$('td').not('.number').attr('title','Click to translate question to ' + $(this).closest('label').text());
				$('#statusTxt span').html($(this).closest('label').text());
			}else if ($(this).val() == "Other") {
				$('td').not('.number').attr('title','Click to translate question to ' + $('#WITother_lang option:selected').text());
				$('#statusTxt span').html($('#other_lang option:selected').text());
			}else{
				$('td').not('.number').attr('title','Select a language to translate.');
				$('#statusTxt span').html($(this).closest('label').text());
			};
		}else{
			$('td').not('.number').attr('title','Select a language to translate.');
		};
	});
	$('#WITother_lang').change(function () {
		$('input[name="WITlang"]').trigger('change');
	});
		
		
		
	$(function() {
		//  changes mouse cursor when highlighting loawer right of box
		$(".txtAreaGrow").mousemove(function(e) {
			var myPos = $(this).offset();
			myPos.bottom = $(this).offset().top + $(this).outerHeight();
			myPos.right = $(this).offset().left + $(this).outerWidth();
			
			if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 16 && myPos.right > e.pageX && e.pageX > myPos.right - 16) {
				$(this).css({ cursor: "nw-resize" });
			}
			else {
				$(this).css({ cursor: "" });
			}
		})
		//  the following simple make the textbox "Auto-Expand" as it is typed in
		.on('keyup',function (e) {
			//  this if statement checks to see if backspace or delete was pressed, if so, it resets the height of the box so it can be resized properly
			//if (e.which == 8 || e.which == 46) {
				$(this).height(parseFloat($(this).css("min-height")) != 0 ? parseFloat($(this).css("min-height")) : parseFloat($(this).css("font-size"))-31);
			//}
			//  the following will help the text expand as typing takes place
			while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
				$(this).height($(this).height()+31);
			};
		});
	$("input:checkbox").change(function () {
		if ($('[id^=checkbox]:checked').length === 0 && $('.collapsible i').attr("class") == 'fa fa-plus') {
				$('.collapsible i').attr("class", 'fa fa-minus');
				showMain();
				numberCols();
			};
	});		
		
	$("input:radio").change(function () {
		
		if ($("input[name^=TERRITORY]").prop("checked") == true) {
			$('#checkbox9').prop("checked",true);
			$('#checkbox9').attr("disabled",true);
		}else{
			$('#checkbox9').prop("checked",false);
			$('#checkbox9').trigger('change');
			$('#checkbox9').attr("disabled",false);
		};
	
		if ($(this).attr('name') == $("input[name^=UD]").attr('name') || $(this).attr('name') == $("input[name^=driver2]").attr('name') ) {
			
			if ($(this).val() == 'UD') {
				$('#checkbox17').prop("checked",true);
				$('#checkbox17').attr("disabled",true);
			}else{
				$('#checkbox17').prop("checked",false);
				$('#checkbox17').trigger('change');
				$('#checkbox17').attr("disabled",false);
			};
		};
	if ($('input[name=VNOP]:checked').length) {	
		if ($(this).attr('name') === $("input[name=VNOP]").attr('name')) {
		
				if (getRadioVal( document.getElementById('RSgeneral'), 'VNOP' ) === 'NON-OWNERS') {
					$('#checkbox7').prop("checked",true);
					$('#checkbox7').attr("disabled",true);	
				}else{
					$('#checkbox7').prop("checked",false);
					$('#checkbox7').trigger('change');
					$('#checkbox7').attr("disabled",false);
				};
		
		};
		if (getRadioVal( document.getElementById('RSgeneral'), 'VNOP' ) === 'VNOP') {
			$('#checkbox7').attr("disabled",true);
		}else if (getRadioVal( document.getElementById('RSgeneral'), 'VNOP' ) !== 'NON-OWNERS') {
			$('#checkbox7').attr("disabled",false);
		};
	}else{
		$('#checkbox7').prop("checked",false);
		$('#checkbox7').attr("disabled",false);
		
	};
	
	
	/*if ($(this).attr('name') == $("input[name$='BIZ']").attr('name') || $(this).attr('name') == $("input[name*='rideshare']").attr('name') || $(this).attr('name') ==  $("input[name*='business']").attr('name')) {
		if (getRadioVal(document.getElementById('RSgeneral'),$(this).attr('name')) == 'Yes') {
			$('#checkbox8').prop("checked",true);
			$('#checkbox8').attr("disabled",true);
		} else {
			$('#checkbox8').prop("checked",false);
			$('#checkbox8').attr("disabled",false);
			
		};
		
	};*/
	//if (getRadioVal( document.getElementById('RSgeneral'),$("input[name$='BIZ']:visible:checked").attr('name')) === "Yes" ) {
		let var1 = $("input[name$='BIZ'][value='Yes']:visible:checked").length || 0;
		let var2 = $("input[name*=rideshare][value='Yes']:visible:checked").length || 0;
		let var3 = $("input[name*=business][value='Yes']:visible:checked").length || 0;
		let var4 = $("#checkbox8:checked").length || 0;
		//var1 += $("input[name$='BIZ']:visible:checked").length || $("input[name*=rideshare]:visible:checked").length || $("input[name*=business]:visible:checked").length || 0;
	//};
	//if (getRadioVal( document.getElementById('RSgeneral'),$("input[name*=business]:visible:checked").attr('name')) === "Yes") {
		//var1 += $("input[name*=rideshare]:visible:checked").length || 0;
	//};		
	//if (getRadioVal( document.getElementById('RSgeneral'),$("input[name*=rideshare]:visible:checked").attr('name')) === "Yes" ) {
		//var1 += $("input[name*=business]:visible:checked").length || 0;	
	//};
	if (bizChecked === false) {		
		if (var1+var2+var3> 0) {
			$('#checkbox8').prop("checked",true);
			$('#checkbox8').attr("disabled",true);
		} else {
			$('#checkbox8').prop("checked",false);
			$('#checkbox8').trigger('change');
			$('#checkbox8').attr("disabled",false);
			
		};
	};
		$("input:checkbox").each(function () {
		
			if ($(this).prop('disabled')) {
					$("label[for='"+$(this).prop('id')+"']").addClass('disabledInput');
				}else {
					$("label[for='"+$(this).prop('id')+"']").removeClass('disabledInput');
				};
		});	
		
	}); 
	
	}); //end of document ready
	let ele = [];
	$('div:not(#secondPart)').on('hide', function () {
			
				if ($('#'+$(this).attr('id')+" input:radio:checked")) {
					$('#'+$(this).attr('id')+" input:radio:checked").each(function () {
						
						ele.push($(this).attr('name'));
						undo(ele.pop());
						});
				};

		
		

		});
	(function ($) {
        $.each(['show', 'hide', 'fadeOut', 'fadeIn'], function (i, ev) {
            var el = $.fn[ev];
            $.fn[ev] = function () {
                var result = el.apply(this, arguments);
                result.promise().done(function () {
                    this.triggerHandler(ev, [result]);
                })
                return result;
            };
        });
    })(jQuery);
	$(function(){
		$("input.autogrow").autoGrowInput({minWidth:150,comfortZone:1});
	});
	
	
	
	
$( window ).resize( function(){

  if( docWidth != $( window ).width() ){
	  $(window)
	  .keypress(function () {
		$(window).trigger('resolutionchange');
	  })
	  .mousedown(function () {
		  $(window).trigger('resolutionchange');
	  });
    window.resizeTo(docWidth, docHeight);
	//$(window).trigger('scroll');
  }

});

	$('.printdiv').each(function (index, value) {
		$(value).attr('title','Print this section only');
		$(value).click(function () {
		PrintElem($(this).closest('div').attr('id'));
		
		});
	});
	$('input[type=radio]').each(function (index, value) {
		var arr = $(value);	
		$("input[name='"+$(value).attr('name')+"']").on('change', function () {
			for (i = 0; i<arr.length;i++) {
				$(arr[i]).next('span').removeClass('banners');
			};
		});
	});
			$('.addressNorm').focus( function () {
			//	normalAddress(this);
			});
			
			$('.addressNorm').blur(function () {
				if (!$(this).val()) {
					$(this).attr('placeholder', '');
				};
			});
	$('input[name="UDdiscovered"]').click(function () {
		hideshow($(this),$("#MCTDUD"));
		/*if ($(this).val() === "Yes") {
			$('#MCTDUD').show();
		} else {
			$('#MCTDUD').hide();
		}*/
	});
	$('#VIQ').on('input', function () {
		$('#VIQ2').val($(this).val());
	});
	$('input[name="IVO"]').change(function () {
		hideshow($(this),$("#IVOQ"));	
		console.log($(this).val())
		if ($(this).val() === "Yes") {
			$('#UWQIVOwner').removeClass('hiddenUWQ').show();
			coverageCheck("notOk", 'INSURABLE INTEREST');
		}else{
			$('#UWQIVOwner').addClass('hiddenUWQ').hide();
			coverageCheck("Ok", 'INSURABLE INTEREST');
		};
		
		numberCols();
	});
	$('input[name="SignedApp"]').change(function () {
		hideshow($(this),$("#AppSigned"), $('#AppNotSigned'));
	});
	$('input[name="IVOFinance"]').change(function () {
		hideshow($(this),$("#VOPFinance"));
	});
	$('input[name="BINDERtradeIn"]').change(function () {
		hideshow($(this),$("#BINDERtradeInTable"));
	});
	$('input[name="BINDERotherVeh"]').change(function () {
		hideshow($(this),$("#BINDERotherVehTable"));
		hideshow($(this),$("#BINDERmoreVehTable"));
	});
	$('input[name="BINDERotherVeh2"]').change(function () {
		hideshow($(this),$("#BINDERotherVehTable2"));
		hideshow($(this),$("#BINDERmoreVehTable2"));
	});
	$('input[name="BINDERmemberofHH"]').change(function () {
		hideshow($(this),$("#BINDERmemberofHHTable"));
	});
	$('input[name="BINDERmemberofHHVeh"]').change(function () {
		hideshow($(this),$("#BINDERmemberofHHVehTable"));
		hideshow($(this),$("#BINDERmoreHHVehTable"));
		
	});
	$('input[name="CVupd"]').change(function () {
		hideshow($(this),$("#cvUPDTable"));	
	});
	$('input[name="PDupd"]').change(function () {
		hideshow($(this),$("#pdUPDTable"));	
	});
	$('input[name="IVupd"],input[name="THEFTIVupd"],input[name="IVupd2"],input[name="IVupd3"]').on('change', function () {
		if ($(this).val() === "Yes") {
			$('#UWQUESTIONS').show();
			numberCols();
		}else{
			$('#UWQUPD').addClass('hiddenUWQ').hide();
			if ($('.coverageIssue:visible').length) {
				$('#UWQUESTIONS').hide(); 
				};
				numberCols();
		};
	});
	$('input[name="IVupd"]').on('change', function () {
		hideshow($(this),$("#ivUPDTable"));	
		if ($(this).val() === 'Yes') {
			$('#UWQUPD').removeClass('hiddenUWQ').show();
		};
	});
	$('input[name="IVDriverDL"]').on('change', function () {
		if ($(this).val() === 'No') {
			$('#UWQDL').show();
			$('#UWQUESTIONS').show();
			numberCols();
		}else{
			if ($('.coverageIssue:visible').length) {
				$('#UWQUESTIONS').hide(); 
				numberCols(); 
				$('#UWQDL').hide();
				}
		};
	});
	$('input[name="UDDLstatus"]').on('change', function () {
		if ($(this).val() === 'No') {
			$('#UWQDL').show();
			$('#UWQUESTIONS').show();
			numberCols();
		}else{
			if ($('.coverageIssue:visible').length) {
				$('#UWQUESTIONS').hide(); 
				numberCols(); 
				$('#UWQDL').hide();
			}
		};
	});
	$('input[name="THEFTIVupd"]').on('change', function () {	
		$('#UWQUPD').show();
	});
	$('input[name="IVupd2"]').on('change', function () {	
		$('#UWQUPD').show();
	});
	$('input[name="IVupd3"]').on('change', function () {	
		$('#UWQUPD').show();
	});
	$('input[name="witnessIVUPD"]').on('change', function () {	
		$('#UWQUPD').show();
	});
	$('.LOCN:visible').on('input', function () {
		if ($(this).val().toLowerCase().indexOf("mex".toLowerCase()) !== -1 && $(this).val().toLowerCase().indexOf("new mex".toLowerCase()) === -1) {
			$('#UWQMex').show();
			$('#UWQUESTIONS').show();
			numberCols();
		}else{
			$('#UWQMex').hide();
			$('#UWQUESTIONS').hide();
			numberCols();
		};
	});
	$('input[name="IVtowed"]').change(function () {
		hideshow($(this),$("#IVDrivableTable"));	
	});
	$('input[name="anyUDs"]').click(function () {
		hideshow($(this),$("#anyUDs"));
		/*if ($(this).val() === "Yes") {
			$('#anyUDs').show();
		} else {
			$('#anyUDs').hide();
		}*/
	});
	$('input[name="stillatshop"]').click(function () {
		hideshow($(this),$("#stillatshopYes"),$('#stillatshopNo'));
		/*if ($(this).val() === "Yes") {
			$('#stillatshopYes').show();
			$('#stillatshopNo').hide();
		} else {
			$('#stillatshopYes').hide();
			$('#stillatshopNo').show();
		}*/
	});
	
	$("#resetButton").mousedown(function () {
		$('#blurDIV').addClass('blur');
		$.confirm({
			boxWidth: '30%',
			useBootstrap: false,
			type: 'orange',
			icon: 'fa fa-exclamation-circle',
			content: 'Are you sure you\'d like to reset the form and clear all the data?',
			title: 'Warning',
			buttons: {
			/*	save:  {
					icon: 'fa fa-save',
					btnClass: 'btn-green',
					action: function () {$('#blurDIV').removeClass('blur');$('#save').trigger('click');}
				},*/
				reset: {
					btnClass: 'btn-orange',
					action: function () {$('#RSgeneral')[0].reset();}
				},
				cancel: function () {
					$('#blurDIV').removeClass('blur');
					return;
					
				}
			}
		});
	});


	$('.date').each(function (index, value) {
		//$(value).focus(function () {
			//$(value).attr('type', 'date');
			$(value).datepicker({
				//showButtonPanel: true,
				changeMonth: true, 
				changeYear: true, 
				dateFormat: "mm/dd/yy",
				yearRange: "-90:+00"				
			});
		//});
		$(value).blur(function () {
			if ($(value).val() === '') {
				$(value).attr('type', 'text');
			};
		});
	});
	$.datepicker._gotoToday = function(id) { 
		$(id).datepicker('setDate', new Date()).datepicker('hide').blur(); 
	};

	$("input[name^=NOresideVNOPO]").change(function () {
		hideshow($(this),$("#NOresideVNOPOYes"),$('#NOresideVNOPONo'));
		/*if ($(this).val() === "Yes") {
			$("#NOresideVNOPOYes").show();
			$("#NOresideVNOPONo").hide();
		}else{
			$("#NOresideVNOPOYes").hide();
			$("#NOresideVNOPONo").show();
		};*/
	});
	$("input[name^=priorInjuries]").change(function () {
		hideshow($(this),$("#priorInjuriesDiv"));
	/*	if ($(this).val() === "Yes") {
			$("#priorInjuriesDiv").show();
		}else{
			$("#priorInjuriesDiv").hide();
		};*/
	});
	$("input[name^=existingMedCond]").change(function () {
		hideshow($(this),$("#priorMedCondDiv"));
		/*if ($(this).val() === "Yes") {
			$("#priorMedCondDiv").show();
		}else{
			$("#priorMedCondDiv").hide();
		};*/
	});
	$("input[name^=VNOPins]").change(function () {
		hideshow($(this),$("#VNOPinsuranceQs"));
		/*if ($(this).val() === "Yes") {
			$("#VNOPinsuranceQs").show();
		}else{
			$("#VNOPinsuranceQs").hide();
		};*/
	});
	$("input.checkboxPrompt").change(function () {
		if ($(this).val() === "Yes") {
			$(this).parents("table").next("table").show();
		}else{
			$(this).parents("table").next("table").hide();
		};
	});
	$("input[name^=medsTakenPriorto]").change(function () {
		hideshow($(this),$("#medsPriorToLoss"));
		/*if ($(this).val() === "Yes") {
			$("#medsPriorToLoss").show();
		}else{
			$("#medsPriorToLoss").hide();
		};*/
	});
	$("input[name^=takentoHosp]").change(function () {
		hideshow($(this),$("#takenToHospitalQ"));
		/*if ($(this).val() === "Yes") {
			$("#takenToHospitalQ").show();
		}else{
			$("#takenToHospitalQ").hide();
		};*/
	});

	$("input[name^=PCPorUC]").change(function () {
		hideshow($(this),$("#PCPorUCQ"));
		/*if ($(this).val() === "Yes") {
			$("#PCPorUCQ").show();
		}else{
			$("#PCPorUCQ").hide();
		};*/
	});
	$("input[name^=xraysTaken]").change(function () {
		hideshow($(this),$("#xraysTakenQ"));
		/*if ($(this).val() === "Yes") {
			$("#xraysTakenQ").show();
		}else{
			$("#xraysTakenQ").hide();
		};*/
	});
	$("input[name^=RXprescribed]").change(function () {
		hideshow($(this),$("#RXprescribedQ"));
		/*if ($(this).val() === "Yes") {
			$("#RXprescribedQ").show();
		}else{
			$("#RXprescribedQ").hide();
		};*/
	});
	$("input[name^=OTCtaken]").change(function () {
		hideshow($(this),$("#OTCtakenQ"));
		/*if ($(this).val() === "Yes") {
			$("#OTCtakenQ").show();
		}else{
			$("#OTCtakenQ").hide();
		};*/
	});
	$("input[name^=timeOffRX]").change(function () {
	hideshow($(this),$("#notRXbyPCPYes"),$("#notRXbyPCPNo"));	
		
		/*if ($("input[name^=timeOffRX]:checked").length > 0) {
			if ($(this).val() === "Yes") {
				$("#notRXbyPCPNo").hide();
				$("#notRXbyPCPYes").show();
			}else{
				$("#notRXbyPCPNo").show();
				$("#notRXbyPCPYes").hide();
			}
		}else{
			$("#notRXbyPCPNo").hide();
			$("#notRXbyPCPYes").hide();
		};*/
	});
	$("input[name^=perfFunctions]").change(function () {
		if ($("input[name^=perfFunctions]:checked").length === 0) {
			$(this).parents("table").next("table").hide();
		};
	});
	$("input[name^=OOPexp]").change(function () {
		hideshow($(this),$("#OOPexpQ"));
		/*if ($(this).val() === "Yes") {
			$("#OOPexpQ").show();
		}else{
			$("#OOPexpQ").hide();
		};*/
	});
	$("input[name^=pubaid]").change(function () {
		hideshow($(this),$("#pubaidQ"));
		/*if ($(this).val() === "Yes") {
			$("#pubaidQ").show();
		}else{
			$("#pubaidQ").hide();
		};*/
	});
	$("input[name^=FUtreatment]").change(function () {
		hideshow($(this),$("#FUtreatmentQ"));
		/*if ($(this).val() === "Yes") {
			$("#FUtreatmentQ").show();
		}else{
			$("#FUtreatmentQ").hide();
		};*/
	});
	$('#bugbutton').click(function () {
		$('#blurDIV').addClass('blur');
		$.confirm({
			title: 'Report a bug',
			boxWidth: '50%',
			icon: 'fa fa-bug',
			type: 'dark',
			useBootstrap: false,
			content: '' +
			'<form action="" class="formName">' +
			'<div class="form-group">' +
			'<label class="form-label">Please enter as much information about what you were doing prior to and after experiencing the bug.</label>' +
			'<textarea placeholder="Enter details here" class="issue form-control"></textarea>' +
			'</div>' +
			'</form>',
			buttons: {
				formSubmit: {
					text: 'Submit',
					btnClass: 'btn-blue',
					action: function () {
						var issue = this.$content.find('.issue').val();
						if(!issue){
							$.alert({
								title: 'Information',
								type: 'blue',
								icon: 'fa fa-info-circle',
								content: 'Please provide valid information about the bug/issue.',
								boxWidth: '30%',
								useBootstrap: false,
							});
							return false;
						}
						$('#blurDIV').removeClass('blur');
						document.location.href = mailtoURL('ccordero44@gmail', $(document).attr('title') + ' Bug Report for ' + Date(),issue + '\n\nChrome Version: ' + getChromeVersion() + '\nRecorded Statement Version: ' + $('#version').text());
					}
				},
				cancel: function () {
					$('#blurDIV').removeClass('blur');
				},
			},
			onContentReady: function () {
				// bind to events
				var jc = this;
				this.$content.find('form').on('submit', function (e) {
					// if the user submits the form by pressing enter in the field.
					e.preventDefault();
					jc.$$formSubmit.trigger('click'); // reference the button and click it
				});
			}
		});
	});
	$("input:radio").on('click', function () {
		
		checkedAll.push($(this).attr('name'));
	});
	$('#undo').click(function ( event ) {
		event.preventDefault();
		if (checkedAll.length !== 0) {
		var cbox = checkedAll.pop();
		undo(cbox);
		
		if (cbox == 'RSother') {
			$('input[name="RSother"]').trigger('change');
			$('input[name="RSother"]').parents(".section").next("table").find('.fillIn').removeClass('banners');
		}
		
		}else{
			$('#blurDIV').addClass('blur');
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'No checkbox to undo.',
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
			});
		};
	});
	$('#checkbox0').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'MVS');
			numberCols();
		} else {
			coverageCheck("Ok", 'MVS');
			numberCols();
		};
	});
	$('#checkbox1').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'MCTD');
			numberCols();
		} else {
			coverageCheck("Ok", 'MCTD');
			numberCols();
		};
	});
	$('#checkbox2').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'POINTS');
			numberCols();
		} else {
			coverageCheck("Ok", 'POINTS');
			numberCols();
		};
	});
	$('#checkbox3').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'REBUILT');
			numberCols();
		} else {
			coverageCheck("Ok", 'REBUILT');
			numberCols();
		};
	});
	$('#checkbox4').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'FIRE');

			$('#lastPart').hide();
			numberCols();
		} else {
			coverageCheck("Ok", 'FIRE');
			$('#lastPart').show();
			numberCols();
		};
	});
	$('#checkbox5').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'FLOOD');
			$('#addProperty').hide();
			$('#addVehicles').hide();
			$('#lastPart').hide();
			numberCols();
		} else {
			coverageCheck("Ok", 'FLOOD');
			$('#addVehicles').show();
			$('#lastPart').show();
			$('#addProperty').show();
			numberCols();
		};
	});
	$('#checkbox10').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'THEFT');
			
			$('#lastPart').hide();

			numberCols();
		} else {
			coverageCheck("Ok", 'THEFT');
			
			$('#lastPart').show();
			numberCols();
		};
	});
	$('#checkbox11').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'INJURY');

			numberCols();
		} else {
			coverageCheck("Ok", 'INJURY');
			numberCols();
		};
	});
	$('#checkbox12').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'HIT_PEDESTRIAN');

			numberCols();
		} else {
			coverageCheck("Ok", 'HIT_PEDESTRIAN');
			numberCols();
		};
	});
	$('#checkbox13').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'MED_CONDITION');
			$('#UWQImpairment').show();
			numberCols();
		} else {
			coverageCheck("Ok", 'MED_CONDITION');
			$('#UWQImpairment').hide();
			numberCols();
		};
	});
	$('#checkbox21').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'BINDER');

			numberCols();
		} else {
			coverageCheck("Ok", 'BINDER');
			numberCols();
		};
	});
	$('#checkbox14').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'TOW');

			numberCols();
		} else {
			coverageCheck("Ok", 'TOW');
			numberCols();
		};
	});
	$('#checkbox15').change(function () {
		if (this.checked) {
			if ($('[id^=checkbox]:checked').length <= 1) {
				$('[id^=checkbox]').attr('disabled',true);
				$('[id^=checkbox]').not(this).parent().css('color','silver');
				$('input[id^=checkbox]').not(this).next().css('border-color','silver');
				$(this).attr('disabled',false);
				loadFunctions();
				//coverageCheck("notOk", 'WITNESS');
				$('#WITNESS').show()
				$('#firstPart').hide();
				$('#secondPart').hide();
				$('#addVehicles').hide();
				$('#cvTable').hide();
				$('#cvTables').hide();
				$('#folTable').hide();
				$('#lastPart').hide();
				$('#addProperty').hide();
				document.title = "Witness Recorded Statement";
				numberCols();
			}else{
				$.alert({
					title: 'Information',
					type: 'blue',
					icon: 'fa fa-info-circle',
					content: 'Please uncheck any other recorded statement templates before proceeding with the Witness Statement, then try again.',
					onContentReady: function () {
						$('#blurDIV').addClass('blur');
					},
					boxWidth: '40%',
					useBootstrap: false,
					buttons: {
						Ok: function () {
							$('#blurDIV').removeClass('blur');
						}
					}
				});
				$(this).prop('checked',false);
		};
		} else {
			$('[id^=checkbox]').attr('disabled',false);
			$('[id^=checkbox]').not(this).parent().css('color','initial');
			$('input[id^=checkbox]').not(this).next().css('border-color','initial');
			//coverageCheck("Ok", 'WITNESS');
			$('#WITNESS').hide();
				$('#firstPart').show();
				$('#secondPart').show();
				$('#addVehicles').show();
				$('#cvTable').show();
				$('#cvTables').show();
				$('#folTable').show();
				$('#lastPart').show();
				$('#addProperty').show();
				document.title = title;
			numberCols();
		};
		
	});
	$('#checkbox16').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'OUT_OF_STATE');
			numberCols();
		} else {
			coverageCheck("Ok", 'OUT_OF_STATE');
			numberCols();
		};
	});

	$('#checkbox6').change(function () {
		if (this.checked) {
				
			if ($('[id^=checkbox]:checked').length <= 1) {
				$('[id^=checkbox]').attr('disabled',true);
				$('[id^=checkbox]').not(this).parent().css('color','silver');
				$('input[id^=checkbox]').not(this).next().css('border-color','silver');
				$(this).attr('disabled',false);
				$('#firstPart').hide();
				$('#secondPart').hide();
				$('#addVehicles').hide();
				$('#cvTable').hide();
				$('#cvTables').hide();
				$('#folTable').hide();
				$('#lastPart').hide();
				$('#addProperty').hide();
				$('#closingQuestions').hide();
				$('#AgentQuestions').show();
				if ($('.hidden:visible').length == 1) {
					$('#agentQfirstPart').show();
				}else{
					$('#agentQfirstPart').hide();
				};
				numberCols();
			}/*else{				
				$.alert({
					title: 'Information',
					type: 'blue',
					icon: 'fa fa-info-circle',
					content: 'Please uncheck any other recorded statement templates before proceeding with the Agent Questions, then try again.',
					onContentReady: function () {
						$('#blurDIV').addClass('blur');
					},
					boxWidth: '40%',
					useBootstrap: false,
					buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
				});
				$(this).prop('checked',false);
			};*/
		} else {
			
				$('[id^=checkbox]').attr('disabled',false);
				$('[id^=checkbox]').parent().css('color','initial');
				$('input[id^=checkbox]').not(this).next().css('border-color','initial');
				$('#firstPart').show();
				$('#secondPart').show();
				$('#addVehicles').show();
				$('#cvTable').show();
				$('#cvTables').show();
				$('#folTable').show();
				$('#lastPart').show();
				$('#addProperty').show();
				$('#closingQuestions').show();
				$('#AgentQuestions').hide();
				$('#agentQfirstPart').hide();
				$('.rowNumbers2').trigger('input');
				$('.rowNumbers6').trigger('input');
				numberCols();
		};
		
	});
	var nonOwnerChecked = false;
	$('#checkbox7').change(function () {
		
		if (this.checked) {
			coverageCheck("notOk", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").show();
			$('input[name=VNOP][value=NON-OWNERS]').prop('checked', true);
			numberCols();
			nonOwnerChecked = true;
		} else {
			coverageCheck("Ok", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").hide();
			$('input[name=VNOP][value=NON-OWNERS]').prop('checked', false);
			numberCols();
			nonOwnerChecked = false;
		};
	});
	var bizChecked = false;
	$('#checkbox8').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'BIZ');			
			numberCols();
			bizChecked = true;
		} else {
			if (getRadioVal( document.getElementById('RSgeneral'), $('input[name*="rideshare"]:visible').attr('name') ) !== 'Yes' && getRadioVal( document.getElementById('RSgeneral'), $('input[name*="business"]:visible').attr('name') ) !=='Yes' && getRadioVal( document.getElementById('RSgeneral'), $('input[name*="BIZ"]:visible').attr('name') ) !== 'Yes') {
				coverageCheck("Ok", 'BIZ');
				numberCols();
				bizChecked = false;
			};
		};
	});
	$('#checkbox18').change(function () {
		if (this.checked) {
		if ($('[id^=checkbox]:checked').length <= 1) {
			$('[id^=checkbox]').attr('disabled',true);
			$('[id^=checkbox]').not(this).parent().css('color','silver');
			$('input[id^=checkbox]').not(this).next().css('border-color','silver');
			$(this).attr('disabled',false);
			loadFunctions();
			//coverageCheck("notOk", 'FOLLOWUP');	
			$("#FOLLOWUP").show();
			$('#firstPart').hide();
			$('#secondPart').hide();
			$('#addVehicles').hide();
			$('#folTable').hide();
			$('#lastPart').hide();	
			$('#addProperty').hide();			
			numberCols();
		}else{			
			$.alert({
					title: 'Information',
					type: 'blue',
					icon: 'fa fa-info-circle',
					content: 'Please uncheck any other recorded statement templates before proceeding with the Follow Up, then try again.',
					onContentReady: function () {
						$('#blurDIV').addClass('blur');
					},
					boxWidth: '40%',
					useBootstrap: false,
					buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
				});
			$(this).prop('checked',false);
		};
		} else {
			$('[id^=checkbox]').attr('disabled',false);
			$('[id^=checkbox]').not(this).parent().css('color','initial');
			$('input[id^=checkbox]').not(this).next().css('border-color','initial');
			//coverageCheck("Ok", 'FOLLOWUP');
			$("#FOLLOWUP").hide();
			$('#firstPart').show();
			$('#secondPart').show();
			$('#addVehicles').show();
			$('#folTable').show();
			$('#lastPart').show();
			$('#addProperty').show();
			$('.rowNumbers2').trigger('input');
			$('.rowNumbers6').trigger('input');
			numberCols();
		};
	});
	$('#checkbox19').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'UNAUTHORIZED_REPAIRS');			
			numberCols();
		} else {
			coverageCheck("Ok", 'UNAUTHORIZED_REPAIRS');
			numberCols();
		};
	});
	$('#checkbox20').change(function () {
		if (this.checked) {
			if ($('[id^=checkbox]:checked').length <= 1) {
				$('[id^=checkbox]').attr('disabled',true);
				$('[id^=checkbox]').not(this).parent().css('color','silver');
				$('input[id^=checkbox]').not(this).next().css('border-color','silver');
				$(this).attr('disabled',false);
				$('#firstPart').hide();
				$('#secondPart').hide();
				$('#addVehicles').hide();
				$('#cvTable').hide();
				$('#cvTables').hide();
				$('#folTable').hide();
				$('#lastPart').hide();
				$('#addProperty').hide();
				document.title = "OFAC Recorded Statement";
				//$('#closingQuestions').hide();
				$('#OFAC').show();
				numberCols();
			}else{				
				$.alert({
					title: 'Information',
					type: 'blue',
					icon: 'fa fa-info-circle',
					content: 'Please uncheck any other recorded statement templates before proceeding with the OFAC RS, then try again.',
					onContentReady: function () {
						$('#blurDIV').addClass('blur');
					},
					boxWidth: '40%',
					useBootstrap: false,
					buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
				});
				$(this).prop('checked',false);
			};
		} else {
				$('[id^=checkbox]').attr('disabled',false);
				$('[id^=checkbox]').not(this).parent().css('color','initial');
				$('input[id^=checkbox]').not(this).next().css('border-color','initial');
				$('#firstPart').show();
				$('#secondPart').show();
				$('#addVehicles').show();
				$('#cvTable').show();
				$('#cvTables').show();
				$('#folTable').show();
				$('#lastPart').show();
				$('#addProperty').show();
				//$('#closingQuestions').show();
				$('#OFAC').hide();
				document.title = title;
				$('.rowNumbers2').trigger('input');
				$('.rowNumbers6').trigger('input');
				numberCols();
		};
		
	});
	$('#checkbox9').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'TERRITORY');			
			numberCols();
		} else {
			coverageCheck("Ok", 'TERRITORY');
			numberCols();
		};
	});
	$('#checkbox17').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'UD');			
			numberCols();
		} else {
			coverageCheck("Ok", 'UD');
			numberCols();
		};
	});
	$('.comingsoon').each(function () {
		$(this).css('color','gray');
		$(this).attr('title',$(this).text() + " coming soon...");
	});
	$('input[name="VNOP"]').change(function () {
		if($(this).is(':checked')) {
		if ($(this).val() === 'VNOP') {
			coverageCheck("Ok", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").hide();
			coverageCheck("notOk", $(this).val());
			numberCols();
		}else if ($(this).val() === 'NON-OWNERS') {
			coverageCheck("Ok", 'VNOP');
			coverageCheck("notOk", $(this).val());
			$("#NON-OWNER_TO_DO").show();
			numberCols();
		} else {
			coverageCheck("Ok", 'VNOP');
			coverageCheck("Ok", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").hide();
			numberCols();
		};
		}else{
			coverageCheck("Ok", 'VNOP');
			coverageCheck("Ok", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").hide();
			numberCols();
		};
	});
	$("input[name$='BIZ']").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), $('input[name*="rideshare"]:visible').attr('name') ) || "No";
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name$="business"]:visible').attr('name') ) || "No";
		
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", "BIZ");
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});
	$("input[name*=rideshare]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), $('input[name$="BIZ"]:visible').attr('name') ) || "No";
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name$="business"]:visible').attr('name') ) || "No";
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});
	$("input[name*=business]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), $('input[name$="BIZ"]:visible').attr('name') ) || "No";
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name$="rideshare"]:visible').attr('name') ) || "No";
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});

	/*$("input[name^=BIZ]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="rideshare"]:visible').attr('name') );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="business"]:visible').attr('name') );
		
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", $(this).attr('name'));
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", $(this).attr('name'));
			numberCols();
		};
	});
	$("input[name^=THEFTBIZ]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="THEFTrideshare"]:visible').attr('name') );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="THEFTbusiness"]:visible').attr('name') );
		
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", 'BIZ');
			numberCols();
		};
	});
	$("input[name^=rideshare]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'BIZ' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="business"]:visible').attr('name') );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});
	$("input[name^=THEFTrideshare]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'THEFTBIZ' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="THEFTbusiness"]:visible').attr('name') );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});
	$("input[name^=business]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'BIZ' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="rideshare"]:visible').attr('name') );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});
	$("input[name^=THEFTbusiness]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'THEFTBIZ' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), $('input[name^="THEFTrideshare"]:visible').attr('name') );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});*/
	$('input[name="UD"]').change(function () {
		
		var val = getRadioVal( document.getElementById('RSgeneral'), 'driver2' );
		if ($(this).val() === 'UD') {
			coverageCheck("notOk", 'UD');
			$("input[name=UDdriver][value=UD]").prop('checked', true);
			numberCols();
		} else if ($(this).val() !== 'UD' && val !== 'UD') {
			coverageCheck("Ok", 'UD');
			$("input[name=UDdriver][value=UD]").prop('checked', false);
			numberCols();
		};
		
		if ($(this).val() === 'ED') {
			coverageCheck("notOk", 'ED');
			$('input:radio[name="EDdriver"][value="ED"]').prop("checked", true);
			numberCols();
		} else if ($(this).val() !== 'ED' && val !== 'ED') {
			coverageCheck("Ok", 'ED');
			numberCols();
		};
			});
	$('input[name="driver2"]').change(function () {
		var val = getRadioVal( document.getElementById('RSgeneral'), 'UD' );
		if ($(this).val() === 'UD') {
			coverageCheck("notOk", 'UD');
			$("input[name=UDdriver][value=UD]").prop('checked', true);
			numberCols();
		} else if ($(this).val() !== 'UD' && val !== 'UD') {
			coverageCheck("Ok", 'UD');
			$("input[name=UDdriver][value=UD]").prop('checked', false);
			numberCols();
		};
		if ($(this).val() === 'ED') {
			coverageCheck("notOk", 'ED');
			$('input:radio[name="EDdriver"][value="ED"]').prop("checked", true);
			numberCols();
		} else if ($(this).val() !== 'ED' && val !== 'ED') {
			coverageCheck("Ok", 'ED');
			numberCols();
		};
	});
	$('input[name="ParkeronPolicy"]').change(function () {
		var val = getRadioVal( document.getElementById('RSgeneral'), 'driver2' );
		if ($(this).val() === 'No') {
			coverageCheck("notOk", 'UD');
			numberCols();
		} else if ($(this).val() !== 'No' && val !== 'UD') {
			coverageCheck("Ok", 'UD');
			numberCols();
		};
	});
	$('input[name="theftRebuiltFlood"]').change(function () {
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'REBUILT');
			numberCols();
		} else if ($(this).val() === 'No' && $('#checkbox3').prop("checked") === false) {
			coverageCheck("Ok", 'REBUILT');
			numberCols();
		};
	});
	$('input[name="OOSUD"]').change(function () {
		var val = getRadioVal( document.getElementById('RSgeneral'), 'driver2' );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'UD');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val !== 'UD') {
			coverageCheck("Ok", 'UD');
			numberCols();
		};
	});
	$('input[name="TERRITORY"]').change(function () {
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", $(this).attr('name'));
			numberCols();
		} else {
			coverageCheck("Ok", $(this).attr('name'));
			numberCols();
		};
	});
	$('input[name="terrneeded"]').change(function () {
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'TERRITORY');
			numberCols();
		} else {
			coverageCheck("Ok", 'TERRITORY');
			numberCols();
		};
	});
	$("[name^=IVowners]").change(function () {
		if ($(this).val() === 'No') {
			$('#IVownersTableNo').show();
		} else {
			$('#IVownersTableNo').hide();
		};
	});
	$('.address').bind('input', function(){
		if (!$(this).val()) {
			$(this).attr('placeholder', '');
		};
	});
	$('.address1').bind('input', function(){
		if (!$(this).val()) {
			$(this).attr('placeholder', '');
		};
	});
	$('.address2').bind('input', function(){
		if (!$(this).val()) {
			$(this).attr('placeholder', '');
		};
	});
	$('#addVOPtable10').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVsandPurposeUse').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums10" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;height:70px"></textarea></td><td><textarea type="text" class="noborder address" style="width:100%;height:70px"></textarea></td><td><textarea type="text" class="noborder" style="width:100%;height:70px"></textarea></td><td><textarea type="text" class="noborder" style="width:100%;height:70px"></textarea></td><td><textarea type="text" class="noborder" style="width:100%;height:70px"></textarea></td><td><label class="container">Yes<input Required type="radio" name="IVsandPurposeUse'+rowNum+'" /><span class="checkmark"></span></label><br/><br/><label class="container">No<input Required type="radio" name="IVsandPurposeUse'+rowNum+'" /><span class="checkmark"></span></label></td><td><textarea type="text" class="noborder" style="width:100%;height:70px"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVsandPurposeUse', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder','Enter a location');
			//autoAddress(this);
		});	
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums10');
			});
		});
	});
	$('#addVOPtable9').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#insuredsSpouses').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums9" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('insuredsSpouses', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums9');
			});
		});
	});
	$('#addVOPtable6').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVregisteredTable').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums6" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVregisteredTable', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums6');
			});
		});
	});
	$('#addVOPtable5').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVownersTable').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums5" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVownersTable', html, 1)
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums5');
			});
		});
	});
	
	$('#VOPtable').on('change', 'input', function () {
		var arr2 = $("#VOPtable tr td:nth-child(2) input");
		var arr3 = $("#VOPtable2 tr td:nth-child(2) input");
		for (w=0;w<arr2.length;w++) {
				$(arr3[w]).val($(arr2[w]).val());
		}
	});
	$('#EDVOPtable').on('change', 'input', function () {
		var arr2 = $("#EDVOPtable tr td:nth-child(2) input");
		var arr3 = $("#EDVOPtable2 tr td:nth-child(2) input");
		for (w=0;w<arr2.length;w++) {
				$(arr3[w]).val($(arr2[w]).val());
		}
	});
	
	$('#addVOPtable4').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#jobSites').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums4" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn address" style="width:100%;" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('jobSites', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums4');

			});
		});

	});
	$('#addVOPtable3').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#occTable').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums3" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn txtAreaGrow" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn txtAreaGrow" style="width:100%;" ></textarea></td><td><textarea required type="text" class="fillIn txtAreaGrow" style="width:100%;" ></textarea></td><td><textarea type="text" class="fillIn txtAreaGrow" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn txtAreaGrow" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn txtAreaGrow" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn txtAreaGrow center upper" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('occTable', html, 1)
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums3');
			});
		});
		$('.txtAreaGrow').on('keyup',function (e) {
			//  this if statement checks to see if backspace or delete was pressed, if so, it resets the height of the box so it can be resized properly
			//if (e.which == 8 || e.which == 46) {
				$(this).height(parseFloat($(this).css("min-height")) != 0 ? parseFloat($(this).css("min-height")) : parseFloat($(this).css("font-size"))-31);
			//}
			//  the following will help the text expand as typing takes place
			while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
				$(this).height($(this).height()+31);
			};
		});
	});

	$('#addVOPtable2').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVpurp').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums2" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="fillIn VOP1first" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVpurp', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums2');
			});
		});
		$("input.fillIn:not(#ClaimNo):not(#WITClaimNo):not(#adj):not(#adj2):not(#adj3):not(.date):not(.time):not(.phone):not(.FOL)").on('keydown', function () {
			var fontSize = $(this).css('font-size');
			if (isOverflown($(this)) && parseFloat(fontSize) > 9) {
				$(this).css('font-size', parseFloat(fontSize)-1);
			}else if (!isOverflown($(this)) && parseFloat(fontSize) < 17) {
				$(this).css('font-size', parseFloat(fontSize)+1);
			};
			if ($(this).val() =='') {
				$(this).css('font-size', 17);
			};
		
		});
	});
	$('#addVOPtable7').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVaddress').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums7" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="text" class="noborder address" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVaddress', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums7');
			});
		});
	});
	$('#addRFM').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#reasonforMove').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="RFMnums" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder RFMfirst" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td><input type="text" class="noborder address" style="width:100%"></td> <td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('reasonforMove', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('RFMnums');
			});
		});
	});
	$('#addAddressInQ').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#addressInQ').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows;
		var html = '<td class="addInQnum" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder addInQfirst address" style="width:100%;"></td><td><input class="date noborder" style="width:100%"></td><td><input type="text" class="date noborder" style="width:100%"></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('addressInQ', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('addInQnum');
			});
		});
		$('.date').each(function (index, value) {
			$(value).datepicker({
				changeMonth: true, 
				changeYear: true, 
				dateFormat: "mm/dd/yy",
				yearRange: "-90:+00"				
			});
		$(value).blur(function () {
			if ($(value).val() === '') {
				$(value).attr('type', 'text');
			};
		});
	});
		
	});
	$('#addOFACtable').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#OFACaddress').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="OFACnums" style="text-align:right;border-left:1px solid transparent!important;border-top:1px solid transparent!important;border-bottom:1px solid transparent!important;">' + rowNum + '.</td><td><input type="text" class="noborder address" style="width:100%"></input></td><td><input type="text" class="noborder OFACDate" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('OFACaddress', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('OFACnums');
			});
		});
		//$('.OFACDate').each(function(){
			/*$('.OFACDate').dateRangePicker({
				monthSelect: true,
				yearSelect: [2009, moment().get('year')],
				//startDate: moment().subtract(120, 'months').format('YYYY-MM-DD'),
				endDate: moment().endOf('day').format('YYYY-MM-DD'),
				customArrowPrevSymbol: '<i class="fa fa-arrow-circle-left"></i>',
				customArrowNextSymbol: '<i class="fa fa-arrow-circle-right"></i>'
			});*/
		//});
	});
	$('#OFACpriorlocTxt1').change(function () {
		$('#OFACpriorlocTxt2').html($(this).val().toUpperCase());
	});
	$('#addVOPtable11').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#MCTDUDfound').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums11" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;"></textarea></td><td><textarea type="date" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder phone" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('MCTDUDfound', html, 1);
		$('.phone').inputmask("(999) 999-9999");
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums11');

			});
		});

	});
	$('#addVOPtable12').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVgaragedLocations').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums12" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first address" style="width:100%;"></td><td><input type="number" class="noborder center" style="width:100%"></td><td><input type="text" class="noborder" style="width:100%"></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVgaragedLocations', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums12');
			});
		});
		
	});

	$('#addVOPtable13').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#AllVNOPinAres').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums13" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%;"></td><td><input type="text" class="noborder" style="width:100%"></td><td><input type="text" class="noborder" style="width:100%"></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('AllVNOPinAres', html, 1);
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums13');
			});
		});
	});
	$('#addVOPtable14').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#Upoints').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums14" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder center" style="width:100%"></textarea></td><td><textarea type="text" class="noborder center" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('Upoints', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums14');
			});
		});
	});
	$('#addVOPtable15').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#Ulosses').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums15" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder center" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('Ulosses', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums15');
			});
		});
	});
	$('#addVOPtable16').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#rebuiltPriors').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums16" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder center" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('rebuiltPriors', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums16');
			});
		});
	});
	$('#addVOPtable17').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#jobSitesDaily').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums17" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%;" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('jobSitesDaily', html, 1);

		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums17');
			});
		});
	});
	$('#addVOPtable18').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#jobSitesWeekly').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums18" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%;" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('jobSitesWeekly', html, 1);

		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums18');
			});
		});
	});
	$('#addVOPtable8').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#extraUDs').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums8" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;"></textarea></td><td><textarea type="date" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder phone" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('extraUDs', html, 1);
		$('.phone').inputmask("(999) 999-9999");
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums8');

			});
		});
	});
	$('#addVOPtable').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#VOPtable').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;border-top:hidden;border-right:hidden;border-bottom:hidden;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('VOPtable', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums');
				cloneTable('VOPtable', 'VOPtable2');
			});
		});
		cloneTable('VOPtable', 'VOPtable2');
	});
	
$('#addGaraging').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#VOPgarage').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="Garagenums" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder Garage1first" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;border-top:hidden;border-right:hidden;border-bottom:hidden;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('VOPgarage', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('Garagenums');
				
			});
		});
		
	});
	$('#EDaddVOPtable').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#EDVOPtable').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="EDVOPnums" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('EDVOPtable', html, 1);
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('EDVOPnums');
				cloneTable('EDVOPtable', 'EDVOPtable2');
			});
		});
		cloneTable('EDVOPtable', 'EDVOPtable2');
	});
	$('#addC1WitnessTable').click(function () {
		if ($('.witnessTable').length !== 0 ) {
			var num = $('.witnessTable').length + 2;
		}else{
			var num = 2;
		}
		var html = '<table class="tight section2 full witnessTable"><tr><td class="indent2"></td><td class="indent block">Claimant\'s vehicle:</td><td>(C'+num+')</td><td class="indent block">Year</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Make</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Model</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr><tr><td colspan="3" class="indent2"></td><td class="indent block">Color</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Body Style</td><td colspan="2"><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table>';
		$('#moreCVWitnessTable').append(html);		
	});
	$('#minusC1WitnessTable').click(function () {
		$('#moreCVWitnessTable').html('');
		
	});
	$('#BINDERaddVehTable').click(function () {
	
		if ($('.BINDERTable').length !== 0 ) {
			var num = $('.BINDERTable').length + 2;
		}else{
			var num = 2;
		}
		var html = '<div class="BINDERTable"><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Year</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Make</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Model</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Vin #</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Ins Co/Policy #</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">If no insurance, why?</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table></div>';
		$('#BINDERmoreVehTable').append(html);	
		$('#BINDERmoreVehTable').show();
	});
	$('#BINDERaddVehTable2').click(function () {
		if ($('.BINDERTable').length !== 0 ) {
			var num = $('.BINDERTable').length + 2;
		}else{
			var num = 2;
		}
		var html = '<div class="BINDERTable"><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Year</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Make</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Model</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Vin #</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Ins Co/Policy #</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">If no insurance, why?</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">What happened to this vehicle?</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table></div>';
		$('#BINDERmoreVehTable2').append(html);	
		$('#BINDERmoreVehTable2').show();
	});
	$('#BINDERaddmemberofHHVeh').click(function () {
		if ($('.BINDERmemberofHHTable').length !== 0 ) {
			var num = $('.BINDERmemberofHHTable').length + 2;
		}else{
			var num = 2;
		}
		var html = '<div class="BINDERmemberofHHTable"><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Name</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Relationship to Insured</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Year</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Make</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Model</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Vin #</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">Ins Co/Policy #</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">If no insurance, why?</td><td><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table></div>';
		$('#BINDERmoreHHVehTable').append(html);	
		$('#BINDERmoreHHVehTable').show();
	});
	$('#BINDERminusVehTable').click(function () {
		$('#BINDERmoreVehTable').html('');
		$('#BINDERmoreVehTable').hide();		
	});
	$('#BINDERminusVehTable2').click(function () {
		$('#BINDERmoreVehTable2').html('');
		$('#BINDERmoreVehTable2').hide();
	});
	$('#BINDERminusmemberofHHVeh').click(function () {
		$('#BINDERmoreHHVehTable').html('');
		$('#BINDERmoreHHVehTable').hide();
	});
	$('#addCVWitnessDetailsTable').click(function () {
		if ($('.witnessTable2').length !== 0 ) {
			var num = $('.witnessTable2').length + 2;
		}else{
			var num = 2;
		}
		var html = '<table class="tight section2 full witnessTable2"><tr><td class="indent2"></td><td class="indent block" style="width:160px;">Claimant\'s vehicle:</td><td class="indent block">(C'+num+') Direction:</td><td colspan="2"><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Speed:</td><td colspan="2"><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block" style="width:160px !important;"></td><td class="indent block">Stop Sign?</td><td class="indent block"><label class="container">Yes<input required type="radio" name="witnessCV'+num+'SS" /><span class="checkmark"></span></label></td><td class="indent"><label class="container">No<input type="radio" name="witnessCV'+num+'SS" /><span class="checkmark"></span></label></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block" style="width:160px !important;"></td><td class="indent block">Traffic Light Color:</td><td><label class="container">Green<input required type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td><td><label class="container">Green Arrow<input type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td><td><label class="container">Yellow<input type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td><td><label class="container">Red<input type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block" style="width:160px !important;"></td><td class="indent block">Did Claimant fail to observe stop sign or traffic light?</td><td class="block"><label class="container">Yes<input required type="radio" name="WitnessCV'+num+'runControl" /><span class="checkmark"></span></label></td><td class=""><label class="container">No<input type="radio" name="WitnessCV'+num+'runControl" /><span class="checkmark"></span></label></td></tr></table>';
		$('#CVWitnessDetailsTable').append(html);
		
	});

	$('#minusCVWitnessDetailsTable').click(function () {
		$('#CVWitnessDetailsTable').html('');
	});
	$('#addCVWitnessDamagesTable').click(function () {
		if ($('.witnessTable3').length !== 0 ) {
			var num = $('.witnessTable3').length + 2;
		}else{
			var num = 2;
		}
		var html = '<table class="tight section2 full witnessTable3" style="padding-top:15px;"><tr><td class="indent2"></td><td class="indent block">Claimant\'s vehicle: (C'+num+')</td><td><input Required type="text" class="fillIn FOL" style="width: 100%"/></td></tr><tr><td class="indent2"></td><td class="indent" colspan="2"><input type="text" class="fillIn FOL" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent">Was there any damage to the vehicle prior to the loss?</td><td class="indent"><label class="container">Yes<input required type="radio" name="witnessCV'+num+'UPD" value="Yes" /><span class="checkmark"></span></label></td><td class="indent"><label class="container">No<input type="radio" name="witnessCV'+num+'UPD" value="No" /><span class="checkmark"></span></label></td></tr></table><table class="tight section2 full" style="display:none;"><tr><td class="indent2"></td><td class="indent block">If yes: What was previously damaged?</td><td><input Required type="text" class="fillIn FOL" style="width: 100%"/></td></tr><tr><td class="indent2"></td><td class="indent" colspan="2"><input type="text" class="fillIn FOL" style="width: 100%"/></td></tr></table>';
	$('#CVWitnessDamagesTable').append(html);
	$('input[name="witnessCV'+num+'UPD"]').change(function () {
		hideshow($(this),$(this).parents('table').next('table'));	
	});
	});
	$('#minusCVWitnessDamagesTable').click(function () {
		$('#CVWitnessDamagesTable').html('');		
	});
	$('#OutOfState').change(function (index, value) {
		var state = $(this).val();
		$('.theState').each(function () {
			//var punc = $(this).html()
			$(this).html(state);
		});
	});
	$('#UDinfoSpacer').width($('#refTD').outerWidth() - 2);
	(function (timer) {


		$(window).scroll(function () {
			$('#blurDIV').removeClass('hide-scrollbar');
			$('#blurDIV').addClass('show-scrollbar');

			clearTimeout(timer);
			timer = setTimeout(function () {
				$('#blurDIV').removeClass('show-scrollbar');
				$('#blurDIV').addClass('hide-scrollbar');


			}, 100);

		});

	})();

	loadFunctions();

$('.rowNumbers2').bind('input', function(){
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();
		let table = $(this).parents("table").next("table");
		$('[name^="dynamic_"]').prop('name','');
		if (inpNum === '' || inpNum === '0') {
			$('#' + table.attr('id')).hide();
			$('#cvTable').hide();
			$('#cvTables').hide();
			$('#cvdamages').hide();
			$('#otherPartyControls').hide();
			$('#cvTickets').hide();
			numberCols();
			return;
		} else {
			$('#' + table.attr('id')).show();
			$('#otherPartyControls').show();
			$('#cvTable').show();
			$('#cvTables').show();
			$('#cvdamages').show();
			$('#cvTickets').show();
		};
		var tableRef = $(table).attr('id');

		numRows = document.getElementById(tableRef).rows[0].cells.length;
		
		if (inpNum >= numRows) {
			newRows = inpNum - numRows;
			rowNum = parseInt(numRows) + 1;
			var html = '<input type="text" class="fillIn"  style="width:100%;"/>';
			
			addColumn($(table).attr('id'), html, newRows);

		} else {
			newRows = parseInt(inpNum - numRows) * -1;
			rowNum = numRows + 1;
			deleteColumn($(table).attr('id'), newRows);
			var arr = $("[id^=cvTable_]");
			var i;
			for (i = inpNum - 1; i < arr.length; i++) {

				$(arr[i]).remove();
			};


		};
		if (inpNum >= numRows && inpNum >= 2) {
			newRows = inpNum - numRows;

			numberCols();
		} else {

		};


	});
$('.rowNumbers6').bind('input', function(){
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();
		let table = $(this).parents("table").next("table");
		$('[name^="dynamic_"]').prop('name','');
		if (inpNum === '' || inpNum === '0') {
			$('#' + table.attr('id')).hide();
			$('#pddamages').hide();
			numberCols();
			return;
		} else {
			$('#' + table.attr('id')).show();
			$('#pddamages').show();
		};
		var tableRef = $(table).attr('id');

		numRows = document.getElementById(tableRef).rows[0].cells.length;
		
		if (inpNum >= numRows) {
			newRows = inpNum - numRows;
			rowNum = parseInt(numRows) + 1;
			var html = '<input type="text" class="fillIn"  style="width:100%;"/>';
			
			addColumn2($(table).attr('id'), html, newRows);

		} else {
			newRows = parseInt(inpNum - numRows) * -1;
			rowNum = numRows + 1;
			deleteColumn($(table).attr('id'), newRows);
			


		};
		if (inpNum >= numRows && inpNum >= 2) {
			newRows = inpNum - numRows;

			numberCols();
		} else {

		};


	});	
$('.rowNumbers').bind('input', function(){
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();
		

		let table = $(this).parents("table").next("table");
		$('[name^="dynamic_"]').attr('name','');
		if (inpNum == 0 && (table.attr('id')=="CVpassTable" ||table.attr('id')=="IVpassTable")) {
			table.hide();
		}else{
			table.show();
		}
		var tableRef = $('#' + $(table).attr('id') + '>tbody')[0];
		numRows = parseInt(tableRef.rows.length);
		if (inpNum > numRows) {
			newRows = inpNum - numRows;
			rowNum = numRows + 1;
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:14px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn center upper" style="width:100%"></textarea></td></tr>';
			addRows($(table).attr('id'), html, newRows);
			$('.phone').inputmask({
				mask: "(999) 999-9999",
				showMaskOnHover: false,
				placeholder: ' ',
			});
			
			$('.address').focus(function () {
				$(this).attr('placeholder', 'Enter a location');
				//autoAddress(this);
			});
			$('.address').blur(function () {
				$(this).parent().next().find('input').focus();
				if (!$(this).val()) {
					$(this).attr('placeholder', '');
				};
			});
		} else {
			newRows = parseInt(inpNum - numRows) * -1;
			rowNum = numRows + 1;
			removeRows($(table).attr('id'), newRows)
		};

	});
	$('.rowNumbers3').bind('input', function(){
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();


		let table = $(this).parents("table").next("table");

		var tableRef = $('#' + $(table).attr('id') + '>tbody')[0];
		numRows = parseInt(tableRef.rows.length);
		if (inpNum > numRows) {
			newRows = inpNum - numRows;
			rowNum = numRows + 1;
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><input type="text" class="fillIn" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%; font-size:14px" ></input></td><td><input type="text" class="fillIn phone" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%"></input></td></tr>';
			addRows($(table).attr('id'), html, newRows);

		} else {
			newRows = parseInt(inpNum - numRows) * -1;
			rowNum = numRows + 1;
			removeRows($(table).attr('id'), newRows)
		};

	});
	var clicked = false,
		clickY;
	$(document).on({
		'mousemove': function (e) {
			clicked && updateScrollPos(e);
		},
		'mousedown': function (e) {
			clicked = true;
			clickY = e.pageY;
		},
		'mouseup': function () {
			clicked = false;
			$('html').css('cursor', 'auto');
		}
	});

	var updateScrollPos = function (e) {
		$('html').css('cursor', 'row-resize');
		$(window).scrollTop($(window).scrollTop() + (clickY - e.pageY));
	};
	$('.rowNumbers4').bind('input', function(){
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();


		let table = $(this).parents("table").next("table").next("table");
		var tableRef = $('#' + $(table).attr('id') + '>tbody')[0];
		numRows = parseInt(tableRef.rows.length);
		if (inpNum > numRows) {
			newRows = inpNum - numRows;
			rowNum = numRows + 1;
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:14px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td></tr>';
			addRows($(table).attr('id'), html, newRows);

			$('.address').focus(function () {
				$(this).attr('placeholder', 'Enter a location');
			//	autoAddress(this);
			});
			$('.address').blur(function () {
				$(this).parent().next().find('input').focus();
				if (!$(this).val()) {
					$(this).attr('placeholder', '');
				};
			});

		} else {
			newRows = parseInt(inpNum - numRows) * -1;
			rowNum = numRows + 1;
			removeRows($(table).attr('id'), newRows);
		};

	});
	$('.rowNumbers5').bind('input', function(){
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();


		let table = $(this).parents("table").next("table").next("table");
		var tableRef = $('#' + $(table).attr('id') + '>tbody')[0];
		numRows = parseInt(tableRef.rows.length);
		if (inpNum > numRows) {
			newRows = inpNum - numRows;
			rowNum = numRows + 1;
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:14px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td></tr>';
			addRows($(table).attr('id'), html, newRows);
			$('.address').focus(function () {
				$(this).attr('placeholder', 'Enter a location');
				//autoAddress(this);
			});
			$('.address').blur(function () {
				$(this).parent().next().find('input').focus();
				if (!$(this).val()) {
					$(this).attr('placeholder', '');
				};
			});
		} else {
			newRows = parseInt(inpNum - numRows) * -1;
			rowNum = numRows + 1;
			removeRows($(table).attr('id'), newRows);
		};

	});
	$.fn.setCursorPosition = function(pos) {
		  this.each(function(index, elem) {
			if (elem.setSelectionRange) {
			  elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
			  var range = elem.createTextRange();
			  range.collapse(true);
			  range.moveEnd('character', pos);
			  range.moveStart('character', pos);
			  range.select();
			}
		  });
		  return this;
		};
		$.fn.getCursorPosition = function() {
			var el = $(this).get(0);
			var pos = 0;
			if('selectionStart' in el) {
				pos = el.selectionStart;
			} else if('selection' in document) {
				el.focus();
				var Sel = document.selection.createRange();
				var SelLength = document.selection.createRange().text.length;
				Sel.moveStart('character', -el.value.length);
				pos = Sel.text.length - SelLength;
			}
			return pos;
		};
		$('td').not('.number').each(function () {
		if (!$(this).find('input').is(':text') && !$(this).find('input').is(':radio') && $(this).text() !== '') {
			if ($(this).closest('tr').find('td:eq(0)').hasClass('number') || $(this).closest('tr').find('td:eq(0)').hasClass('indent2')) {
			$(this).attr('title','Select a language to translate.');
			};
		};
	});
	
	$('.editable').on('click', function () {
		setTimeout(function() {
			$(this).focus();
		}, 0);
	});
	jQuery(function($){
    $(".test").focusout(function(){
        var element = $(this);        
        if (!element.text().replace(" ", "").length) {
            element.empty();
        }
    });
});
  $('#addGRSOcc').click(function () {
		var clone = $('#InsuredOccupationGeneralRS1').clone();
		var num = parseInt($('div[id^=InsuredOccupationGeneralRS]').length)+1;
		clone.find('table td:eq(1)').empty();
		clone.find('table td:eq(1)').append('<i class="fa fa-minus-circle noprint minusGRSOcc" style="padding-top:2px;color:red;cursor:pointer;" title="Click to remove question."></i>');
		clone.find('table td:eq(2)').empty();
		clone.find('table td:eq(2)').append('<span onclick="selectElementContents(this)" contenteditable class="addInsdOccupation" style="width:150px;text-transform:capitalize !important">[Name]</span>\'s occupation?');
		clone.find('table:eq(1) td:eq(1)').empty();
		clone.find('table:eq(1) td:eq(1)').append('<span style="text-transform:capitalize !important" class="addInsdName"></span>\'s job title?');
		clone.find('table:eq(2) td:eq(1)').empty();
		clone.find('table:eq(2) td:eq(1)').append('<span style="text-transform:capitalize !important" class="addInsdName"></span>\'s Employer\'s Name');
		clone.find('.autogrow').val('');
		clone.find('.autogrow').css({width:'150'});
		clone.find('.fillIn').val('');
		clone.attr('id','InsuredOccupationGeneralRS'+num);
			
	for (var r = 0; r < $('div[id^=InsuredOccupationGeneralRS]').length; r++) {
	clone.insertAfter($('div[id^=InsuredOccupationGeneralRS]')[r]);
	}
	$("input.autogrow").autoGrowInput({minWidth:150,comfortZone:1});
		numberCols();
	$('.minusGRSOcc').click(function () {
		$(this).closest('div').remove();
		numberCols();
	});
	$(".addInsdOccupation").on('keyup', function () {
		var eleIndex = $(".addInsdOccupation").length - 1;
		//$(".addInsdName"+eleIndex).html($(this).text())
		var ele = $(this).closest('table').next().find('.addInsdName');
		ele.html($(this).text());
		$(ele).closest('table').next().find('.addInsdName').html($(this).text());
		console.log(eleIndex);
	});
	if ($('.addInsdOccupation').length > 0) {
			selectElementContents($('.addInsdOccupation')[$('.addInsdOccupation').length-1]);
		}else{
			selectElementContents($('.addInsdOccupation')[0]);
		};
});
$('#addFUQ').click(function () {
		var clone = $('#FUQuestions1').clone();
		var num = parseInt($('table[id^=FUQuestions]').length)+1;
		clone.find('td:eq(0)').empty();
		clone.find('td:eq(0)').append('<i class="fa fa-minus-circle noprint FUQminus" style="padding-top:2px;color:red;cursor:pointer;" title="Click to remove insured."></i>');
		clone.find('.editable').text('');
		clone.find('.autogrow').val('');
		clone.find('.autogrow').css({width:'150'});
		clone.find('.FOL').val('');
		clone.attr('id','FUQuestions'+num);
		
	$(clone).on('input', '.FOL', function() {
		var cursPosPre = $(this).getCursorPosition();
		var valLength = $(this).val().length;
		if (isOverflown($(this))) {
			var $this = $(this).val();
			var stringsplit = $this.split(' ');
			var stringsplit2 = $this.split(' ').pop();
			var cursPos = $(this).getCursorPosition();
				stringsplit.pop();
			var curTxt = $(this).closest('tr').next().find('.FOL').val();
				if (curTxt == '') {
					$(this).closest('tr').next().find('.FOL').val(stringsplit2+curTxt);
					$(this).closest('tr').next().find('.FOL').focus();
			
				}else{
					$(this).closest('tr').next().find('.FOL').val(stringsplit2+" "+curTxt);	
					
				};
				$(this).closest('tr').next().find('.FOL').trigger('input');
				$('[name='+$(this).closest('tr').next().find('.FOL').prop('name')+']').setCursorPosition(stringsplit2.length);
				
				if (cursPos < stringsplit.slice(0,stringsplit.length).join(' ').length) {
					$(this).val(stringsplit.slice(0,stringsplit.length).join(' '));
					$(this).focus();
					
					$(this).setCursorPosition(cursPos);
				}else{
					$(this).val(stringsplit.slice(0,stringsplit.length).join(' '));
				};
				$(this).closest('tr').next().find('.FOL').trigger('input');
		};
	});	
	for (var r = 0; r < $('table[id^=FUQuestions]').length; r++) {
	clone.insertAfter($('table[id^=FUQuestions]')[r]);
	}
	$("input.autogrow").autoGrowInput({minWidth:150,comfortZone:1});
		numberCols();
	$('.FUQminus').click(function () {
		$(this).closest('table').remove();
		numberCols();
	});
	$('.editable').on('click', function () {
		setTimeout(function() {
			$(this).focus();
		}, 0);
	});
});
$('#RSgeneral')[0].reset();	

	/*end of document ready*/
	
});
function showMain() {
var arr = ['#cvTable', '#cvTables', '#secondPart', '#addVehicles', '#folTable', '#lastPart', '#addProperty'].join(', ');
$(arr).show();
$('.collapsible i').attr("class", 'fa fa-minus');
	/*$('#cvTable').show();
	$('#cvTables').show();
	$('#secondPart').show();
	$('#addVehicles').show();
	$('#folTable').show();
	$('#lastPart').show();
	$('#addProperty').show();*/
	$('.rowNumbers2').trigger('input');
	$('.rowNumbers6').trigger('input');
}
function hideMain() {
var arr = ['#cvTable', '#cvTables', '#secondPart', '#addVehicles', '#folTable', '#lastPart', '#addProperty'].join(', ');
var count = 0;
var ele = [];
for (const element of arr.split(', ')) {
	count = count + $(element + ' input:radio:checked').length;
	
	//ele = ele.filter(function(x) {return x !== undefined;});
	 $(element + ' input:radio:checked').each(function() {
		ele.push($(this).parent().text());
	});
};
console.log(ele);
if (count === 0) {
		
		$(arr).hide();
		$('.collapsible i').attr("class", 'fa fa-plus');
	}else{
		$('#blurDIV').addClass('blur');
		$.alert({
			title: 'Information',
			type: 'blue',
			icon: 'fa fa-info-circle',
			content: 'Unable to collapse sections with checked boxes. Please uncheck the "' +ele.join(" & ")+ '" box and try again.',
			boxWidth: '30%',
			useBootstrap: false,
			buttons: {
				Ok: function () {
					$('#blurDIV').removeClass('blur');
				}
			}
		});
	};

	/*$('#cvTable').hide();
	$('#cvTables').hide();
	$('#secondPart').hide();
	$('#addVehicles').hide();
	$('#folTable').hide();
	$('#lastPart').hide();
	$('#addProperty').hide();*/
}
function coverageCheck(status, ele) {

	var arr = $(".hidden");

	$('.hidden').each(function (index, value) {
		if (status === "Ok" && $(value).attr('id') === ele) {
			$(value).hide();

		} else if (status !== "Ok" && $(value).attr('id') === ele) {
			$(value).show();
			
		};
	});
	if (ele === 'UD' && status !== 'Ok') {
		$('#UWQHHmembers').removeClass('hiddenUWQ').show();
	};
	if (ele === 'POINTS' && status !== 'Ok') {
		$('#UWQDL').removeClass('hiddenUWQ').show();
		$('#UWQAFA').removeClass('hiddenUWQ').show();
	};
	if (ele === 'BIZ' && status !== 'Ok') {
		$('#UWQBiz').removeClass('hiddenUWQ').show();
	};
	var title2 = title.replace("Recorded Statement General, ",""); 
	for (var i = 0; i < arr.length; i++) {
		if ($(arr[i]).attr('id') === ele && $(arr[i]).css('display') !== 'none') {
			if (!title.includes(ele)) {
				title += ", " + $(arr[i]).attr('id');
				if (ele === "FLOOD" || ele === "FIRE") {
					title2 = title.replace("Recorded Statement General, ","");
				}else{
					title2 = title.replace("Recorded Statement General, ",""); //", " + $(arr[i]).attr('id');
				};
				if (title2.indexOf("FLOOD")!== -1 || title2.indexOf("FIRE")!== -1) {
					title2 = title2.replace("GENERAL, ","");
				};
				$('#docTitle').html(title2.replace(/_/g, " ")); 
				$(document).attr('title', title.replace(/_/g, " "));
				$('#footer').html(title.replace(/_/g, " "));
				
			}else{
				title = title.replace(", " + $(arr[i]).attr('id'), '');
				title += ", " + $(arr[i]).attr('id');
				title2 = title.replace("Recorded Statement General, ",""); //", " + $(arr[i]).attr('id');
				$('#docTitle').html(title2.replace(/_/g," "));
				$(document).attr('title', title.replace(/_/g, " "));
				$('#footer').html(title.replace(/_/g, " "));
			}
		} else if ($(arr[i]).attr('id') === ele && $(arr[i]).css('display') === 'none') {
			title = title.replace(", " + $(arr[i]).attr('id'), '');
			title2 = title.replace("Recorded Statement General, ","");//title2.replace(", " + $(arr[i]).attr('id'), '');
			if (title2 === 'Recorded Statement General') {
				$('#docTitle').html('GENERAL');
			}else{
				$('#docTitle').html(title2.replace(/_/g, " "));
			}
			$(document).attr('title', title.replace(/_/g, " "));
			$('#footer').html(title.replace(/_/g, " "));
		} 
		
	}
	if ($('.coverageIssue:visible').length) {
		//$('#AgentQuestions').show();
		$('#UWQUESTIONS').show();
		$('#checkbox6').prop('checked',true);
		$('#checkbox6').attr('disabled',true);
		$('#checkbox6').parent().css('color','silver');
		$('#checkbox6').next().css('border-color','silver');
	}else{
		$('#checkbox6').attr('disabled',false);
		$("label[for='checkbox6']").removeClass('disabledInput');
		$('#checkbox6').parent().css('color','initial');
		$('#checkbox6').next().css('border-color','initial');
		//$('#AgentQuestions').hide();
		if ($('input:checked[name="IVupd"],input:checked[name="THEFTIVupd"],input:checked[name="IVupd2"],input:checked[name="IVupd3"]').val() !== "Yes") $('#UWQUESTIONS').hide();
		//$('#UWQHHmembers, #UWQDL, #UWQAFA, #UWQFelony, #UWQFraud, #UWQIVOwner, #UWQUPD, #UWQBiz, #UWQMex, #UWQImpairment').addClass('hiddenUWQ').hide();
		$('#checkbox6').prop('checked',false);
		
		
	}
};

function loadFunctions() {
	title = 'Recorded Statement General';
	$('#IVownersTableNo').hide();
	$('#VNOPrental').hide();
	$('#cvTable').hide();
	$('#cvdamages').hide();
	$('#otherCVs').hide();
	$('#otherPartyControls').hide();
	$('#cvTickets').hide();
	$("#NOresideVNOPOYes").hide();
	$("#NOresideVNOPONo").hide();
	$("#NON-OWNER_TO_DO").hide();
	$('#witnessPDTable, #witnessCV1UPDTable, #witnessIVUPDTable').hide();
	$('.hidden').each(function (index, value) {
		$(value).hide();
	});
	
	$('input[name="VNOPrental"]').change(function () {
		hideshow($(this),$("#VNOPrental"));
		/*if ($(this).val() === 'Yes') {
			$('#VNOPrental').show();
			numberCols();
		} else {
			$('#VNOPrental').hide();
			numberCols();
		};*/
	});
	
	$('input[name="NOrental"]').change(function () {
			/*if ($(this).val() === 'Yes') {
			$('#NOrented').show();
			$('#NOowned').hide();
			numberCols();
		} else {
			$('#NOowned').show();
			$('#NOrented').hide();
			numberCols();
		};*/
		hideshow($(this),$("#NOrented"),$("#NOowned"));
	});
	$('input[name="witnessIVUPD"]').change(function () {
			hideshow($(this),$('#witnessIVUPDTable'));
	});
	$('input[name="witnessCV1UPD"]').change(function () {
			hideshow($(this),$(this).parents('table').next('table'));	
	});
	$('input[name="witnessPD"]').change(function () {
			hideshow($(this),$('#witnessPDTable'));
	});
	$("td").not('.number').on('click', function () {	
		if ($('input[name="lang"]').is(':visible')) {
			translateTo('lang', 'other_lang', $(this));
		}
		if ($('input[name="FUQlang"]').is(':visible')) {
			translateTo('FUQlang', 'FUQother_lang', $(this));
		}
		if ($('input[name="WITlang"]').is(':visible')) {
			translateTo('WITlang', 'WITother_lang', $(this));
		}
    });
		
	numberCols();
	$("td.numspacer").each(function (i, v) {
		$(this).css('width', '35px');
	});
	
	var interval;
	$('.scroll-up-button').on('mousedown', function (e) {
		interval = setInterval(function () {
			var scrollIndex = $(window).scrollTop(); // current page position
			$(window).scrollTop(scrollIndex - 150); // scroll up 150px
		}, 100); // 500ms between each frame
	});
	$('.scroll-up-button').on('mouseup', function (e) {
		clearInterval(interval);
		var scrollIndex = $(window).scrollTop(); // current page position
		$(window).scrollTop(scrollIndex - 150); // scroll up 150px
	});

	$('.scroll-up-button').on('mouseout', function (e) {
		clearInterval(interval);
	});

	$("#scrollBottom").click(function() { 
	
		$.fn.scrollBottom = function(scroll){
		  if(typeof scroll === 'number'){
			window.scrollTo(0,$(document).height() - $(window).height() - scroll);
			return $(document).height() - $(window).height() - scroll;
		  } else {
			return $(document).height() - $(window).height() - $(window).scrollTop();
		  }
		}
		
	  $(window).scrollBottom(0);
		return false;	
     }); 
	 $("#scrollTop").click(function() { 
		$(window).scrollTop(0);
		return false;	
     }); 
	$('.scroll-down-button').on('mousedown', function (e) {
		interval = setInterval(function () {
			var scrollIndex = $(window).scrollTop(); // current page position
			$(window).scrollTop(scrollIndex + 150); // scroll down 150px
		}, 100); // 500ms between each frame
	});
	$('.scroll-down-button').on('mouseup', function (e) {
		clearInterval(interval);
		var scrollIndex = $(window).scrollTop(); // current page position
		$(window).scrollTop(scrollIndex + 150); // scroll down 150px
	});

	$('.scroll-down-button').on('mouseout', function (e) {
		clearInterval(interval);
	});
	$('input[name="RSother"]').on('change', function () {
		if ($(this).val() !== '') {
			var pTitle = $(this).val();
			$(this).parents(".section").next("table").find('.fillIn').each(function () {
				var preTitle = $(this).closest('tr').find('td').html();
				$(this).attr('title', preTitle + " of " + pTitle);

			});
			if (getRadioVal(document.getElementById('RSgeneral'), 'RSother') == "Translator" || getRadioVal(document.getElementById('RSgeneral'), 'RSother') == "Attorney") {
				toggleRequired($(this).parents(".section").next("table").find('.fillIn'), true);
			}else{
				toggleRequired($(this).parents(".section").next("table").find('.fillIn'), false);
				
			};
		};
	});
	

$('table').on('input', '.FOL', function() {
		var cursPosPre = $(this).getCursorPosition();
		var valLength = $(this).val().length;
		if (isOverflown($(this))) {
			var $this = $(this).val();
			var stringsplit = $this.split(' ');
			var stringsplit2 = $this.split(' ').pop();
			var cursPos = $(this).getCursorPosition();
				stringsplit.pop();
			var curTxt = $(this).closest('tr').next().find('.FOL').val();
				if (curTxt == '') {
					$(this).closest('tr').next().find('.FOL').val(stringsplit2+curTxt);
					$(this).closest('tr').next().find('.FOL').focus();
			
				}else{
					$(this).closest('tr').next().find('.FOL').val(stringsplit2+" "+curTxt);	
					
				};
				$(this).closest('tr').next().find('.FOL').trigger('input');

				$('[name='+$(this).closest('tr').next().find('.FOL').prop('name')+']').setCursorPosition(stringsplit2.length);
				
				if (cursPos < stringsplit.slice(0,stringsplit.length).join(' ').length) {
					$(this).val(stringsplit.slice(0,stringsplit.length).join(' '));
					$(this).focus();
					
					$(this).setCursorPosition(cursPos);
				}else{
					$(this).val(stringsplit.slice(0,stringsplit.length).join(' '));
				};
				$(this).closest('tr').next().find('.FOL').trigger('input');
		};
	});

	$("input.fillIn:not(#ClaimNo):not(#WITClaimNo):not(#adj):not(#adj2):not(#adj3):not(.date):not(.time):not(.phone):not(.FOL)").on('keydown', function () {
		var fontSize = $(this).css('font-size');
		if (isOverflown($(this)) && parseFloat(fontSize) > 9) {
			$(this).css('font-size', parseFloat(fontSize)-1);
		}else if (!isOverflown($(this)) && parseFloat(fontSize) < 17) {
			$(this).css('font-size', parseFloat(fontSize)+1);
		};
		if ($(this).val() =='') {
			$(this).css('font-size', 17);
		};
		
	});

/*	$('#addUDSec').click(function () {
		var UDsec = $('#UD').clone();
		UDsec.find('#addUDSec').remove();
		UDsec.find('.printdiv').remove();
		$('#moreUD').append(UDsec);
	}); */
	
	$('.IVs').keydown(function () {

		if (isOverflown($(this))) {

			var $this = $(this).val();
			var stringsplit = $this.split(' ');
			$(this).closest('td').next().find('.IVs').val(stringsplit.pop())
			$(this).val(stringsplit.join(' '));
			$(this).closest('td').next().find('.IVs').focus();
		};

	});

	$('#RSNumother').change(function () {
		if ($(this).val() !== '') {
			$(this).attr('type','text');
			var $this = $(this);
			$this.val(ordinal_suffix_of($this.val()));
		}else{
			$(this).attr('type','number');
		}
	});
	$('input:Required').change(function () {
	
	if ( $( this ).hasClass( "banners" ) ) {
		var el = document.querySelectorAll(":required");
		$(el).each(function () {
			if ($(el).is(":visible")) {
				if ($(this)[0].checkValidity()) {
					
					$(this).next('span').removeClass('banners');
				};
			};
		});
		$(this).removeClass('banners');
	};
	});

	$('.currency').each(function () {
		$(this).inputmask("currency");
	});

	//$('#ClaimNo').inputmask("A[A]-999999");
	$('#OFACClaimNo').inputmask("A[A]-999999");
	$('#AgentClaimNo').inputmask("A[A]-999999");
	/*$('.time').inputmask("[hh:mm]", {
        placeholder: "HH:MM", 
        insertMode: false, 
        showMaskOnHover: false,
        hourFormat: 12
      }
   );*/
	$('#FUQClaimNo').inputmask("A[A]-999999");
	$('#WITClaimNo').inputmask("A[A]-999999");
	$('.phone').inputmask({
		mask: "(999) 999-9999",
		showMaskOnHover: false,
		placeholder: ' ',
		});
	$('.SSN').inputmask("999-99-9999");
	var autocomplete;
	$('.address').focus(function () {
		$(this).attr('placeholder', 'Enter a location');
		//autoAddress(this);

	});

	$('.address1').focus(function () {
		$(this).attr('placeholder', 'Enter a location');
		//autoAddress(this);
	});
	$('.address').blur(function () {
		$(this).parent().next().find('input').focus();
		if (!$(this).val()) {
			$(this).attr('placeholder', '');

		};

	});

};

function removeRows(tableID, numRows) {

	let table = document.getElementById(tableID);
	var tableRef = table.getElementsByTagName('tbody')[0];

	var text;
	var inp;
	var inp2;
	var inp3;


	i = tableRef.rows.length;

	for (var j = 0; j < numRows; j++) {
		$('#' + tableID + ' tr:last').remove();

	};
};

function addRows(tableID, myHtmlContent, numRows) {

	let table = document.getElementById(tableID);
	var tableRef = table.getElementsByTagName('tbody')[0];

	var text;
	var inp;
	var inp2;
	var inp3;

	i = tableRef.rows.length;

	for (var j = 0; j < numRows; j++) {
		var newRow = tableRef.insertRow(i);
		newRow.id = "wholeRow" + i;
		newRow.innerHTML = myHtmlContent;

	}

	if ($('.rowNums')[0]) {
		for (var j = 0; j < numRows; j++) {
			var n = i + 1;

			$('.rowNums').each(function () {

				$(this).html(n++ + ".")
				$(this).removeClass("rowNums")
			});
		};
	};

};
var componentForm = {
	street_number: 'short_name',
	route: 'short_name',
	locality: 'short_name',
	administrative_area_level_1: 'short_name',
	postal_code: 'short_name'
};
var address1 = {
	street_number: 'short_name',
	route: 'short_name'
};
var address2 = {
	locality: 'short_name',
	administrative_area_level_1: 'short_name',
	postal_code: 'short_name'
};

function autoAddress(input) {
	var options = {
		componentRestrictions: {
			country: 'us'
		}
	};
	 autocomplete = new google.maps.places.Autocomplete(input, options);

	google.maps.event.addListener(autocomplete, 'place_changed',
		function () {
			//fillInAddress(input, autocomplete);
		});
}
function normalAddress(input) {
	var options = {
		componentRestrictions: {
			country: 'us'
		}
	};
	autocomplete = new google.maps.places.Autocomplete(input, options);

}
function fillInAddress(input, autocomplete) {
	$(input).val('');

	// Get the place details from the autocomplete object.
	var place = autocomplete.getPlace();
	var val = '';
	var val2 = '';

	if (!($(input).hasClass("address1") || $(input).hasClass("address2"))) {
		// Get each component of the address from the place details,
		// and then fill-in the corresponding field on the form.
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (componentForm[addressType]) {
				val += place.address_components[i][componentForm[addressType]] + " ";

				$(input).val(val);
				$(input).trigger('keydown');
			}

		}
	} else {
		// Get each component of the address from the place details,
		// and then fill-in the corresponding field on the form.
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (address1[addressType]) {
				val += place.address_components[i][address1[addressType]] + " ";

				$(input).val(val);
				$(input).trigger('keydown');
			}
			if (address2[addressType]) {
				val2 += place.address_components[i][address2[addressType]] + " ";
				$(input).closest('tr').next().find('.fillIn.address2').val(val2);
				$(input).closest('tr').next().find('.fillIn.address2').trigger('keydown');
				var input2 = $(input).closest('tr').next().find('.fillIn.address2');
				$(input2).closest('tr').next().find('input').focus();
			
			}

		}
	}
	
	$(input).trigger('keydown');
	$(input).closest('tr').next().find('.fillIn.address2').trigger('keydown');
}

function titleCase(str) {
	
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	//var newStrng = str.join(' ');
	return str.join(' ');
	/*return charCase1(newStrng);*/
	//return str.toUpperCase();
}

function charCase1(str) {
	str = str.split('/');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase2(str.join('/'));
}

function charCase2(str) {
	str = str.split('.');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase3(str.join('.'));
}
function charCase3(str) {
	str = str.split('Afic');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase4(str.join('AFIC'));
}
function charCase4(str) {
	str = str.split('Iv');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase5(str.join('IV'));
}
function charCase5(str) {
	str = str.split('Cv');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase6(str.join('CV'));
}
function charCase6(str) {
	str = str.split('Fol');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase7(str.join('FOL'));
}
function charCase7(str) {
	str = str.split('Dol');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase8(str.join('DOL'));
}
function charCase8(str) {
	str = str.split('Lh');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase9(str.join('LH'));
}
function charCase9(str) {
	str = str.split('Vnop');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase10(str.join('VNOP'));
}
function charCase10(str) {
	str = str.split('Ud');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase11(str.join('UD'));
}
function charCase11(str) {
	str = str.split('Ed');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase12(str.join('ED'));
}
function charCase12(str) {
	str = str.split('Dop');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return charCase13(str.join('DOP'));
}
function charCase13(str) {
	str = str.split('Tcr');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}

	return str.join('TCR');
}
function isOverflown(el) {
	var s = $('<span>' + el.val().toUpperCase() + '</span>');
	s.css({
		position: 'absolute',
		left: -9999,
		top: -9999,
		// ensure that the span has same font properties as the element
		'font-family': el.css('font-family'),
		'font-size': el.css('font-size'),
		'font-weight': el.css('font-weight'),
		'font-style': el.css('font-style')
	});
	$('body').append(s);
	var result = s.width() + 10 >= el.width();

	
	//remove the newly created span
	s.remove();
	return result;
}


function clearAll() {
	
	  var r = confirm("Are you sure you'd like to reload the page and lose any unsaved data?");
	  if (r == true) {
		location.reload();
	  } else {
		  return;
	  }

}

var heading;
function printFunction(data) {
	//var keyID = $('#ClaimNo').val() + ' ' + $('#RStakenWith').val().toUpperCase() + ' ' + $('#Date_of_RS').val() + ' ' + $("input[name='RSNo']:checked").val() + ' ('+document.title+')';
	var keyID = $("input[id$='ClaimNo']:visible").val() + ' ' + $("input[id$='RStakenWith']:visible").val().toUpperCase() + ' ' + $("input[id$='Date_of_RS']:visible").val() + ' ' + $("input[name$='RSNo']:checked:visible").val() + ' ('+document.title+')';
	var formIdentifier = `${keyID}`; 
	localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
var conf = 0;	
 var docTitle = document.title;
 var i = 0;
	$.when($('.required').each(function () {
		toggleRequired(this, true)
	})).done(function () {
		var i = 0;
		var text = 'Missing information detected. Please complete the required fields highlighted with a red border.<br /><br />You may also click the print button below to proceed without filling in the required fields.<br />';
		
		var str;
		var strText;
		var printConfirm;
		
		var agentConfirm;
	
		$(':input[required]').each(function () {
			if ($(this).closest('div').is(":hidden")) {
				toggleRequired(this, false)
				$(this).addClass('required');
			} else if ($(this).closest('div').is(":visible")) {
				toggleRequired(this, true)

			}
			
			var $this = $(this);
			if ($(this).is(":visible")) {
				
					
					if (!$(this)[0].checkValidity()) {
					
					$('#popup1 h2').html(heading);
					$('#popup1 p').html(text);
					$('#PopupWindow h3').html(heading);
					$('#PopupWindow p').html(text);
					$('#PopupWindow').height(160);	
				i = i + 1;
					 printConfirm = $.confirm({
											title: heading,
											content: text,
											type: 'blue',
											icon: 'fa fa-info-circle',
											boxWidth: '50%',
											useBootstrap: false,
											lazyOpen: true,
											buttons: {
												print: {
													btnClass: 'btn-blue',
													action: function(){
														
														$(':input[required]').removeClass('banners');
														$('span').removeClass('banners');
														$('#blurDIV').removeClass('blur');
														$('.cloneTrans').remove();
														printForm('RSgeneral');
														}
												}, 
												cancel: function(){$('#blurDIV').removeClass('blur');}
											},
											
										});
				

					
					

					$this.addClass('banners');
					var arr = $("[name^='"+$this.attr('name')+"']");
					for (j = 0; j<arr.length; j++ ) {
						$(arr[j]).next('span').addClass('banners');
					};
					
				} else {
					$this.removeClass('banners');
					var arr = $('[name^='+$(this).attr('name')+']');
					for (j = 0; j<arr.length; j++ ) {
						$(arr[j]).next('span').removeClass('banners');
					}

				}
			}
					if (i > 1){
						heading = i + ' Invalid Inputs';
					}else{
						heading = i + ' Invalid Input';
					};
		});
		
		if (i === 0) {
			
			$(document).attr('title', docTitle);
			
					printForm('RSgeneral');
			
		}else{
			printConfirm = $.confirm({
											title: heading,
											content: text,
											type: 'blue',
											icon: 'fa fa-info-circle',
											boxWidth: '50%',
											useBootstrap: false,
											lazyOpen: true,
											buttons: {
												print: {
													btnClass: 'btn-blue',
													action: function(){
														
														$(':input[required]').removeClass('banners');
														$('span').removeClass('banners');
														$('#blurDIV').removeClass('blur');
														$('.cloneTrans').remove();
														printForm('RSgeneral');
														}
												}, 
												cancel: function(){$('#blurDIV').removeClass('blur');}
											},
											
										});
		$('#AgentQuestions :input[required]').each(function () {
			if ($(this).is(":visible")) {
				if (!$(this)[0].checkValidity()) {
					
					
					agentConfirm = $.confirm({
								buttons: {
									ok: function () {
										
										printConfirm.open();
										//return;
										}
								},
								boxWidth: '40%',
								useBootstrap: false,
								lazyOpen: true,
								type: 'orange',
								icon: 'fa fa-exclamation-circle',
								title: 'Agent Questions not complete!',
								content: 'Please set IR task for Agent Questions!',
							});
					conf = conf + 1;		
					
							
				};
			};
			
		});
			if (conf !== 0) {
				
				
				$('#blurDIV').addClass('blur');
				agentConfirm.open();
				return;
			};
			
			$('#blurDIV').addClass('blur');
			
			printConfirm.open();
			
		};
	});
}
function printOption() {
	$.when($('.required').each(function () {
		toggleRequired(this, true)
	})).done(function () {
		var i = 0;
		var el = document.querySelectorAll(":required");
		var text = '';
		var heading;
		var str;
		var strText;
		
	
		$(el).each(function () {

			if ($(this).closest('div').is(":hidden")) {
				toggleRequired(this, false)
				$(this).addClass('required');
			} else if ($(this).closest('div').is(":visible")) {
				toggleRequired(this, true)

			}

			var $this = $(this);
			if ($(this).is(":visible")) {
				if (!$this[0].checkValidity()) {
					i = i + 1;
					var TDnumber = $this.parent().closest('tr').find('.number').text();
					var TDtext = $(this).closest('td').prev().text();
					if (TDnumber !== '') {
						strText = "Number " + $this.parent().closest('tr').find('.number').text() + " " + TDtext
					} else {
						strText = TDtext
					};
					if ($(this).attr('type') === 'text') {
						str = "Text input"
					};
					if ($(this).attr('type') === 'radio') {
						str = "A selection";
						TDtext = $(this).closest('td').prev().text()
					};
					
					text = 'Missing information detected. Please complete the required fields (highlighted with a red border).\n\nIf you\'d like to bypass the required fields and print anyway, press "Ok". Otherwise, press "Cancel".';
					heading = i + ' Invalid Input(s)';
					
					
					$this.removeClass('banners');
					var arr = $("[name^='"+$this.attr('name')+"']");
					for (j = 0; j<arr.length; j++ ) {
						$(arr[j]).next('span').removeClass('banners');
					}
					

				} else {
					var arr = $('[name^='+$this.attr('name')+']');
					for (j = 0; j<arr.length; j++ ) {
						$(arr[j]).next('span').removeClass('banners');
					}

				}
			}
		});
		if (i === 0) {
			
			window.print();
		
		}
	});
}


function toggleRequired(ele, boolean) {
	$(ele).prop('required', boolean);
}

function addColumn(tblId, myHtmlContent, num) {
	for (var j = 0; j < num + 1; j++) {
		var tblHeadObj = document.getElementById(tblId).tHead;
		var len = tblHeadObj.rows.length;
		for (var h = 0; h < len; h++) {

			var newTH = document.createElement('th');
			tblHeadObj.rows[h].appendChild(newTH);
			newTH.innerHTML = '<u>C' + (tblHeadObj.rows[h].cells.length - 1) + ":</u>"
			cloneDiv($('#cvTable').attr('id'), $('#cvTables').attr('id'), (tblHeadObj.rows[h].cells.length - 3))
			
		}

		var tblBodyObj = document.getElementById(tblId).tBodies[0];
		for (var i = 0; i < tblBodyObj.rows.length; i++) {
			var newCell = tblBodyObj.rows[i].insertCell(-1);
			newCell.innerHTML = myHtmlContent //'[td] row:' + i + ', cell: ' + (tblBodyObj.rows[i].cells.length - 1)
			
		}
	}

	numberCols();
	$('#otherCVs').show();
	$('#cvTable').show();
	$('#cvdamages').show();

}
function addColumn2(tblId, myHtmlContent, num) {
	for (var j = 0; j < num + 1; j++) {
		var tblHeadObj = document.getElementById(tblId).tHead;
		var len = tblHeadObj.rows.length;
		for (var h = 0; h < len; h++) {

			var newTH = document.createElement('th');
			tblHeadObj.rows[h].appendChild(newTH);
			newTH.innerHTML = '<u>PD' + (tblHeadObj.rows[h].cells.length - 1) + ":</u>"
			//cloneDiv($('#pdTable').attr('id'), $('#cvTables').attr('id'), (tblHeadObj.rows[h].cells.length - 3))
			
		}

		var tblBodyObj = document.getElementById(tblId).tBodies[0];
		for (var i = 0; i < tblBodyObj.rows.length; i++) {
			var newCell = tblBodyObj.rows[i].insertCell(-1);
			newCell.innerHTML = myHtmlContent //'[td] row:' + i + ', cell: ' + (tblBodyObj.rows[i].cells.length - 1)
			
		}
	}

	numberCols();
	//$('#otherCVs').show();
	//$('#cvTable').show();
	$('#pddamages').show();

}
function deleteColumn(tblId, col) {

	for (var j = 0; j < col - 1; j++) {
		var allRows = document.getElementById(tblId).rows;
		for (var i = 0; i < allRows.length; i++) {

			if (allRows[i].cells.length > 1) {
				allRows[i].deleteCell(-1);

			}
		}
	}
	numberCols();
}

function numberCols() {
	$('.number').filter(function (e) {
		return !$(this).parent().is(":visible");
	}).each(function (e) {
		$(this).each(function (i, v) {
			$(this).removeClass('number');
			$(this).addClass('noNumber');

		});
	})
	$('.noNumber').filter(function (e) {
		return $(this).parent().is(":visible");
	}).each(function (e) {
		$(this).each(function (i, v) {
			$(this).addClass('number');
			$(this).removeClass('noNumber');

		});

	})
	$("td.number").each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".");
		$(this).css('width', '35px');

	});
	$('.AgentNumber').filter(function (e) {
		return !$(this).parent().is(":visible");
	}).each(function (e) {
		$(this).each(function (i, v) {
			$(this).removeClass('AgentNumber');
			$(this).addClass('noAgentNumber');

		});
	})
	$('.noAgentNumber').filter(function (e) {
		return $(this).parent().is(":visible");
	}).each(function (e) {
		$(this).each(function (i, v) {
			$(this).addClass('AgentNumber');
			$(this).removeClass('noAgentNumber');

		});
	})

	$("td.AgentNumber").each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".");
		$(this).css('width', '45px');

	});
	$("td.OFACNumber").each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".");
		$(this).css('width', '45px');

	});
	$('.UDsubnumber').filter(function (e) {
		return !$(this).parent().is(":visible");
	}).each(function (e) {
		$(this).each(function (i, v) {
			$(this).removeClass('UDsubnumber');
			$(this).addClass('noUDsubnumber');

		});
	})
	$('.noUDsubnumber').filter(function (e) {
		return $(this).parent().is(":visible");
	}).each(function (e) {
		$(this).each(function (i, v) {
			$(this).addClass('UDsubnumber');
			$(this).removeClass('noUDsubnumber');

		});
	})
	$("td.UDsubnumber").each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".)");
		$(this).css('width', '35px');

	});
}

function numberColsOther(eleclass) {
	$("td." + eleclass).each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".");
	});
}

function cloneTable(tableId, divId) {
	if ($('#'+tableId).length){
	var quantity = jQuery("table[id^=" + tableId + "]").length;
	var i = 0

	//loop through second column
	// clone the table
	var clone = jQuery("#" + tableId).clone(true);

	// use native DOM methods to update the ID
	clone[0].setAttribute('id', clone[0].getAttribute('id') + quantity);

	// find any text or file inputs, and iterate over them
	var vals = clone.find('td:nth-child(2) input').val();
	clone.find('input').each(function () {

		i = i + 1

		// use native DOM methods to update the ID
		this.setAttribute('id', this.getAttribute('id') + i);
		this.setAttribute('name', this.getAttribute('id') + i);
		$(this).closest('td:nth-child(2) input').val(this.value)
		$(this).closest('td:nth-child(2) input').prop('disabled', true);

		if (!($(this).is(':disabled'))) {
			this.value = '';
		}
		

	});


	clone.find('i').each(function () {
		$(this).closest('td').removeClass('minus');
		$(this).closest('td').css('border-right', 'hidden');
		$(this).closest('td').css('border-bottom', 'hidden');
		$(this).closest('td').html('');
		//$(this).closest('td').remove();
		$(this).closest('th').removeAttr("title");
		$(this).closest('th').css('cursor', 'default');
		$(this).closest('th').html('');
	});
	// overwrite the <div>
	$('#' + divId).html(clone);
	}
}

function cloneTable2(tableId, divId, CVnum, num) {
	var quantity = jQuery("table[id^=" + tableId + "]").length;

	for (var j = 0; j < num + 1; j++) {
		//loop through second column
		// clone the table
		var clone = jQuery("#" + tableId).clone(true);

		// use native DOM methods to update the ID
		clone[0].setAttribute('id', clone[0].getAttribute('id') + CVnum);

		// find any text or file inputs, and iterate over them
		clone.find('input').each(function () {


			// use native DOM methods to update the ID
			this.setAttribute('id', this.getAttribute('id') + CVnum);
			this.setAttribute('name', this.getAttribute('id') + CVnum);
			$(this).closest('td:nth-child(2) div').html(this.value);
			this.value = '';


		});

		// overwrite the <div>

	}
	$('#' + divId).append(clone);
	$("#" + tableId + CVnum + "> thead > tr > th:first").text("CV" + CVnum)
}

function cloneTable3(tableId, divId, num) {
	var quantity = jQuery("table[id^=" + tableId + "]").length;
	var i = 0
	for (var j = 0; j < num + 1; j++) {
		//loop through second column
		// clone the table
		var clone = jQuery("#" + tableId).clone(true);

		// use native DOM methods to update the ID
		clone[0].setAttribute('id', clone[0].getAttribute('id') + quantity);

		// find any text or file inputs, and iterate over them
		clone.find('input').each(function () {

			i = i + 1

			// use native DOM methods to update the ID
			this.setAttribute('id', this.getAttribute('id') + i);
			this.setAttribute('name', this.getAttribute('id') + i);
			this.value = '';

		});


		// overwrite the <div>


	}
	$('#' + divId).html(clone);
}

function cloneDiv(divID1, divID2, num) {
var i = 0;

	var myclone = jQuery("#" + divID1).clone(false);
	
	for (var j = 0; j < num + 1; j++) {
		myclone[0].setAttribute('id', myclone[0].getAttribute('id') + '_' + j);
		myclone.find('.rowNumbers').prop('name',myclone.find('.rowNumbers').prop('name') + '_' + j);
		myclone.find('table').each(function () {
			// use native DOM methods to update the ID
			this.setAttribute('id', this.getAttribute('id') + '_' + j);
		});

		$('#' + divID2).append(myclone);

	}
	myclone.find('.rowNumbers').val('0');

	
	var arr = $("[id^=CVpassTable_]");

	$.each(arr, function (index, value) {
		var newTxt = myclone.find('.rowNumbers').closest('td').prev('td');
		newTxt = newTxt.html().replace(/CV.+/g,'CV' + (index + 2) + ' vehicle?');
		
		myclone.find('.rowNumbers').closest('td').prev('td').text(newTxt);
		$('#' + $(value).attr('id') + ' > thead > tr > th:first').text("CV" + (index + 2))
		
	})
	$('.phone').inputmask("(999) 999-9999");
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			//autoAddress(this);
		});
		/*$(value).find('.fillIn').each(function () {
			i = i + 1;
					this.setAttribute('name', 'cvCell'+i);
		});*/
		$('.address').blur(function () {
			$(this).parent().next().find('input').focus();
			if (!$(this).val()) {
				$(this).attr('placeholder', '');
			}
		});
		$('.rowNumbers').on('input', function(){
			var numRows = 0;
			var newRows = 0;
			var rowNum = 0;
			var inpNum = $(this).val();


			let table = $(this).parents("table").next("table");
			$('[name^="dynamic_"]').attr('name','');
			if (inpNum == 0) {
				table.hide();
			}else{
				table.show();
			}
			var tableRef = $('#' + $(table).attr('id') + '>tbody')[0];
			numRows = parseInt(tableRef.rows.length);
			if (inpNum > numRows) {
				newRows = inpNum - numRows;
				rowNum = numRows + 1;
				var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:14px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn center upper" style="width:100%"></textarea></td></tr>';
				addRows($(table).attr('id'), html, newRows);
				$('.phone').inputmask("(999) 999-9999");
				$('.address').focus(function () {
					$(this).attr('placeholder', 'Enter a location');
					//autoAddress(this);
				});
				$('.address').blur(function () {
					$(this).parent().next().find('input').focus();
					if (!$(this).val()) {
						$(this).attr('placeholder', '');
					}
				});
				
			} else {
				newRows = parseInt(inpNum - numRows) * -1;
				rowNum = numRows + 1;
				removeRows($(table).attr('id'), newRows);
			}

		})

		//myclone.find('.rowNumbers').trigger('input');
		$('.rowNumbers').trigger('input');

}
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name] || "";
  
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

function ordinal_suffix_of(num) {
	num = parseInt(num);
	var j, k;
		j = num % 10;
        k = num % 100;
    if (j == 1 && k != 11) {
        return num + "st";
    }
    if (j == 2 && k != 12) {
        return num + "nd";
    }
    if (j == 3 && k != 13) {
        return num + "rd";
    }
    return num + "th";
}
function mailtoURL(to, subject, body) {
	var args = [];
		if (typeof subject !== 'undefined') {
			args.push('subject=' + encodeURIComponent(subject));
		}
		if (typeof body !== 'undefined') {
			args.push('body=' + encodeURIComponent(body));
		}
		var url = 'mailto:' + encodeURIComponent(to);
		if (args.length > 0) {
			url +='?' + args.join('&');
		}
		return url;
}
function changeCSS() {
var wrapper = document.getElementById("mapButton");
var wrapper2 = document.getElementById("container9");
var wrapper3 = document.getElementById("container0");
wrapper3.style.borderRadius = "0px 4px 0px 0px";
wrapper2.style.borderRadius = "0px 0px 4px 4px";
wrapper.style.borderRadius = "4px 4px 0px 4px";
}
function changeCSSback() {
var wrapper = document.getElementById("mapButton");
var wrapper2 = document.getElementById("container9");
wrapper2.style.borderRadius = "0px";
wrapper.style.borderRadius = "4px";
}
function PrintElem(elem)
{

	if (elem !== undefined) {
    var mywindow = window.open('', 'PRINT', 'height='+docHeight+',width='+docWidth);
	
    mywindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="files/rs.css"><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body><script>var delayInMilliseconds = 1000; window.onload = setTimeout(function() {window.print();window.close();},delayInMilliseconds);</script>');
	mywindow.document.write('<table class="full" ></table>');
	mywindow.document.write('<form id="RSgeneral">');
	var b = $("#firstPart").clone();
	var selectedValue = $("select[name$='other_lang']:visible option:selected").val();
	b.find("option[value = '" + selectedValue + "']").attr("selected", "selected");
	b.appendTo(mywindow.document.body);
	var a = $("#" + elem).clone();
	var selectedValue2 = $("select[name='OutOfState']:visible option:selected").val();
	a.find("option[value = '" + selectedValue2 + "']").attr("selected", "selected");
	a.appendTo(mywindow.document.body);
	var c = $("#closingQuestions").clone();
	c.appendTo(mywindow.document.body);
	mywindow.document.write('</form>');
    mywindow.document.write('</body></html>');
	$("td.number").each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".");
		$(this).css('width', '35px');

	});
	var num = mywindow.document.getElementsByClassName('number');
	for (var i = 0; i < num.length; i++) {
		num[i].innerHTML = i + 1 + ".";
	}
	var bann = mywindow.document.querySelectorAll('input');
		for (i = 0; i<bann.length; i++ ) {
				$(bann[i]).removeClass('banners');
			}
		var arr = mywindow.document.querySelectorAll('span');
			for (i = 0; i<arr.length; i++ ) {
				$(arr[i]).removeClass('banners');
			}
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/	
	
    return true;
	}else{

	$('#blurDIV').addClass('blur');
	$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'No RS found. Unable to print.',
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
			});
	}
	numberColsOther('number');
}
function printForm(form) {
	if (form !== undefined) {
    var mywindow = window.open('', 'PRINT', 'height='+docHeight+',width='+docWidth);
    mywindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="files/rs.css"><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body><script>var delayInMilliseconds = 1500; window.onload = setTimeout(function() {window.print();window.close();},delayInMilliseconds);</script>');
	mywindow.document.write('<table class="full" ></table>');
	mywindow.document.write('<form>');

	var $a = $("#" + form).clone();
	var selectedValue = $("select[name$='other_lang']:visible option:selected").val();
	var selectedValue2 = $("select[name='OutOfState']:visible option:selected").val();
    $a.find("option[value = '" + selectedValue + "']").attr("selected", "selected");
	$a.find("option[value = '" + selectedValue2 + "']").attr("selected", "selected");
	$a.appendTo(mywindow.document.body);
	
	mywindow.document.write('</form>');
    mywindow.document.write('</body></html>');
	$("td.number").each(function (i, v) {
		$(v).text('');
		$(v).text(i + 1 + ".");
		$(this).css('width', '35px');
	});
	var num = mywindow.document.getElementsByClassName('number');
	for (var i = 0; i < num.length; i++) {
		num[i].innerHTML = i + 1 + ".";
	}
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
	
    return true;
	}else{
		
	$('#blurDIV').addClass('blur');
	$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'No RS found. Unable to print.',
				boxWidth: '30%',
				useBootstrap: false,
				buttons: {
					Ok: function () {
						$('#blurDIV').removeClass('blur');
					}
				}
			});
	}
}
(function () {
    var width = screen.width,
        height = screen.height;
    setInterval(function () {
	  
        if (screen.width !== width || screen.height !== height) {
            width = screen.width;
            height = screen.height;
            $(window).trigger('resolutionchange');
			
        }
	
    }, 50);
}());

		 	
function resetReset() {
	console.time('Reset Function Time');
			$('.collapsible i').attr("class", 'fa fa-minus');
			$('.rowNumbers').trigger('input');
			$('.rowNumbers2').trigger('input');
			$('.rowNumbers6').trigger('input');
			$('.rowNumbers4').trigger('input');
			$('.rowNumbers5').trigger('input');
			$('#addVehicles').show();
			$('#lastPart').show();
			$('#addProperty').show();
			$('#firstPart').show();
			$('#secondPart').show();
			$('#folTable').show();
			$('#closingQuestions').show();
			$('.minus').closest("tr").remove();
			$('.address').trigger('input');
			$('.address1').trigger('input');
			$('.address2').trigger('input');
			$('.addressNorm').trigger('blur');
			$('input[name="lang"]').trigger('change');
			$('.date').trigger('blur');
			$('.time').trigger('blur');
			$('.phone').val('');
			$('input[id^=checkbox]').prop('checked', false);
			$('#moreCVWitnessTable').html('');
			$('#BINDERmoreVehTable').html('');
			$('#BINDERmoreVehTable2').html('');
			$('#BINDERmoreHHVehTable').html(''); 
			$('#BINDERmemberofHHTable').hide();
			$('#BINDERotherVehTable2').hide();
			$('#BINDERotherVehTable').hide();
			$('#BINDERtradeInTable').hide();
			$('#CVWitnessDetailsTable').html('');
			$('#FUQ').html('');
			$(".txtAreaGrow").removeAttr("style");
			$('.selectThis').html('');
			$('#CVWitnessDamagesTable').html('');
			$('[id^=checkbox]').attr('disabled',false);
			$('[id^=checkbox]').trigger('change');
			$('input[name="RSother"]').trigger('change');
			$("input.fillIn:not(#ClaimNo):not(#WITClaimNo):not(#adj):not(#adj2):not(#adj3):not(.date):not(.time):not(.phone)").css('font-size', 17);
			checkedAll = [];
			cloneTable('VOPtable', 'VOPtable2');
			cloneTable('EDVOPtable', 'EDVOPtable2');
			$('#blurDIV').removeClass('blur');
			//$('input[name="lang"]').trigger('change');
			$('.FUQminus').trigger('click');
			$('.minusGRSOcc').trigger('click');
			$('.editable').text('');
			$(hiddenEles).each(function(){$(this).hide()});
			$('#UWQHHmembers, #UWQDL, #UWQAFA, #UWQFelony, #UWQFraud, #UWQIVOwner, #UWQUPD, #UWQBiz, #UWQMex, #UWQImpairment').addClass('hiddenUWQ').hide();
			numberCols();
	console.timeEnd('Reset Function Time');
}
var today = new Date();
  var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

  function setCookie(name, value)
  {
    document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
  }
  
 
  function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
  
  var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours

  function deleteCookie(name)
  {
    document.cookie=name + "=null; path=/; expires=" + expired.toGMTString();
  }

 function undo(name) {
	 $("input:radio[name='"+name+"']").prop('checked', false);
	 $('input:radio[name="'+name+'"]').trigger('change');

 }
 function display_dt() {
	var x = new Date()
	var hours = x.getHours();
	var ampm = (hours >= 12) ? "PM" : "AM";
	var hours = (hours+24)%24;
	if(hours==0){ //At 00 hours we need to show 12 am
    hours=12;
    }
    else if(hours>12)
    {
    hours=hours%12;
    }
	
	var x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getFullYear();
	x1 = x1 + " - " + hours + ":" + ((x.getMinutes()<10?'0':'') + x.getMinutes()) + ":" + ((x.getSeconds()<10?'0':'') + x.getSeconds()) + " " + ampm;
	$('#dateTime').html(x1);
	display_c();
}
function display_c() {
	var refresh = 1000;
	mytime = setTimeout('display_dt()', refresh)
}
function translateTo(RadioEle, SelectEle, $this) {
	var radioVal = getRadioVal(document.getElementById('RSgeneral'), RadioEle);
	if (radioVal && radioVal !== 'eng' && !$this.find('input').is(':text') && !$this.find('input').is(':radio') && $this.text() !== '') {
		if ($this.closest('tr').find('td:eq(0)').hasClass('number') || $this.closest('tr').find('td:eq(0)').hasClass('indent2')) {
			
			var url = "https://translation.googleapis.com/language/translate/v2";
					//Strings requiring translation
			url += "?q=" + encodeURI($this.text().replace(/,/g,'').replace(/&/g,'and').replace(/#/g,'number'));
					//Target language
			if (radioVal == "Other") {
				url += "&target=" + $('#'+SelectEle+' option:selected').val() ;
			}else{
				url += "&target=" + radioVal; 
			};
					//set the source language
			url += "&source="; 
					//Replace with your API key
			url += "&key=AIzaSyActTShUbrnDKcB4P94Qh4cj3JpsvdAjyE";
			$.get(url, function (data, status) {
				$this.tooltipster({
					functionAfter: function() {$this.tooltipster('instance').destroy()},
					restoration: 'current',
					trigger: 'custom',
					triggerOpen: {
						click: true,
						tap: true
					},
					triggerClose: {
						click: true,
						tap: true
					}
				});
				$this.tooltipster('content', data.data.translations[0].translatedText);
				$this.css('text-decoration','underline');
					
				var instance = $this.tooltipster('open').tooltipster('instance');
					
				instance.on('closing', function () {
					$this.css('text-decoration','none');
							
				});
			});
					
		};				
	};
};

function getChromeVersion () {
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
    if (pieces == null || pieces.length != 5) {
        return undefined;
    }
    pieces = pieces.map(piece => parseInt(piece, 10));
    return pieces[1]+'.'+pieces[2]+'.'+pieces[3]+'.'+pieces[4]
        
}
function hideshow(ckbox,ele1,ele2) {
//$('input[name="'+ckbox+'"]').change(function () {
	//ele1.attr('data-hidden', 'true');
	hiddenEles.push($(ele1));
	if (ckbox.is(":checked")) {
		
		if (ckbox.val() === 'Yes') {
			ele1.show();
			
			if (ele2) {
				ele2.hide();
				hiddenEles.push($(ele2));
			};
			numberCols();
		} else {
			ele1.hide();
			
			if (ele2) {
				ele2.show();
				hiddenEles.push($(ele2));
			};
			numberCols();
		};
	} else {
		ele1.hide();
		if (ele2) {
			ele2.hide();
		};
		numberCols();
	};
//});	
};

function runVIN(ele) {
if (ele.value !== '') {
var myVin = $.trim(ele.value.toUpperCase());
var xhr = new XMLHttpRequest();
var url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/"+myVin+"?format=json"
var year, make, model, vehicle;
xhr.open("GET", url, true);
xhr.send();

// Called whenever the readyState attribute changes 
xhr.onreadystatechange = function() {
 
  // Check if fetch request is done
  if (xhr.readyState == 4 && xhr.status == 200) { 
  
    // Parse the JSON string
    var jsonData = JSON.parse(xhr.responseText);
    
    // Call the displaySpecs(), passing in the parsed JSON string
$.each(jsonData.Results, function(index, element){
	if (element.Variable === "Model Year") {year = element.Value};
	if (element.Variable === "Make") {make = element.Value};
	if (element.Variable === "Model") {model = element.Value};
})
	 //year = jsonData.Results[9].Value;
	// make = jsonData.Results[6].Value;
	// model = jsonData.Results[8].Value;
vehicle = "("+year + " " + make + " " + model+")";


  }else{

  if (xhr.readyState == 4) { 
 
 //window.alert("VIN Error");
 vehicle = "(VIN Error)";
 }
  }
//$(ele).parent().nextAll().children("input").eq(0).val(vehicle);
$(ele).parent().next('td').html(vehicle);
};
// Do the HTTP call using the url variable we specified above
}else{
	$(ele).parent().next('td').html('');
}
}
function displaySpecs(data) {
	var year = data.Results[9].Value;
	var make = data.Results[6].Value;
	var model = data.Results[8].Value;
let veh = year + " " + make + " " + model;

return veh;
    
};
function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function convertFormToJson(form) {
	const array = $(form).serializeArray();
	const json = {};
	$.each(array, function () {
		json[this.name] = this.value || "";
	});
	return json;
}

	