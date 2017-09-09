let links = [];
let parentNode = {};
let nodes = [];
let nodeIndex = {};
let preparedGraph;

let dataGraph = {
  nodes: nodes,
  links: links,
};

function parseJSON() {
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
  data(dataGraph);
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
  linksArr.forEach(node => {
    let link = {
      source: parentNode.name,
      target: node['*'],
    };
    links.push(link);
  });
}
