import { getShortestPath } from "./getShortestPath";

export function dijkstra(grid, startNode, endNode) {
  const visitedNodes = [];
  const n = grid.length;
  const m = grid[0].length;

  const dist = new Array(n);
  const visited = new Array(n);
  const prev = new Array(n);
  for (let i = 0; i < n; i++) {
    dist[i] = new Array(m).fill(Infinity);
    visited[i] = new Array(m).fill(false);
    prev[i] = new Array(m).fill(null);
  }

  dist[startNode.row][startNode.col] = 0;
  const Heap = [];
  Heap.push(startNode);

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (Heap.length > 0) {
    Heap.sort((a, b) => dist[b.row][b.col] - dist[a.row][a.col]);
    const node = Heap.pop();
    const { row, col } = node;

    if (visited[row][col]) continue;
    visited[row][col] = true;
    visitedNodes.push(node);

    if (row === endNode.row && col === endNode.col) {
      // visited the end node
      break;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (
        newRow >= 0 &&
        newRow < n &&
        newCol >= 0 &&
        newCol < m &&
        grid[newRow][newCol].weight !== Infinity &&
        !visited[newRow][newCol]
      ) {
        const alt = dist[row][col] + grid[newRow][newCol].weight;
        if (alt < dist[newRow][newCol]) {
          dist[newRow][newCol] = alt;
          prev[newRow][newCol] = node;
          Heap.push(grid[newRow][newCol]);
        }
      }
    }
  }
  const shortestPath = getShortestPath(prev, endNode);

  return { visitedNodes, shortestPath };
}