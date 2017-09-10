let parentObj = {};
let linksArr = [];

function handleSearch(query) {
  getSections(buildSectionUrl(query), prepareGetLinks);
}

function storeLinks(links) {
  linksArr = links.parse.links;
  parseJSON();
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

function getArticlePreview(title) {
  $.ajax({
    url: `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${title}`,
    dataType: 'jsonp',
  }).then(result => injectArticlePreview(result));
}

function injectArticlePreview(result) {
  let pagesJsonKey = Object.keys(result.query.pages)[0];
  document.getElementById('article-prev-title').innerHTML = result.query.pages[pagesJsonKey].title;
  document.getElementById('article-prev-text').innerHTML = result.query.pages[pagesJsonKey].extract;
}
