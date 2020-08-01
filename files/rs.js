var title = $(document).attr('title');
var w = 0;
var h = 0;
var checkedAll = [];
$( window ).load( function(){

   w = 900;
   h = 1200;
});

$(window).bind('resolutionchange', function () {
	window.resizeTo(w, h)
	$(window).trigger('scroll');
})
$(document).ready(function () {

$("input").keypress(function(e) {
  //Enter key
  if (e.which == 13) {
    return false;
  }
});
	/*if ( window.history.length > 1 ) {
		$.when(window.history.back()).done(function () {
			//$('#reset').trigger('click');
		});
	}	*/	
	$("form").on('reset', function (event) {
		console.time('Reset Time');
		$(':button').prop('disabled', true);
		$(document).attr('title','Please wait for form to reset...');
		$('input[type="text"]').each(function (index, value) {
			
			$(value).val('');
		});
		$('input').each(function (index, value) {
				$(value).removeClass('banners');
		});
		var arr = $('span');
			for (i = 0; i<arr.length; i++ ) {
				$(arr[i]).removeClass('banners');
			}
			
		setTimeout(function () {
			
			loadFunctions();
			resetReset();
			title = 'Recorded Statement General';
			$('#docTitle').html('GENERAL');
			$(document).attr('title', title);
			$('#footer').html(title);
			$("#reset i").each(function () {
				$(this).removeClass("rotate");
			});
			window.scrollTo(0, 0);
			var doctitle = document.title;
			document.title = "Form successfully reset!";
			setTimeout(function(){ document.title = title;$(':button').prop('disabled', false); }, 500);
			console.timeEnd('Reset Time');
		}, 1);
		
	});
		const formId = "RSgeneral"; // ID of the form
		const url = location.href; //  href for the page
		const formIdentifier = `${formId}`; // Identifier used to identify the form
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
		const getFormData = () => {
		  let data = { [formIdentifier]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
		
		  var n = 0;
		  for (const element of formElements) {
			  n = n + 1
			//if ($(element).is(":visible")) { 
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
						$(element).val(n);
					}
				}
			}
		  //}//else {
			//	$(element).attr('name', n);
			//	if (element.type !== 'radio') {
			//		data[formIdentifier][element.name] = element.value;
			//	}
			//	if (element.type == 'radio') {
			//		if (element.checked) {
			//			console.log(element.value);
			//			data[formIdentifier][element.name] = element.value;
			//		}
			//	}
			//}
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
		
		const populateForm = () => {
		  if (localStorage.key(formIdentifier)) {
			const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
			
			var n = 0;
			for (const element of formElements) {
				
				n = n + 1;
			
			  if (element.name in savedData) {
			
				  if (element.type !== 'radio') {
					element.value = savedData[element.name];
					$(element).trigger('input');
				  }
				  if (element.type == 'radio') {
					  if (element.value == savedData[element.name]) {
						element.checked = true;
						$(element).trigger('change');
					  }
				  }
				  if (element.type == 'checkbox') {
					  $(element).val(n);
					  if (savedData[element.name] !== "") {
					  if (element.value == savedData[element.name]) {
						element.checked = true;
						$(element).trigger('change');
					  }
					  }
				  }
			  }/*else{
				  var docTitle = document.title;
				  document.title += "Error with data!";
				  setTimeout(function() {
					document.title = docTitle; // hide the alert box after 1 second
				  }, 2000);
			  }*/
			}
			
			const message = "Form has been filled with saved data!";
			//displayAlert(message);
			//alert(message);
			$('#save').prop('disabled', true);
			var doctitle = document.title;
			doctitle = doctitle.replace(" - " + message, '');
			document.title = doctitle + " - " + message;
			setTimeout(function(){ document.title = doctitle;$('#save').prop('disabled', false); }, 500);
		  }else{
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'No saved data found.',
				boxWidth: '30%',
				useBootstrap: false,
			});
		  }
		};
	$('#save').click(function () {
		$('#get').prop('disabled', true);
		event.preventDefault();
		  data = getFormData();
		  var doctitle = document.title;
		  
		  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
		  const message = "Form data has been saved!";
		  //displayAlert(message);
		  doctitle = doctitle.replace(" - " + message, '');
		  document.title = doctitle + " - " + message;
		  setTimeout(function(){ document.title = doctitle;$('#get').prop('disabled', false); }, 3000);
		  //alert(message);
		  
	});
	$('#get').click(function () {
		populateForm();
		
	});

	$('.collapsible').click(function (e) {
		e.preventDefault();
		if ($('[id^=checkbox]:checked').length < 1 && $('.collapsible i').attr("class") == 'fa fa-minus') {
			//alert('Please select an RS template from the dropdown menu first, then try again.');
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'Please select an RS template from the dropdown menu, then try again.',
				boxWidth: '30%',
				useBootstrap: false,
			});
		}else{
			if ($('.collapsible i').attr("class") == 'fa fa-minus') {
				$('.collapsible i').attr("class", 'fa fa-plus');
				 hideMain();
			}else{
				$('.collapsible i').attr("class", 'fa fa-minus');
				showMain();
			};
		};		
	});
	$('#PopupOverlay').on('mousedown', function () {
		ClosePopup();
	});
	$('#continue').click(function () {
		printOption();
		ClosePopup();
		window.print();
	});
	$('#cancel').click(function () {
		ClosePopup();
	});
	$('#oaisys').click(function (e) {	
	e.preventDefault();
		$.ajax({
		  url: 'chrome-extension://kekahkplibinaibelipdcikofmedafmb/blank.gif',
		  success: function( data ) {
			console.log( "Success:");
			location.href='http://192.168.1.7/OAISYS.Apps.LiveCall/OAISYS.Apps.LiveCall.application';
		  },
		  error: function( data ) {
			console.log( "Error:");
		 window.open('https://chrome.google.com/webstore/detail/clickonce-for-google-chro/kekahkplibinaibelipdcikofmedafmb/related');
		// alert('Missing Chrome extension detected.\n\nPlease download the Chrome extension "ClickOnce for Google Chrome" in order to run Oaisys Desktop directly from this RS template, then try again.');
		  $.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'Missing Chrome extension detected.\n\nPlease download the Chrome extension <strong>"ClickOnce for Google Chrome"</strong> in order to run Oaisys Desktop directly from this application, then try again.',
				boxWidth: '50%',
				useBootstrap: false,
			});
		  }
		});			
	});
	$('#leftbutton').click(function (e) {
		e.preventDefault();
		$.confirm({
			boxWidth: '30%',
			useBootstrap: false,
			type: 'red',
			icon: 'fa fa-warning',
			content: 'Are you sure you\'d like to reload the page and lose any unsaved data?',
			title: 'Warning',
			buttons: {
				confirm: function () {
					location.reload();
				},
				cancel: function () {
					return;
				}
			}
		});
		//var r = confirm("Are you sure you'd like to reload the page and lose any unsaved data?");
		//if (r == true) {
			//location.reload();
		 // } else {
			//  return;
		  //}

	});
	$(function() {
		//  changes mouse cursor when highlighting loawer right of box
		$("#FUQtxtArea").mousemove(function(e) {
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
		.keyup(function(e) {
			//  this if statement checks to see if backspace or delete was pressed, if so, it resets the height of the box so it can be resized properly
			if (e.which == 8 || e.which == 46) {
				$(this).height(parseFloat($(this).css("min-height")) != 0 ? parseFloat($(this).css("min-height")) : parseFloat($(this).css("font-size")));
			}
			//  the following will help the text expand as typing takes place
			while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
				$(this).height($(this).height()+1);
			};
		});
	});
	//$('.selectThis').keypress(function(e){ return e.which != 13; });
	$("input:radio").change(function () {
		//setCookie($(this).attr('name'), $(this).val());	
		
		if ($("input[name^=TERRITORY]").prop("checked") == true) {
			$('#checkbox9').prop("checked",true);
			$('#checkbox9').attr("disabled",true);
		}else{
			$('#checkbox9').prop("checked",false);
			$('#checkbox9').attr("disabled",false);
		};
		/*if ($(this).attr('name') == $("input[name^=rideshare]").attr('name') || $(this).attr('name') == $("input[name^=business]").attr('name') || $(this).attr('name') == $("input[name^=BIZ]").attr('name')) {
			if ($("input[name^=rideshare]").prop("checked") == true || $("input[name^=business]").prop("checked") == true || $("input[name^=BIZ]").prop("checked") == true) {
				$('#checkbox8').prop("checked",true);
				$('#checkbox8').attr("disabled",true);
			}else{
				$('#checkbox8').prop("checked",false);
				$('#checkbox8').attr("disabled",false);
			};
		};*/
		if ($(this).attr('name') == $("input[name^=UD]").attr('name') || $(this).attr('name') == $("input[name^=driver2]").attr('name') || $(this).attr('name') == $("input[name^=UDdriver]").attr('name')) {
			//if ($("input[name^=UD]").prop("checked") == true || $("input[name^=driver2]").prop("checked") == true || $("input[name^=UDdriver]").prop("checked") == true) {
			if ($(this).val() == 'UD') {
				$('#checkbox17').prop("checked",true);
				$('#checkbox17').attr("disabled",true);
			}else{
				$('#checkbox17').prop("checked",false);
				$('#checkbox17').attr("disabled",false);
			};
		};
	if ($('#VNOP').length) {	
		if ($(this).attr('name') == $("input[name^=VNOP]").attr('name')) {
			
				if (getRadioVal( document.getElementById('RSgeneral'), 'VNOP' ) == 'NON-OWNERS') {
					$('#checkbox7').prop("checked",true);
					$('#checkbox7').attr("disabled",true);
				}else{
					$('#checkbox7').prop("checked",false);
					$('#checkbox7').attr("disabled",false);
				};
		
		}
		if (getRadioVal( document.getElementById('RSgeneral'), 'VNOP' ) == 'VNOP') {
			$('#checkbox7').attr("disabled",true);
		}else if (getRadioVal( document.getElementById('RSgeneral'), 'VNOP' ) !== 'NON-OWNERS') {
			$('#checkbox7').attr("disabled",false);
		};
	}
	}); 
$( window ).resize( function(){
 //h = $(window).height() / 2;
  if( w != $( window ).width() ){
 
    window.resizeTo(w, h);
	$(window).trigger('scroll');
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
	//$('.addressNorm').each(function (index, value) {
			$('.addressNorm').focus( function () {
				//$(this).attr('placeholder', 'Enter a location');
				normalAddress(this);
			});
			
			$('.addressNorm').blur(function () {
				if (!$(this).val()) {
					$(this).attr('placeholder', '');
				};
			});
	//});
	$('input[name="UDdiscovered"]').click(function () {
		if ($(this).val() === "Yes") {
			$('#MCTDUD').show();
		} else {
			$('#MCTDUD').hide();
		}
	})
	$('input[name="anyUDs"]').click(function () {
		if ($(this).val() === "Yes") {
			$('#anyUDs').show();
		} else {
			$('#anyUDs').hide();
		}
	})
	$("#reset").mousedown(function () {
		$("#" + $(this).attr('id') + " i").addClass("rotate");
	});


	$('.date').each(function (index, value) {
		$(value).focus(function () {
			$(value).attr('type', 'date');
		});
		$(value).blur(function () {
			if ($(value).val() === '') {
				$(value).attr('type', 'text');
			};
		});
	});
	

	$("input[name^=NOresideVNOPO]").change(function () {
		if ($(this).val() === "Yes") {
			$("#NOresideVNOPOYes").show();
			$("#NOresideVNOPONo").hide();
		}else{
			$("#NOresideVNOPOYes").hide();
			$("#NOresideVNOPONo").show();
		};
	});
	$('#bugbutton').click(function () {
		/*var body = prompt("Please enter as much information about what you were doing prior to and after experiencing the bug.");
		if (body == null || body == "") {
			alert("Bug report cancelled.");
			return;
		}else{
			document.location.href = mailtoURL('ccordero@americanfreedomins.com', $(document).attr('title') + ' Bug Report for ' + Date(),body);
		};*/
		$.confirm({
			title: 'Report a bug',
			boxWidth: '50%',
			icon: 'fa fa-bug',
			type: 'orange',
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
						document.location.href = mailtoURL('ccordero@americanfreedomins.com', $(document).attr('title') + ' Bug Report for ' + Date(),issue);
					}
				},
				cancel: function () {
					//close
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
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'Nothing to undo.',
				boxWidth: '30%',
				useBootstrap: false,
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
			//alert("Fire RS coming soon...")
			//$(this).prop('checked',false);
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
			//alert("Flood RS coming soon...")
			//$(this).prop('checked',false);
			$('#addVehicles').hide();
			$('#lastPart').hide();
			numberCols();
		} else {
			coverageCheck("Ok", 'FLOOD');
			$('#addVehicles').show();
			$('#lastPart').show();
			numberCols();
		};
	});
	$('#checkbox10').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'THEFT');
			
			$('#lastPart').hide();
			//alert("Theft RS coming soon...")
			//$(this).prop('checked',false);
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
			//alert("Injury RS coming soon...")
			//$(this).prop('checked',false);
			numberCols();
		} else {
			coverageCheck("Ok", 'INJURY');
			numberCols();
		};
	});
	$('#checkbox12').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'HIT_PEDESTRIAN');
			//alert("HIT PEDESTRIAN RS coming soon...")
			//$(this).prop('checked',false);
			numberCols();
		} else {
			coverageCheck("Ok", 'HIT_PEDESTRIAN');
			numberCols();
		};
	});
	$('#checkbox13').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'MED_CONDITION');
			//alert("MED CONDITION RS coming soon...")
			//$(this).prop('checked',false);
			numberCols();
		} else {
			coverageCheck("Ok", 'MED_CONDITION');
			numberCols();
		};
	});
	$('#checkbox14').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'TOW');
			//alert("TOW RS coming soon...")
			//$(this).prop('checked',false);
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
			$(this).attr('disabled',false);
			loadFunctions();
			coverageCheck("notOk", 'WITNESS');
			$('#firstPart').hide();
			$('#secondPart').hide();
			$('#addVehicles').hide();
			$('#folTable').hide();
			$('#lastPart').hide();
			//alert("WITNESS RS coming soon...")
			//$(this).prop('checked',false);
			numberCols();
			}else{
			//alert("Please uncheck any other recorded statement templates before proceeding with the RS - Witness, then try again.");
			$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'Please uncheck any other recorded statement templates before proceeding with the Witness Statement, then try again.',
				boxWidth: '40%',
				useBootstrap: false,
			});
			$(this).prop('checked',false);
		};
		} else {
			$('[id^=checkbox]').attr('disabled',false);
			coverageCheck("Ok", 'WITNESS');
			$('#firstPart').show();
			$('#secondPart').show();
			$('#addVehicles').show();
			$('#folTable').show();
			$('#lastPart').show();
			numberCols();
		};
		
	});
	$('#checkbox16').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'OUT_OF_STATE');
			//alert("OUT OF STATE RS coming soon...")
			//$(this).prop('checked',false);
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
			$(this).attr('disabled',false);
				$('#firstPart').hide();
				$('#secondPart').hide();
				$('#addVehicles').hide();
				$('#folTable').hide();
				$('#lastPart').hide();
				$('#closingQuestions').hide();
				$('#AgentQuestions').show();
				if ($('.hidden:visible').length == 1) {
					$('#agentQfirstPart').show();
				}else{
					$('#agentQfirstPart').hide();
				};
				numberCols();
			}else{
				//alert("Please uncheck any other recorded statement templates before proceeding with the Agent Questions, then try again.");
				$.alert({
					title: 'Information',
					type: 'blue',
					icon: 'fa fa-info-circle',
					content: 'Please uncheck any other recorded statement templates before proceeding with the Agent Questions, then try again.',
					boxWidth: '40%',
					useBootstrap: false,
				});
				$(this).prop('checked',false);
			};
		} else {
				$('[id^=checkbox]').attr('disabled',false);
				$('#firstPart').show();
				$('#secondPart').show();
				$('#addVehicles').show();
				$('#folTable').show();
				$('#lastPart').show();
				$('#closingQuestions').show();
				$('#AgentQuestions').hide();
				$('#agentQfirstPart').hide();
				numberCols();
		};
	});
	$('#checkbox7').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").show();
			$('input[name=VNOP][value=NON-OWNERS]').prop('checked', true);
			numberCols();
		} else {
			coverageCheck("Ok", 'NON-OWNERS');
			$("#NON-OWNER_TO_DO").hide();
			$('input[name=VNOP][value=NON-OWNERS]').prop('checked', false);
			numberCols();
		};
	});
	$('#checkbox8').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'BIZ');			
			numberCols();
		} else {
			coverageCheck("Ok", 'BIZ');
			numberCols();
		};
	});
	$('#checkbox18').change(function () {
		if (this.checked) {
		if ($('[id^=checkbox]:checked').length <= 1) {
			//$('[id^=checkbox]').attr('disabled',true);
			$(this).attr('disabled',false);
			loadFunctions();
			coverageCheck("notOk", 'FOLLOWUP');	
			$('#firstPart').hide();
			$('#secondPart').hide();
			$('#addVehicles').hide();
			$('#folTable').hide();
			$('#lastPart').hide();			
			numberCols();
		}else{
			//alert("Please uncheck any other recorded statement templates before proceeding with the RS - Follow Up, then try again.");
			$.alert({
					title: 'Information',
					type: 'blue',
					icon: 'fa fa-info-circle',
					content: 'Please uncheck any other recorded statement templates before proceeding with the Follow Up, then try again.',
					boxWidth: '40%',
					useBootstrap: false,
				});
			$(this).prop('checked',false);
		};
		} else {
			//$('[id^=checkbox]').attr('disabled',false);
			coverageCheck("Ok", 'FOLLOWUP');
			$('#firstPart').show();
			$('#secondPart').show();
			$('#addVehicles').show();
			$('#folTable').show();
			$('#lastPart').show();
			numberCols();
		};
	});
	$('#checkbox9').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'TERRITORY');
			$("input:radio[name=TERRITORY]:first").prop("checked",true);			
			numberCols();
		} else {
			coverageCheck("Ok", 'TERRITORY');
			$("input:radio[name=TERRITORY]:first").prop("checked",false);
			numberCols();
		};
	});
	$('#checkbox17').change(function () {
		if (this.checked) {
			coverageCheck("notOk", 'UD');
			//$("input:radio[name=UDdriver]:second").prop("checked",true);
			//$("input:radio[name=UDdriver]").attr("disabled",true);			
			numberCols();
		} else {
			coverageCheck("Ok", 'UD');
			//$("input:radio[name=UDdriver]:second").prop("checked",false);
			//$("input:radio[name=UDdriver]").attr("disabled",false);
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
	
	$("input[name^=BIZ]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'rideshare' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), 'business' );
		
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", $(this).attr('name'));
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", $(this).attr('name'));
			//$('#checkbox8').prop("checked",false);
			numberCols();
		};
	});
	$("input[name^=rideshare]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'BIZ' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), 'business' );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			coverageCheck("Ok", "BIZ");
			//$('#checkbox8').prop("checked",false);
			numberCols();
		};
	});
	$("input[name^=business]").change(function () {
		var val1 = getRadioVal( document.getElementById('RSgeneral'), 'BIZ' );
		var val2 = getRadioVal( document.getElementById('RSgeneral'), 'rideshare' );
		if ($(this).val() === 'Yes') {
			coverageCheck("notOk", 'BIZ');
			numberCols();
		} else if ($(this).val() !== 'Yes' && val1 !== 'Yes' && val2 !== 'Yes' && $('#checkbox8').prop('checked') == false) {
			//$('#checkbox8').prop("checked",false);
			coverageCheck("Ok", "BIZ");
			numberCols();
		};
	});
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
	//$('.address').change(function () {
		if (!$(this).val()) {
			$(this).attr('placeholder', '');
		};
	});
	$('.address1').bind('input', function(){
	//$('.address1').change(function () {
		if (!$(this).val()) {
			$(this).attr('placeholder', '');
		};
	});
	$('.address2').bind('input', function(){
	//$('.address2').change(function () {
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
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.address').focus(function () {
			$(this).attr('placeholder','Enter a location');
			autoAddress(this);
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
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
			//console.log($(arr2[w]).val());
				$(arr3[w]).val($(arr2[w]).val());
		}
	});
	$('#EDVOPtable').on('change', 'input', function () {
		var arr2 = $("#EDVOPtable tr td:nth-child(2) input");
		var arr3 = $("#EDVOPtable2 tr td:nth-child(2) input");
		for (w=0;w<arr2.length;w++) {
			//console.log($(arr2[w]).val());
				$(arr3[w]).val($(arr2[w]).val());
		}
	});
	
	$('#addVOPtable4').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#jobSites').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums4" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn address" style="width:100%; font-size:17px" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('jobSites', html, 1);
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			autoAddress(this);
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
		var html = '<td class="VOPnums3" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%; font-size:17px" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn center upper" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('occTable', html, 1)
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums3');
				//cloneTable('VOPtable','VOPtable2')
			});
		});
		//cloneTable('VOPtable','VOPtable2')
	});

	$('#addVOPtable2').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVpurp').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums2" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVpurp', html, 1);
		/*$('input').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums2');
				//cloneTable('VOPtable','VOPtable2')
			});
		});
		//cloneTable('VOPtable','VOPtable2')
	});
	$('#addVOPtable7').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#IVaddress').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums7" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="text" class="noborder address" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('IVaddress', html, 1);
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});
		$('input').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			autoAddress(this);
		});
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums7');
			});
		});
	});
	$('#addVOPtable11').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#MCTDUDfound').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="VOPnums11" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="noborder VOP1first" style="width:100%;"></textarea></td><td><textarea type="date" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder phone" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td><textarea type="text" class="noborder" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('MCTDUDfound', html, 1);
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			autoAddress(this);
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
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			autoAddress(this);
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
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		var html = '<td class="VOPnums17" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:17px" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
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
		var html = '<td class="VOPnums18" style="text-align:right;">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:17px" ></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
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
		/*$('textarea').each(function (index, value) {
			$(value).change(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
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
		var html = '<td class="VOPnums" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('VOPtable', html, 1);
		/*$('input').each(function (index, value) {
		//	$("input.fillIn:not(#ClaimNo):not(#ClaimNo2):not(#adj):not(.date):not(.time):not(.phone)").keyup(function () {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		$('.minus').each(function () {
			$(this).click(function () {
				$(this).closest("tr").remove();
				numberColsOther('VOPnums');
				cloneTable('VOPtable', 'VOPtable2');
			});
		});
		cloneTable('VOPtable', 'VOPtable2');
	});
	
	$('#EDaddVOPtable').click(function () {
		var inpNum = 1;
		var tableRef = $('#' + $('#EDVOPtable').attr('id') + '>tbody')[0];
		var numRows = parseInt(tableRef.rows.length);
		newRows = inpNum - numRows;
		rowNum = numRows + 1;
		var html = '<td class="EDVOPnums" style="text-align:right;">' + rowNum + '.</td><td><input type="text" class="noborder VOP1first" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="number" class="noborder center" style="width:100%"></input></td><td><input type="text" class="noborder" style="width:100%"></input></td><td class="minus noprint" style="width: .25%;text-align:center;" title="Click to remove this row."><i class="fa fa-minus-circle" style="padding-top:2px"></i></td>';
		addRows('EDVOPtable', html, 1);
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/

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
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		
	});
	$('#minusC1WitnessTable').click(function () {
		$('#moreCVWitnessTable').html('');
		
	});
	$('#addCVWitnessDetailsTable').click(function () {
		if ($('.witnessTable2').length !== 0 ) {
			var num = $('.witnessTable2').length + 2;
		}else{
			var num = 2;
		}
		var html = '<table class="tight section2 full witnessTable2"><tr><td class="indent2"></td><td class="indent block" style="width:160px;">Claimant\'s vehicle:</td><td class="indent block">(C'+num+') Direction:</td><td colspan="2"><input Required type="text" class="fillIn" style="width: 100%"/></td><td class="indent block">Speed:</td><td colspan="2"><input Required type="text" class="fillIn" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block" style="width:160px !important;"></td><td class="indent block">Stop Sign?</td><td class="indent block"><label class="container">Yes<input required type="radio" name="witnessCV'+num+'SS" /><span class="checkmark"></span></label></td><td class="indent"><label class="container">No<input type="radio" name="witnessCV'+num+'SS" /><span class="checkmark"></span></label></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block" style="width:160px !important;"></td><td class="indent block">Traffic Light Color:</td><td><label class="container">Green<input required type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td><td><label class="container">Green Arrow<input type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td><td><label class="container">Yellow<input type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td><td><label class="container">Red<input type="radio" name="witnessCV'+num+'lightColor" /><span class="checkmark"></span></label></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block" style="width:160px !important;"></td><td class="indent block">Did Claimant fail to observe stop sign or traffic light?</td><td class="block"><label class="container">Yes<input required type="radio" name="WitnessCV'+num+'runControl" /><span class="checkmark"></span></label></td><td class=""><label class="container">No<input type="radio" name="WitnessCV'+num+'runControl" /><span class="checkmark"></span></label></td></tr></table>';
		$('#CVWitnessDetailsTable').append(html);
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		
	});
	$('#addFUQ').click(function () {
		
		var html = '<table class="section2 tight full" ><tr><td class="number"></td><td class="block"><span contenteditable="true" class="selectThis" data-placeholder="Add a new question" data-focused-advice="Start typing"></span>?</td><td><input Required title="Location of Loss" type="text" class="fillIn FOL" style="width:100%"/></td></tr><tr><td class="indent2"></td><td colspan="2"><input type="text" class="fillIn FOL" style="width:100%"/></td></tr></table>';
		$('#FUQ').append(html);
		numberCols();
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
		var html = '<table class="tight section2 full witnessTable3" style="padding-top:15px;"><tr><td class="indent2"></td><td class="indent block">Claimant\'s vehicle: (C'+num+')</td><td><input Required type="text" class="fillIn FOL" style="width: 100%"/></td></tr><tr><td class="indent2"></td><td class="indent" colspan="2"><input type="text" class="fillIn FOL" style="width: 100%"/></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent">Was there any damage to the vehicle prior to the loss?</td><td class="indent"><label class="container">Yes<input required type="radio" name="witnessCV'+num+'UPD" /><span class="checkmark"></span></label></td><td class="indent"><label class="container">No<input type="radio" name="witnessCV'+num+'UPD" /><span class="checkmark"></span></label></td></tr></table><table class="tight section2 full"><tr><td class="indent2"></td><td class="indent block">If yes: What was previously damaged?</td><td><input Required type="text" class="fillIn FOL" style="width: 100%"/></td></tr><tr><td class="indent2"></td><td class="indent" colspan="2"><input type="text" class="fillIn FOL" style="width: 100%"/></td></tr></table>';
		$('#CVWitnessDamagesTable').append(html);
		/*$('input').each(function (index, value) {
			$(value).not('#ClaimNo').not('#ClaimNo2').not('#adj').not('.date').not('.time').not('.phone').change(function () {
			//$(value).keyup(function () {
				$(this).val(titleCase($(this).val()));
			})
		});*/
		
	});
	$('#minusCVWitnessDamagesTable').click(function () {
		$('#CVWitnessDamagesTable').html('');		
	});
	$('#OutOfState').change(function (index, value) {
		var state = $(this).val();
		$('.theState').each(function () {
			var punc = $(this).html()
			$(this).html(state + punc);
		});
	});
	$('#UDinfoSpacer').width($('#refTD').outerWidth() - 2);
	(function (timer) {


		$(window).scroll(function () {
			$('html').removeClass('hide-scrollbar');
			$('html').addClass('show-scrollbar');

			clearTimeout(timer);
			timer = setTimeout(function () {
				$('html').removeClass('show-scrollbar');
				$('html').addClass('hide-scrollbar');


			}, 100);

		});

	})();

	loadFunctions();

	/*$('.rowNumbers').inputmask({
		alias: "decimal",
		integerDigits: 5,
		digits: 0,
		digitsOptional: false,
		placeholder: "",
		allowMinus: false
	});*/
