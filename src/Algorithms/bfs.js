import { getShortestPath } from "./getShortestPath";

export function bfs(grid, startNode, endNode) {
  console.log("bfs");
  const visitedNodes = [];
  const n = grid.length;
  const m = grid[0].length;

  const visited = new Array(n);
  const prev = new Array(n);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(m).fill(false);
    prev[i] = new Array(m).fill(null);
  }

  let queue = [];
  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const node = queue.shift();
    const { row, col } = node;
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
        prev[newRow][newCol] = node;
        queue.push(grid[newRow][newCol]);
        visited[newRow][newCol] = true;
      }
    }
  }
  const shortestPath = getShortestPath(prev, endNode);

  return { visitedNodes, shortestPath };
}
