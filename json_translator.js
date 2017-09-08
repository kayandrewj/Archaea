let links = [];
let parentNode = {};
let nodes = [];
let nodeIndex = {};

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
      parentNode = {
        name: parentObj.parse.title,
        depth: parentNode.depth += 1,
    };
  }

  parseArticlesToNodes();
  parseNodesToLinks();
  console.log(nodes);
  console.log(links);
  dataGraph = {
    nodes: nodes,
    links: links,
  };
  console.log(dataGraph);
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
