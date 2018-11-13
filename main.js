
/* Grading object. */
var IS_LOADING = false;


/* Initiates PDF retrieval. */
function buttonHandler() {
  if(IS_LOADING) {
    return;
  }

  htmlInit();
	var inputURL = document.getElementById('inches_input').value;
  var id = getID(inputURL);
  if (id) {getRequestURL(id);}
}

/* Initializes global variables. */


/* Initializes HTML elements. */
function htmlInit() {
  document.getElementById('process_button').blur();
  noError();
}

/* 
  ERROR REPORTS 
*/

function linkError() {
  var processObj = document.getElementById('process_error');
  processObj.style.visibility = 'visible';
  processObj.style.color = "red";
  processObj.innerHTML = "error: invalid link.";
  document.getElementById('wait_time').innerHTML = "";
  document.getElementById('process_status').style.visibility = 'red';
  IS_LOADING = false;
}


function noError() {
  var processObj = document.getElementById('process_error');
  processObj.style.visibility = 'visible';
  processObj.style.color = "#123D6A";
  processObj.innerHTML = "Note: loading may take several minutes.";
  document.getElementById('wait_time').innerHTML = "";
  document.getElementById('process_status').style.visibility = 'red';
  IS_LOADING = false;

}
