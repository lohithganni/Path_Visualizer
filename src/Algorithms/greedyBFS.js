import { getShortestPath } from "./getShortestPath";

export function greedyBFS(grid, startNode, endNode) {
  const visitedNodes = [];
  const n = grid.length;
  const m = grid[0].length;

  const dist = new Array(n);
  const abs_dist = new Array(n);
  const visited = new Array(n);
  const prev = new Array(n);
  for (let i = 0; i < n; i++) {
    dist[i] = new Array(m).fill(Infinity);
    abs_dist[i] = new Array(m);
    visited[i] = new Array(m).fill(false);
    prev[i] = new Array(m).fill(null);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      abs_dist[i][j] = abs_dist[i][j] =
        Math.abs(i - endNode.row) + Math.abs(j - endNode.col); // Manhattan distace for 4 directional grid
    }
  }
  dist[startNode.row][startNode.col] = 0;
  const Heap = [];
  Heap.push(startNode);

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  while (Heap.length > 0) {
    Heap.sort((a, b) => abs_dist[b.row][b.col] - abs_dist[a.row][a.col]);
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
        const alt = dist[row][col] + grid[newRow][newCol].weight; // assuming all edges have weight 1
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

