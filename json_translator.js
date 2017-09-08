let nodes = [];

function mapArticlesToNodes() {
  let nodes = [];
  let articles = linksArr;

  articles.forEach(article => {
    let node = { name: ''};
    node.name = article['*'];
    nodes.push(node);
  });

}
  //
  // let demo = {
  //   target: parentObj.parse.title,
  //   source: linksArr[i]['*']
  // };
