
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
let tally = 0;
let timerStart = false;
let startTime;
let elapsedTime;

      function allowDrop(ev) {
          ev.preventDefault();
      }

      function dragStart(ev) {
          ev.dataTransfer.setData("text", ev.target.id);
		  if (timerStart === false) { startTime = new Date();  timerStart = true;}
      }

      function dragDrop(ev) {
			document.getElementById('submit').disabled = false;
			document.getElementById('screenShot').style.visibility = 'visible';
          ev.preventDefault();
          var data = ev.dataTransfer.getData("text");
          ev.target.appendChild(document.getElementById(data));
		  var img = document.getElementById(data)
		  img.setAttribute("draggable", false);
		  if (img.getAttribute('link-item') === ev.target.getAttribute('link-item')) {
			tally += 1;
		  };
		  if (ev.target.tagName === "DIV"){
			ev.target.querySelector("span").remove();
			ev.target.removeEventListener("drop", dragDrop);
			ev.target.removeEventListener("dragover", allowDrop);
		  }else{
			ev.target.parentElement.appendChild(document.getElementById(data));
			ev.target.parentElement.removeEventListener("drop", dragDrop);
			ev.target.parentElement.removeEventListener("dragover", allowDrop);
			ev.target.parentElement.querySelector("span").remove();
		  }
		  
      }
	  
	  window.addEventListener("DOMContentLoaded", () => {
			  var nodrag = document.querySelectorAll(".div1");
			  var drag = document.querySelectorAll(".div2");
			  
			  //nodrag.setAttribute("", "");
			  for (i = 0; i < drag.length; i++) {
				drag[i].addEventListener("drop", dragDrop);
				drag[i].addEventListener("dragover", allowDrop)	;
			  }

	 });
 function tallyTotal() {
	 if (!localStorage.getItem('tally1')) {
			localStorage.setItem('tally1', tally);
			localStorage.setItem('time1', getElapsedTime(startTime));
		 	localStorage.setItem('html', '');
		 	localStorage.setItem('html2', '');
			localStorage.setItem('html1', document.body.innerHTML);
			document.querySelector("#score").innerHTML = "(Score = " + tally + ")";
			elapsedTime = getElapsedTime(startTime);
			document.querySelector("#time").innerHTML = "(Time = " + elapsedTime + ")";
	}else{
			document.body.innerHTML = localStorage.getItem('html1');
			document.querySelector("#score").innerHTML = "(Score = " + localStorage.getItem('tally1') + ")";
			document.querySelector("#time").innerHTML = "(Time = " + localStorage.getItem('time1') + ")";
			
	};
	
	
	takeshot();
	var drag = document.querySelectorAll(".div2");
	for (i = 0; i < drag.length; i++) {
		drag[i].removeEventListener("drop", dragDrop);
		drag[i].removeEventListener("dragover", allowDrop)	;
	}
	var images = document.querySelectorAll(".div1 img");
	for (i = 0; i < images.length; i++) {
		images[i].setAttribute("draggable", false);
	}
	
 }
 function getElapsedTime(st) {
  const endTime = new Date();
  let diff = endTime.getTime() - st.getTime(); // Difference in milliseconds

  const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');;
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60)).toString().padStart(2, '0');;
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000).toString().padStart(2, '0');;

  return `${hours}:${minutes}:${seconds}`;
}

function takeshot() {
window.scrollTo({
		  top: 0,
		  left: 0
		});
waitForScrollToTop().then(() => {
            let div =
                document.getElementById('result');

            // Use the html2canvas
            // function to take a screenshot
            // and append it
            // to the output div
            html2canvas(div).then(
                function (canvas) {
                    
                    canvas.toBlob(function(blob) {
			navigator.clipboard
				.write([
				new ClipboardItem(
					Object.defineProperty({}, blob.type, {
						value: blob,
						enumerable: true
					})
				)
			])
				.then(function() {
				console.log("Copied to clipboard");
				document.getElementById('submit').disabled = true;
			});
                })
                })
				
		window.alert('Screenshot captured!');
		});
}
		
function waitForScrollToTop() {
  return new Promise(resolve => {
    const checkScroll = () => {
      if (window.scrollY === 0) {
        resolve();
      } else {
        requestAnimationFrame(checkScroll);
      }
    };

    checkScroll();
  });
}
