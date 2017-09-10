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
    console.log("clicked");
  };

});
