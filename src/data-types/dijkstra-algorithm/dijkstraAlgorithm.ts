type DijkstraGraph = { [key: string]: { [key: string]: number } };

const testGraph: DijkstraGraph = {
  a: { b: 2, c: 1 },
  b: { a: 2, f: 7 },
  c: { a: 1, d: 5, e: 2 },
  d: { f: 2, c: 5 },
  e: { f: 1, c: 2 },
  f: { b: 7, g: 1, d: 2 },
  g: { f: 1 }
};

type CostTable = {
  [key: string]: number;
};

function findShortPath(
  graph: DijkstraGraph,
  start: string,
  end: string
): {
  totalCostTable: CostTable;
  distance: number;
  path: string[];
} {
  // tracking path
  let parents: { [key: string]: string | null } = { endNode: null };
  for (const child in graph[start]) {
    if (Object.prototype.hasOwnProperty.call(graph[start], child)) {
      parents[child] = start;
    }
  }

  const costTable: CostTable = {};
  const processed: Array<string> = [];
  let neighbors: CostTable = {};

  Object.keys(graph).forEach((node) => {
    if (node !== start) {
      let value = graph[start][node];
      costTable[node] = value || Infinity;
    }
  });

  let node = findLowestCostNode(costTable, processed);

  while (node) {
    const cost = costTable[node];
    neighbors = graph[node];

    Object.keys(neighbors).forEach((neighbor) => {
      let newCost = cost + neighbors[neighbor];
      if (newCost < costTable[neighbor]) {
        costTable[neighbor] = newCost;
        parents[neighbor] = node;
      }
    });

    processed.push(node);
    node = findLowestCostNode(costTable, processed);
  }

  //writing path into an array and formatting it
  let path = [end];
  let parent = parents[end];
  while (parent) {
    path.push(parent);
    parent = parents[parent];
  }
  path.reverse();

  return {
    totalCostTable: costTable,
    distance: costTable[end],
    path: path
  };
}

function findLowestCostNode(
  costTable: CostTable,
  processed: Array<string>
): string | null {
  let lowestCost: number = Infinity;
  let lowestNode: string | null = null;

  Object.keys(costTable).forEach((node) => {
    let cost = costTable[node];
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestNode = node;
    }
  });
  return lowestNode;
}

console.log(findShortPath(testGraph, 'a', 'g'));
