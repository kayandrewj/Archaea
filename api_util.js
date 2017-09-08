let parentObj = {};
let linksArr = [];
let linksGraph = {};

function handleSearch(query) {
  getSections(buildSectionUrl(query), prepareGetLinks);
}

function storeLinks(links) {
  linksArr = links.parse.links;
  debugger
}

function storeParent(json) {
  parentObj = json;
}

function buildSectionUrl(query) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=sections&page=${query}`;
}

function getSections(url, callback) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: callback
  });
}

function prepareGetLinks(json) {
  storeParent(json);
  let sectionArr = json.parse.sections;
  sectionArr.forEach((obj) => {
    if (obj.anchor === "See_also") {
      getLinks(buildLinksUrl(parseInt(obj.index)));
    }
  });
}

function buildLinksUrl(index) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=links&page=${parentObj.parse.title}&section=${index}`;
}

function getLinks(url) {
  $.ajax({
    url: url,
    dataType: 'jsonp',
  }).then(links => storeLinks(links));

}
