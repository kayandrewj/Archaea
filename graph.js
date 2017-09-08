let dragTimer = 0;

const canvas = d3.select("#network"),
  width = canvas.attr("width"),
  height = canvas.attr("height"),
  r = 6;
  ctx = canvas.node().getContext("2d"),

  simulation = d3.forceSimulation()
    .force("x", d3.forceX(width/2)
      .strength(1))
    .force("y", d3.forceY(height/2)
      .strength(1))
    .force("collide", d3.forceCollide(r))
    .force("charge", d3.forceManyBody()
      .strength(-72))
    .force("link", d3.forceLink());

d3.json("data.json", function(err, graph) {
  if (err) throw err;

  simulation
    .nodes(graph.nodes)
    .on("tick", update)
    .force("link")
      .links(graph.links);

  canvas
    .call(d3.drag()
      .container(canvas.node())
      .subject(dragSubject)
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded));

  function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    simulation
      .force("x", d3.forceX(canvas.width/2))
      .force("y", d3.forceY(canvas.height/2));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#ccc";
    graph.links.forEach(drawLink);
    ctx.stroke();

    ctx.globalAlpha = 1.0;
    graph.nodes.forEach(drawNode);
    ctx.fill();
  }

  function dragSubject() {
    return simulation.find(d3.event.x, d3.event.y);
  }

});
  function drawNode(d) {
    ctx.beginPath();

    ctx.fillStyle = "green";
    ctx.moveTo(d.x, d.y);
    ctx.arc(d.x, d.y, r, 0, 2*Math.PI);
    ctx.fill();
  }

  function drawLink(l) {
    ctx.moveTo(l.source.x, l.source.y);
    ctx.lineTo(l.target.x, l.target.y);
  }


function dragStarted() {
  console.log(d3.event.subject.name);
  dragTimer = 0;
  if (!d3.event.active)
  simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
  dragTimer += 1;
  if (dragTimer === 25) {
    handleSearch(d3.event.subject.name);
  }

  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragEnded() {
  if (!d3.event.active) simulation.alphaTarget(0);


  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}
