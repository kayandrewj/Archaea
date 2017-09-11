document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('searchform').addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch(e.target["0"].value);
  });

  document.getElementById('reset').onclick = () => {
    links = [];
    parentNode = {};
    nodes = [];
    nodeIndex = {};
    parentObj = {};
    linksArr = [];

    dataGraph = {
      nodes: [],
      links: [],
    };
    data(dataGraph);
    document.getElementById('article-prev-title').innerHTML = "How to use Archaea";
    document.getElementById('article-prev-text').innerHTML = "Search for anything or click the demo button. Then pull nodes to grow the article tree. If new nodes don't sprout, you've reached the end of that branch!";

    document.getElementById('article-link').href = `https://github.com/kayandrewj/Archaea/blob/master/README.md`;

  };

});
