/* MAKE SURE OBJ'S AUTO INITIALIZE AT GRADE */

/* Stores the grade reports. */
var reports_list = [];
/* Number of projects scanned so far. */
var project_count = 0;
/* Cross-origin request permissibility [UNUSED]*/
var cross_org = true;
/* Sets to true when next page returns 404. */
var crawl_finished = false;
/* Number of projects that meet requirements. */
var passing_projects = 0;
/* Number of projects that meet requirements and extensions */
var complete_projects = 0;
/* Grading object. */
var gradeObj = null;

var table = 0;

var IS_LOADING = false;

/*
  SELECTION HTML
*/

/* Initializes html and initiates crawler. */
function buttonHandler() {
  if(IS_LOADING) {
    return;
  }

  if(!gradeObj) {
    unitError();
    return;
  }

  htmlInit();
  globalInit();
  document.getElementById('wait_time').innerHTML = "loading...";
  IS_LOADING = true;

	var inputURL = document.getElementById('inches_input').value;
  var requestURL = getRequestURL(getID(inputURL));
  console.log(requestURL);
  getJSON(requestURL,analyze,[]);
}

/* Initializes global variables. */
function globalInit() {
  reports_list = [];
  project_count = 0;
  crawl_finished = false;
  cross_org = true;
  grade_reqs = {};
  passing_projects = 0;
  complete_projects = 0;
}

/* Initializes HTML elements. */
function htmlInit() {
  document.getElementById('process_button').blur();
  clearReport();
  noError();
}

function dropdownHandler() {
  document.getElementById("unit_dropdown").classList.toggle("show");
}

$(document).ready(function(){
  $('.units label').click(function() {
    $(this).addClass('selected').siblings().removeClass('selected');
  });
});

function drop_eventHandler() {
  gradeObj = new GradeEvents();
  console.log("Grading Events");
}

function drop_animationHandler() {
  gradeObj = new GradeAnimation();
  console.log("Grading Animation");
}

function drop_condloopsHandler() {
  gradeObj = new GradeCondLoops();
  console.log("Grading Conditional Loops");
}

function drop_onewaysyncp1Handler() {
   gradeObj = new GradeOneWaySyncP1();
   console.log("Grading One Way Sync Pt. 1");
}

function drop_onewaysyncp2Handler() {
   gradeObj = new GradeOneWaySyncP2();
   console.log("Grading One Way Sync Pt. 2");
}

function drop_decompbyseqHandler() {
   gradeObj = new GradeDecompBySeq();
   console.log("Grading Decomposition By Sequence");
}

window.onclick = function(event) {
  if(event.target.matches('.dropdown_btn')) {
    return;
  }

  var droplinks = document.getElementsByClassName("dropdown_menu");
  [...droplinks].forEach(function(element) {
    if(element.classList.contains('show')) {
      element.classList.remove('show');
    }
  });
}

/*
  DISPLAY RESULTS
*/

/* Prints a line of grading text. */
function appendText(string_list) {
  var tbi = document.createElement("div");
  tbi.className = "dynamic";

  string_list.forEach(function(sub_element) {
    var newContent = document.createTextNode(sub_element);
    tbi.appendChild(newContent);
    var br = document.createElement("br");
    tbi.appendChild(br);
  });

  tbi.style.width = 33 + "%";
  tbi.style.fontSize = "15px";
  tbi.style.display= 'inline-block';

  var ai = document.getElementById("report");
  document.body.insertBefore(tbi, ai);

  table++;
  if (table > 2) {
    table = 0;
  }
}

/* Prints a blank line. */
function appendNewLine() {
  var tbi = document.createElement("div");
  tbi.className = "lines";
  tbi.style.padding = "15px";

  var ai = document.getElementById("report");
  document.body.insertBefore(tbi, ai);
}

/* Prints out the contents of report_list as a
   series of consecutive project reports. */
function printReport() {
  clearReport();

  printColorKey();

  table = 0;
  reports_list.forEach(function(element) {
    appendText(element);
    if (table == 0){
      appendNewLine();
    }
  });
  processComplete();
}

/* Clears all project reports from the page. */
function clearReport() {
  var removeables = document.getElementsByClassName('dynamic');
  while(removeables[0]) {
    removeables[0].remove();
  }
  var removeables = document.getElementsByClassName('lines');
  while(removeables[0]) {
    removeables[0].remove();
  }
}

/* Prints color key.*/
function printColorKey() {
  var processObj = document.getElementById('process_status');
  processObj.style.visibility = 'visible';
  processObj.innerHTML = "My Project:";
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
  IS_LOADING = false;
}

function unitError() {
  var processObj = document.getElementById('process_error');
  processObj.style.visibility = 'visible';
  processObj.style.color = "red";
  processObj.innerHTML = "error: no unit selected.";
  IS_LOADING = false;
}

function noError() {
  document.getElementById('process_error').innerHTML = "";
  document.getElementById('process_error').style.visibility = 'hidden';
}