$('.rowNumbers2').bind('input', function(){
	//$('.rowNumbers2').change(function () {
		var numRows = 0;
		var newRows = 0;
		var rowNum = 0;
		var inpNum = $(this).val();
		let table = $(this).parents("table").next("table");
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
			var html = '<input type="text" class="fillIn" style="width:100%;"/>'
			addColumn($(table).attr('id'), html, newRows);
			/*$("input.noborder:not(#ClaimNo):not(#ClaimNo2):not(#adj)").change(function () {
				var $this = $(this);
				$this.val(titleCase($this.val()));
			});*/

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
	
$('.rowNumbers').on('input', function(){
	//$('.rowNumbers').change(function () {
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
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:18px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn center upper" style="width:100%"></textarea></td></tr>';
			addRows($(table).attr('id'), html, newRows);
			/*$("textarea.fillIn").change(function () {
				var $this = $(this);
				$this.val(titleCase($this.val()));
			});*/
			$('.phone').inputmask("(999) 999-9999");
			
			$('.address').focus(function () {
				$(this).attr('placeholder', 'Enter a location');
				autoAddress(this);
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
	//$('.rowNumbers3').change(function () {
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
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><input type="text" class="fillIn" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%; font-size:18px" ></input></td><td><input type="text" class="fillIn phone" style="width:100%"></input></td><td><input type="text" class="fillIn" style="width:100%"></input></td></tr>';
			addRows($(table).attr('id'), html, newRows);
			/*$("input.fillIn").change(function () {
				var $this = $(this);
				$this.val(titleCase($this.val()));
			});*/

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
	//$('.rowNumbers4').change(function () {
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
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:18px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td></tr>';
			addRows($(table).attr('id'), html, newRows);
			/*$("textarea.fillIn").change(function () {
				var $this = $(this);
				$this.val(titleCase($this.val()));
			});*/
			$('.address').focus(function () {
				$(this).attr('placeholder', 'Enter a location');
				autoAddress(this);
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
	//$('.rowNumbers5').change(function () {
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
			var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:18px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td></tr>';
			addRows($(table).attr('id'), html, newRows);
			/*$("textarea.fillIn").change(function () {
				var $this = $(this);
				$this.val(titleCase($this.val()));
			});*/
			$('.address').focus(function () {
				$(this).attr('placeholder', 'Enter a location');
				autoAddress(this);
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
		
	/*end of document ready*/
});
function showMain() {

	$('#secondPart').show();
	$('#addVehicles').show();
	$('#folTable').show();
	$('#lastPart').show();

}
function hideMain() {
	
	$('#secondPart').hide();
	$('#addVehicles').hide();
	$('#folTable').hide();
	$('#lastPart').hide();

}
function coverageCheck(status, ele) {
	var arr = $(".hidden");

	$('.hidden').each(function (index, value) {
		if (status === "Ok" && $(value).attr('id') === ele) {
			$(value).hide();
			
		//	$('#AgentQuestions').hide();
		
		} else if (status !== "Ok" && $(value).attr('id') === ele) {
			$(value).show();
			/*if (!(ele == 'NON-OWNERS' || ele == 'FLOOD' || ele == 'FIRE' || ele == 'THEFT' || ele == 'TOW' || ele == 'WITNESS' || ele == 'INJURY' || ele == 'HIT PEDESTRIAN' || ele == 'OUT OF STATE' || ele == 'FOLLOWUP')) {
				$('#AgentQuestions').show();
			};*/
		};
	

	});
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
				$('#footer').html(title);
			}else{
				title = title.replace(", " + $(arr[i]).attr('id'), '');
				title += ", " + $(arr[i]).attr('id');
				title2 = title.replace("Recorded Statement General, ",""); //", " + $(arr[i]).attr('id');
				$('#docTitle').html(title2.replace(/_/g," "));
				$(document).attr('title', title.replace(/_/g, " "));
				$('#footer').html(title);
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
			$('#footer').html(title);
		} 
		
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
	$('.hidden').each(function (index, value) {
		$(value).hide();
	});
	$('input[name="VNOPrental"]').click(function () {
		if ($(this).val() === 'Yes') {
			$('#VNOPrental').show();
			numberCols();
		} else {
			$('#VNOPrental').hide();
			numberCols();
		};
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
	
       // $("html, body").animate({ scrollBottom: 0 }, "slow");
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
       // $("html, body").animate({ scrollTop: 0 }, "slow");
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
	
	/*$("input:radio:checked").data("chk",true);
    $("input:radio").click(function(){
        $("input[name='"+$(this).attr("name")+"']:radio").not(this).removeData("chk");
        $(this).data("chk",!$(this).data("chk"));
        $(this).prop("checked",$(this).data("chk"));
    }); */

	$('.FOL').on('input paste', function () {
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
					
				}else{
					$(this).closest('tr').next().find('.FOL').val(stringsplit2+" "+curTxt);	
					
				};
				$(this).closest('tr').next().find('.FOL').trigger('input');
				$(this).closest('tr').next().find('.FOL').focus();
				$('[name='+$(this).closest('tr').next().find('.FOL').prop('name')+']').setCursorPosition(stringsplit2.length);
				//$('[name='+$(this).closest('tr').next().find('.FOL').prop('name')+']').setCursorPosition($this.length - cursPosPre + 1);

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

	$("input.fillIn:not(#ClaimNo):not(#ClaimNo2):not(#adj):not(#adj2):not(#adj3):not(.date):not(.time):not(.phone):not(.FOL)").on('keydown', function () {
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
	$('#addUDSec').click(function () {
		var UDsec = $('#UD').clone();
		UDsec.find('#addUDSec').remove();
		UDsec.find('.printdiv').remove();
		$('#moreUD').append(UDsec);
	});
	
	$('.IVs').keydown(function () {

		if (isOverflown($(this))) {

			var $this = $(this).val();
			var stringsplit = $this.split(' ');
			$(this).closest('td').next().find('.IVs').val(stringsplit.pop())
			$(this).val(stringsplit.join(' '));
			$(this).closest('td').next().find('.IVs').focus();
		};

	});
	/*$("textarea.fillIn").change(function () {
		var $this = $(this);
		$this.val(titleCase($this.val()));
	});
	$("input.fillIn:not(#ClaimNo):not(#ClaimNo2):not(#adj):not(#adj2):not(#adj3):not(.date):not(.time):not(.phone)").change(function () {
		var $this = $(this);
		$this.val(titleCase($this.val()));
	});*/
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
	//setCookie($(this).attr('name'), $(this).val());
	
	if ( $( this ).hasClass( "banners" ) ) {
		var el = document.querySelectorAll(":required");
		$(el).each(function () {
			if ($(el).is(":visible")) {
				if ($(this)[0].checkValidity()) {
					//$(this).closest('td').prev().css('color', 'black')
					//$(this).parent().closest('table').find('td').css('color', 'black')
					
					$(this).next('span').removeClass('banners');
				};
			};
		});
		$(this).removeClass('banners');
	};
	});
	/*$("input.noborder").change(function () {
		var $this = $(this);
		$this.val(titleCase($this.val()));
	});
	$("#adj").keyup(function () {
		var $this = $(this);
		$this.val($this.val().toUpperCase());
	});
	$("#adj2").keyup(function () {
		var $this = $(this);
		$this.val($this.val().toUpperCase());
	});
	$("#adj3").keyup(function () {
		var $this = $(this);
		$this.val($this.val().toUpperCase());
	});
	$(".upper").keyup(function () {
		var $this = $(this);
		$this.val($this.val().toUpperCase());
	});
	$("textarea").change(function () {
		var $this = $(this);
		$this.val(titleCase($this.val()));
	});*/
	$('.currency').each(function () {
		$(this).inputmask("currency");
	});
	/*$('.number').each(function () {
		$(this).inputmask({
			'alias': 'decimal',
			rightAlign: true,
			'groupSeparator': '.',
			'autoGroup': true
		});
	});*/
	$('#ClaimNo').inputmask("A[A]-999999");
	$('#AgentClaimNo').inputmask("A[A]-999999");
	$('.time').inputmask("[hh:mm]", {
        placeholder: "HH:MM", 
        insertMode: false, 
        showMaskOnHover: false,
        hourFormat: 12
      }
   );
	$('#FUQClaimNo').inputmask("A[A]-999999");
	$('#ClaimNo2').inputmask("A[A]-999999");
	$('.phone').inputmask("(999) 999-9999");
	$('.SSN').inputmask("999-99-9999");
	var autocomplete;
	$('.address').focus(function () {
		$(this).attr('placeholder', 'Enter a location');
		autoAddress(this);

	});

	$('.address1').focus(function () {
		$(this).attr('placeholder', 'Enter a location');
		autoAddress(this);
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
	administrative_area_level_1: 'short_name'
};
var address1 = {
	street_number: 'short_name',
	route: 'short_name'
};
var address2 = {
	locality: 'short_name',
	administrative_area_level_1: 'short_name'
};

function autoAddress(input) {
	var options = {
		componentRestrictions: {
			country: 'us'
		}
	};
	var autocomplete = new google.maps.places.Autocomplete(input, options);

	google.maps.event.addListener(autocomplete, 'place_changed',
		function () {
			fillInAddress(input, autocomplete);
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
			}
			if (address2[addressType]) {
				val2 += place.address_components[i][address2[addressType]] + " ";
				$(input).closest('tr').next().find('.fillIn.address2').val(val2);
				var input2 = $(input).closest('tr').next().find('.fillIn.address2');
				$(input2).closest('tr').next().find('input').focus();
			}

		}
	}
}

function titleCase(str) {
	return;
	/*str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	var newStrng = str.join(' ');
	//return str.join(' ');
	return charCase1(newStrng);*/
	return str.toUpperCase();
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


function printFunction() {
 var docTitle = document.title;
	$.when($('.required').each(function () {
		toggleRequired(this, true)
	})).done(function () {
		var i = 0;
		//var el = document.querySelectorAll(":required");
		var text = '';
		var heading;
		var str;
		var strText;
		
	
	//	$('#PopupWindow').height(0);


		//$(el).each(function () {
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
					i = i + 1;

					text = 'Missing information detected. Please complete the required fields highlighted with a red border.<br /><br />You may also click the print button below to proceed without filling in the required fields.<br />';
					heading = i + ' Invalid Input(s)';

					$this.addClass('banners');
					var arr = $("[name^='"+$this.attr('name')+"']");
					for (j = 0; j<arr.length; j++ ) {
						$(arr[j]).next('span').addClass('banners');
					}
					$('#popup1 h2').html(heading);
					$('#popup1 p').html(text);
					$('#PopupWindow h3').html(heading);
					$('#PopupWindow p').html(text);
					$('#PopupWindow').height(160);	
					//$('#PopupWindow a').click(function () {
						//$this.css("animation-duration", "");
					//});
					//OpenPopup();
					$('#popup1').popup("show");
				} else {
					$this.removeClass('banners');
					var arr = $('[name^='+$(this).attr('name')+']');
					for (j = 0; j<arr.length; j++ ) {
						$(arr[j]).next('span').removeClass('banners');
					}

				}
			}
		});
		if (i === 0) {
			$('#save').trigger('click');
			$(document).attr('title', docTitle);
			$('#popup1').popup("hide");
			window.print();
			//$('#reset').trigger('click');
			
		}
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
					
					  //if (confirm(heading + "\n\n" + text)) {
					//	window.print();
					 // };

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
			$('#popup1').popup("hide");
		}
	});
}

function OpenPopup() {

	$('#scrollTop').trigger('click');
	document.getElementById('PopupOverlay').style.display = 'block';
	//document.getElementById('PopupWindow').style.display = 'block';
	var win = $(window),
		// winW = win.width()/2,
		// winH = win.height()/2,
		scrollTop = win.scrollTop(),
		// scrollLeft = win.scrollLeft(),
		container = $("#PopupWindow").css({
			"display": "block",
			"visibility": "hidden"
		}),
		contW = container.width(),
		contH = container.height(),
		
		// left = ((winW-contW)+scrollLeft)*2,
		top = scrollTop + contH;

$("#PopupWindow").css('top', top);

	container.css({
		"visibility": "visible"
	});
disableScroll();
}

function ClosePopup() {
	$('#popup1').popup("hide");
	//document.getElementById('PopupOverlay').style.display = 'none';
	//document.getElementById('PopupWindow').style.display = 'none';
	//$('#popup1_wrapper').attr('visibility','hidden');
	//$('#popup1').attr('visibility','hidden');
	//$('#popup1_background').attr('visibility','hidden');
//enableScroll();
}
function disableScroll() {
		$('body').css('overflow', 'hidden');
    // Get the current page scroll position 
  /*  scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 

        // if any scroll is attempted, set this to the previous value 
		
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; */
} 
  
function enableScroll() { 
	$('body').css('overflow', 'auto');
    //window.onscroll = function() {}; 
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
	/*$("input.fillIn:not(#ClaimNo):not(#adj)").change(function () {
		var $this = $(this);
		$this.val(titleCase($this.val()));
	});*/
}

function deleteColumn(tblId, col) {

	for (var j = 0; j < col - 1; j++) {
		var allRows = document.getElementById(tblId).rows;
		//for (j=1; j<col-1; j++) {	
		for (var i = 0; i < allRows.length; i++) {

			if (allRows[i].cells.length > 1) {
				allRows[i].deleteCell(-1);

			}
		}
	}
	numberCols();
}

function numberCols() {
	//if (coverageCheck === 'NotOk') {$('#AgentQuestions').show();}else{$('#AgentQuestions').hide();}
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
		$(this).css('width', '35px');

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

		// $(this).closest('td').attr('id',i);

		// $(this).closest('td:nth-child(2)').text(this.value); 
		$(this).closest('td:nth-child(2) input').val(this.value)
		$(this).closest('td:nth-child(2) input').prop('disabled', true);
		//$(this).closest('td:nth-child(2) input').remove();
		//$(this).closest('td:nth-child(2) td').html(vals);
		//clone.find('td:nth-child(2)').html(vals);
		
		if (!($(this).is(':disabled'))) {
	//	console.log($(this).is(':disabled'));
		this.value = '';
		}
		

	});


	clone.find('i').each(function () {
		$(this).closest('td').removeClass('minus');
		$(this).closest('td').remove();
		$(this).closest('th').removeAttr("title");
		$(this).closest('th').css('cursor', 'default');
		$(this).closest('th').html('');
	});
	// overwrite the <div>
	$('#' + divId).html(clone);

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

			this.value = '';

		});


		// overwrite the <div>


	}
	$('#' + divId).html(clone);
}

function cloneDiv(divID1, divID2, num) {


	var myclone = jQuery("#" + divID1).clone(false);

	for (var j = 0; j < num + 1; j++) {
		myclone[0].setAttribute('id', myclone[0].getAttribute('id') + '_' + j);
		myclone.find('table').each(function () {

			// use native DOM methods to update the ID
			this.setAttribute('id', this.getAttribute('id') + '_' + j);

		});
		$('#' + divID2).append(myclone);

	}
	var arr = $("[id^=CVpassTable_]");

	$.each(arr, function (index, value) {
		$(value).find('.phone').inputmask("(999) 999-9999");
		$(value).find('.address').focus(function () {
			$(this).attr('placeholder', 'Enter a location');
			autoAddress(this);
		});
		$(value).find('.address').blur(function () {
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

			var tableRef = $('#' + $(table).attr('id') + '>tbody')[0];
			numRows = parseInt(tableRef.rows.length);
			if (inpNum > numRows) {
				newRows = inpNum - numRows;
				rowNum = numRows + 1;
				var html = '<tr><td class="tablefirst rowNums">' + rowNum + '.</td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td class="addressTD"><textarea type="text" class="fillIn address" style="width:100%; font-size:18px" ></textarea></td><td class="phoneTD"><input type="text" class="fillIn phone" style="width:100%"></input></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn" style="width:100%"></textarea></td><td><textarea type="text" class="fillIn center upper" style="width:100%"></textarea></td></tr>';
				addRows($(table).attr('id'), html, newRows)
				/*$(value).find("textarea.fillIn").change(function () {
					var $this = $(this);
					$this.val(titleCase($this.val()));
				});*/
				$(value).find('.phone').inputmask("(999) 999-9999");
				$(value).find('.address').focus(function () {
					$(this).attr('placeholder', 'Enter a location');
					autoAddress(this);
				});
				$(value).find('.address').blur(function () {
					$(this).parent().next().find('input').focus();
					if (!$(this).val()) {
						$(this).attr('placeholder', '');
					}
				});
			} else {
				newRows = parseInt(inpNum - numRows) * -1;
				rowNum = numRows + 1;
				removeRows($(table).attr('id'), newRows)
			}

		})


		/*$(value).find("textarea.fillIn").change(function () {
			var $this = $(this);
			$this.val(titleCase($this.val()));
		});*/
		$('#' + $(value).attr('id') + ' > thead > tr > th:first').text("CV" + (index + 2))

	})

}
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
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
    var mywindow = window.open('', 'PRINT', 'height='+h+',width='+w);
	
    mywindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="files/rs.css"><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body><script>var delayInMilliseconds = 1000; window.onload = setTimeout(function() {window.print();window.close();},delayInMilliseconds);</script>');
   // mywindow.document.write('<h1>' + document.title  + '</h1>');
    //mywindow.document.write(document.getElementById('firstPart').innerHTML);
	mywindow.document.write('<table class="full" ></table>');
	mywindow.document.write('<form>');
	var $b = $("#firstPart").clone();
	$b.appendTo(mywindow.document.body);
	var $a = $("#" + elem).clone();
	$a.appendTo(mywindow.document.body);
	//mywindow.document.write($a.html());
    //mywindow.document.write(document.getElementById(elem).innerHTML);
	//mywindow.document.write($(elem).html());
	mywindow.document.write(document.getElementById('closingQuestions').innerHTML);
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

   // mywindow.print();
   // mywindow.close();
	
    return true;
	}else{
		
	//alert("No RS found. Unable to print.");
	$.alert({
				title: 'Information',
				type: 'blue',
				icon: 'fa fa-info-circle',
				content: 'No RS found. Unable to print.',
				boxWidth: '30%',
				useBootstrap: false,
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
		//	$('.rowNumbers').trigger('change');
			$('.collapsible i').attr("class", 'fa fa-minus');
			$('.rowNumbers').trigger('input');
			$('.rowNumbers2').trigger('input');
			$('.rowNumbers4').trigger('input');
			$('.rowNumbers5').trigger('input');
			$('#addVehicles').show();
			$('#lastPart').show();
			$('#firstPart').show();
			$('#secondPart').show();
			$('#folTable').show();
			$('#closingQuestions').show();
			$('.minus').closest("tr").remove();
			$('.address').trigger('input');
			$('.address1').trigger('input');
			$('.address2').trigger('input');
			$('.addressNorm').trigger('blur');
			$('.date').trigger('blur');
			$('.time').trigger('blur');
			$('.phone').val('');
			$('input[id^=checkbox]').prop('checked', false);
			$('#moreCVWitnessTable').html('');
			$('#CVWitnessDetailsTable').html('');
			$('#FUQ').html('');
			//$("#FUQtxtArea").each(function() {$(this).height(parseFloat($(this).css("min-height")) != 0 ? parseFloat($(this).css("min-height")) : parseFloat($(this).css("font-size")))});
			$("#FUQtxtArea").removeAttr("style");
			$('.selectThis').html('');
			$('#CVWitnessDamagesTable').html('');
			$('[id^=checkbox]').attr('disabled',false);
			$('input[name="RSother"]').trigger('change');
			$("input.fillIn:not(#ClaimNo):not(#ClaimNo2):not(#adj):not(#adj2):not(#adj3):not(.date):not(.time):not(.phone)").css('font-size', 17);
			checkedAll = [];
			cloneTable('VOPtable', 'VOPtable2');
			cloneTable('EDVOPtable', 'EDVOPtable2');
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