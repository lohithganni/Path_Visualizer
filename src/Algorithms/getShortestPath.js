// Reconstruct the shortest path
export function getShortestPath(prev, endNode) {
  const path = [];
  let node = endNode;
  while (node) {
    path.unshift(node);
    node = prev[node.row][node.col];
  }
  return path;
}
