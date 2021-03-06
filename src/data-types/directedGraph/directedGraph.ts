class Graph<T extends string> {
  private adjacencyList: { [key: string]: Array<T> } = {};
  constructor() {}

  addVertex(vertex: T) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(source: T, destination: T) {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
  }

  removeEdge(source: T | string, destination: T) {
    this.adjacencyList[source] = this.adjacencyList[source].filter(
      (vertex) => vertex !== destination
    );
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(
      (vertex) => vertex !== source
    );
  }

  removeVertex(vertex: T) {
    Object.keys(this.adjacencyList).forEach((key) => {
      this.removeEdge(key, vertex);
    });
    delete this.adjacencyList[vertex];
  }
  get getAdjacencyList() {
    return this.adjacencyList;
  }
}

const graph = new Graph<string>();

graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addVertex('d');

graph.addEdge('a', 'c');
graph.addEdge('b', 'c');
graph.addEdge('a', 'b');
graph.addEdge('c', 'e');
graph.removeVertex('c');
console.log(graph.getAdjacencyList);
