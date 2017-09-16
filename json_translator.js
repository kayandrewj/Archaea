let links = [];
let parentNode = {};
let nodes = [];
let nodeIndex = {};
let linkIndex = {};
let preparedGraph;

let dataGraph = {
  nodes: nodes,
  links: links,
};

function parseJSON() {
  document.getElementById('loading').setAttribute("style","width:80vw");
  if (!parentNode.name) {
    parentNode = {
      name: parentObj.parse.title,
      depth: 0
      };
    } else {
      thisDepth = parentNode.depth;
      parentNode = {
        name: parentObj.parse.title,
        depth: thisDepth += 1,
    };
  }

  if (!(parentNode.name in nodeIndex)) {
    nodes.push(parentNode);
  }

  nodeIndex[parentNode.name] = true;

  parseArticlesToNodes();
  parseNodesToLinks();
  dataGraph = {
    nodes: nodes,
    links: links,
  };

  if (dataGraph.nodes.length === 0 || dataGraph.links.length === 0) {
    handleEmpty();
    reset();
  } else {
    data(dataGraph);
  }
  document.getElementById('loading').setAttribute("style","width:0vw");
}

function parseArticlesToNodes() {
  document.getElementById('loading').setAttribute("style","width:90vw");
  let articles = linksArr;
  let newNodes = [];

  articles.forEach(article => {
    let node = {
      name: article['*'],
      depth: parentNode.depth + 1
    };
    if (!(node.name in nodeIndex)) {
      nodes.push(node);
    }
    nodeIndex[node.name] = true;
  });
}

function parseNodesToLinks() {
  document.getElementById('loading').setAttribute("style","width:100vw");
  linksArr.forEach(node => {
    let link = {
      source: parentNode.name,
      target: node['*'],
    };
    if (!(`${link.target} to ${link.source}` in linkIndex)) {
      links.push(link);
    }
    linkIndex[`${link.target} to ${link.source}`] = true;
  });
}

function reset() {
  links = [];
  parentNode = {};
  nodes = [];
  nodeIndex = {};
  parentObj = {};
  linksArr = [];
  Eve = "";

  dataGraph = {
    nodes: [],
    links: [],
  };
  data(dataGraph);
  document.getElementById('article-prev-title').innerHTML = "How to Use Archaea";
  document.getElementById('article-prev-text').innerHTML = "Search for anything. Then pull nodes to grow the article tree. If new nodes don't sprout, you've reached the end of that branch!<br></br>NB: Because Wikipedia can be edited by anyone, not all articles are capable of being algorithmically parsed. If links don't appear, it's possible that the section from which they are usually sourced is mislabeled or missing.";

  document.getElementById('article-link').href = `https://github.com/kayandrewj/Archaea/blob/master/README.md`;
}
