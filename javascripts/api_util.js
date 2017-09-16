let parentObj = {};
let linksArr = [];
let index = 0;

function handleSearch(query) {
  document.getElementById("retry").innerHTML = "";
  document.getElementById('loading').setAttribute("style","width:5vw");
  getSections(buildSectionUrl(query), prepareGetLinks);
}

function storeLinks(links) {
  document.getElementById('loading').setAttribute("style","width:65vw");
  if (links.parse) {
    linksArr = links.parse.links;
    parseJSON();
  } else {
    handleEmpty();
    return;
  }
}

function storeParent(json) {
  parentObj = json;
}

function buildSectionUrl(query) {
  document.getElementById('loading').setAttribute("style","width:10vw");
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&prop=sections&page=${query}`;
}

function getSections(url, callback) {
  document.getElementById('loading').setAttribute("style","width:25vw");
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: callback
  });
}

function prepareGetLinks(json) {
  document.getElementById('loading').setAttribute("style","width:30vw");
  storeParent(json);
  if (json.parse) {
    getLinks(buildLinksUrl(0));
  } else {
    handleEmpty();
  }
}

function buildLinksUrl(index) {
  document.getElementById('loading').setAttribute("style","width:35vw");
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=links&page=${parentObj.parse.title}&section=${index}`;
}

function getLinks(url) {
  document.getElementById('loading').setAttribute("style","width:50vw");
  $.ajax({
    url: url,
    dataType: 'jsonp',
  }).then(links => storeLinks(links));
}

function handleEmpty() {
  document.getElementById('loading').setAttribute("style","width:0vw");
  document.getElementById("retry").innerHTML = "That article doesn't have enough related links.";
  return;
}

function getArticlePreview(title) {
  $.ajax({
    url: `https://en.wikipedia.org/w/api.php?format=json&redirects=1&action=query&prop=extracts&exintro=&explaintext=&titles=${title}`,
    dataType: 'jsonp',
  }).then(result => injectArticlePreview(result));
}

function injectArticlePreview(result) {
  let pagesJsonKey = Object.keys(result.query.pages)[0];
  document.getElementById('article-prev-title').innerHTML = result.query.pages[pagesJsonKey].title;
  document.getElementById('article-prev-text').innerHTML = result.query.pages[pagesJsonKey].extract || "";

  document.getElementById('article-link').href = "";
  let outLink = `https://en.wikipedia.org/wiki/${result.query.pages[pagesJsonKey].title}`;
  document.getElementById('article-link').href = outLink;
}
