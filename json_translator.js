let links = [];
let parentNode = {};
let nodes = [];

let nodeIndex = {};

function parseJSON() {
  if (!parentNode.name) {
    parentNode = {
      name: parentObj.parse.title,
      depth: 0
    };
  }

  parseArticlesToNodes();
  parseNodesToLinks();
  console.log(nodes);
  console.log(links);
}

function parseArticlesToNodes() {
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
  nodes.forEach(node => {
    let link = {
      source: parentNode.name,
      target: node.name,
    };
    links.push(link);
  });
}
