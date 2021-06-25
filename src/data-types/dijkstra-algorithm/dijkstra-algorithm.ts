type DGraph = { [key: string]: { [key: string]: number } };

const dijGraph: DGraph = {
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

function findLowestCostNode(costTable: CostTable, processed: Array<string>) {
  let lowestCost: number = Infinity;
  let lowestNode: string = '';
  Object.keys(costTable).forEach((node) => {
    let cost = costTable[node];
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestNode = node;
    }
  });
  return lowestNode;
}
const path: Array<string> = [];
function shortPath(graph: DGraph, start: string, end: string) {
  const path: any = {};

  const costTable: CostTable = {};
  const processed: Array<string> = [];
  let neighbors: CostTable = {};
  Object.keys(graph).forEach((node) => {
    if (node !== start) {
      let value = graph[start][node];
      costTable[node] = value || Infinity;
      path[start] = node;
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
        path[neighbor] = node;
      }
    });
    processed.push(node);
    node = findLowestCostNode(costTable, processed);
  }

  console.log(path);

  return costTable;
}

console.log(shortPath(dijGraph, 'a', 'e'));
