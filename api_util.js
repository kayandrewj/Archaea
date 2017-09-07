let linksObj = {};
let parentObj = {};
let linksGraph = {};

// takes text from input, sends generated URL and callback to getSections xml request
function handleSearch(query) {
  getSections(buildSectionUrl(query), prepareGetLinks);
}

function storeLinks(links) {
  linksObj = links;
}

function storeParent(json) {
  parentObj = json;
}

// builds url to fetch all sections of target article
function buildSectionUrl(query) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=sections&page=${query}`;
}

// sends request to get article section json
// callback: calls `prepareGetLinks`
function getSections(url, callback) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseJson);
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

// saves parent article for access in link builder
// finds index of 'see also' section
// calls getLinks xml request, sending final link storage action as callback.

function prepareGetLinks(json) {
  storeParent(json);
  let sectionArr = json.parse.sections;
  sectionArr.forEach((obj) => {
    if (obj.anchor === "See_also") {
      getLinks(buildLinksUrl(obj.index), storeLinks);
    }
  });
}

function buildLinksUrl(index) {
  return `https://en.wikipedia.org/w/api.php?action=parse&prop=links&page=${parentObj.parse.title}&section=${index}`;
}

function getLinks(url, callback) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseJson);
      }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
