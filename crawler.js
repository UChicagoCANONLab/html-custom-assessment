/* --- Contains web-crawling functions. --- */

/* Parses out link to studio and initiates crawl. */
function getID(string) {

  /* Variables */
  var id = 0;
  var page = 1;
  var res = string.split("/");

  /* Retrieve studio ID. */
  res.forEach(function(element) {
    if(/^\d+$/.test(element)) {
      id = element;
    }
  });

  /* Check for invalid URL. */
  if (id == 0) {
    linkError();
    return;
  }
  return id;
}

/* Collects links to project pages from studio html and initiates JSON recovery. */
function getRequestURL(id) {
  console.log("here");

  var url = "http://chord.cs.uchicago.edu/pdf_gen/" + id;
  window.open(url, '_blank');
  return;
  //getJSON(url);
}

/* Request project jsons and initiate analysis. */
function getJSON(requestURL,process_function, args){

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
      if(request.status != 200) {
        linkError();
        return;
      }
      console.log(request.status);
    }
    
}