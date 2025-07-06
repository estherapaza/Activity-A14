// process.js

// Config
const width = 600;
const height = 300;

// Dendrogram 1
function drawDendrogram1(linkageMatrix) {
  const svg = d3.select("#dendro1")
    .attr("width", width)
    .attr("height", height);

  // Escala para distancias
  const maxDistance = d3.max(linkageMatrix, d => d[2]);
  const yScale = d3.scaleLinear()
    .domain([0, maxDistance])
    .range([height - 20, 20]);

  // X: solo distribuimos los nodos hoja
  const leafCount = linkageMatrix.length + 1;
  const xScale = d3.scaleLinear()
    .domain([0, leafCount - 1])
    .range([20, width - 20]);

  // Generamos nodos internos (id = index + leafCount)
  const nodes = [];
  linkageMatrix.forEach((link, i) => {
    const [left, right, distance, sampleCount] = link;
    nodes.push({
      id: i + leafCount,
      left: left,
      right: right,
      distance: distance
    });
  });

  // Calcular posiciones de nodos
  const positions = {};
  // Asignar X a hojas
  for (let i = 0; i < leafCount; i++) {
    positions[i] = { x: xScale(i), y: height - 10 };
  }

  nodes.forEach(node => {
    const leftPos = positions[node.left];
    const rightPos = positions[node.right];
    const y = yScale(node.distance);
    const x = (leftPos.x + rightPos.x) / 2;
    positions[node.id] = { x, y };

    // Dibujar líneas verticales
    svg.append("line")
      .attr("x1", leftPos.x)
      .attr("y1", leftPos.y)
      .attr("x2", leftPos.x)
      .attr("y2", y)
      .attr("stroke", "steelblue");

    svg.append("line")
      .attr("x1", rightPos.x)
      .attr("y1", rightPos.y)
      .attr("x2", rightPos.x)
      .attr("y2", y)
      .attr("stroke", "steelblue");

    // Línea horizontal que conecta ambos
    svg.append("line")
      .attr("x1", leftPos.x)
      .attr("y1", y)
      .attr("x2", rightPos.x)
      .attr("y2", y)
      .attr("stroke", "steelblue");
  });
}

// Dendrogram 2 (idéntico)
function drawDendrogram2(linkageMatrix) {
  const svg = d3.select("#dendro2")
    .attr("width", width)
    .attr("height", height);

  const maxDistance = d3.max(linkageMatrix, d => d[2]);
  const yScale = d3.scaleLinear()
    .domain([0, maxDistance])
    .range([height - 20, 20]);

  const leafCount = linkageMatrix.length + 1;
  const xScale = d3.scaleLinear()
    .domain([0, leafCount - 1])
    .range([20, width - 20]);

  const nodes = [];
  linkageMatrix.forEach((link, i) => {
    const [left, right, distance, sampleCount] = link;
    nodes.push({
      id: i + leafCount,
      left: left,
      right: right,
      distance: distance
    });
  });

  const positions = {};
  for (let i = 0; i < leafCount; i++) {
    positions[i] = { x: xScale(i), y: height - 10 };
  }

  nodes.forEach(node => {
    const leftPos = positions[node.left];
    const rightPos = positions[node.right];
    const y = yScale(node.distance);
    const x = (leftPos.x + rightPos.x) / 2;
    positions[node.id] = { x, y };

    svg.append("line")
      .attr("x1", leftPos.x)
      .attr("y1", leftPos.y)
      .attr("x2", leftPos.x)
      .attr("y2", y)
      .attr("stroke", "orange");

    svg.append("line")
      .attr("x1", rightPos.x)
      .attr("y1", rightPos.y)
      .attr("x2", rightPos.x)
      .attr("y2", y)
      .attr("stroke", "orange");

    svg.append("line")
      .attr("x1", leftPos.x)
      .attr("y1", y)
      .attr("x2", rightPos.x)
      .attr("y2", y)
      .attr("stroke", "orange");
  });
}

// Cargar los JSON
d3.json("linkage_worklife.json").then(drawDendrogram1);
d3.json("linkage_professional.json").then(drawDendrogram2);


// =====================
// d
// =====================

// =====================
// =====================
// ñ
// =====================


// =====================
// f
// =====================
