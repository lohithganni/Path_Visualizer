export function generateMaze(grid, start_row, start_col, finish_row, finish_col) {
    console.log('generate random');
  const n = grid.length;
  const m = grid[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if((i==start_row && j == start_col) || (i==finish_row && j==finish_col)){
            continue;
        }
      let r = Math.floor(Math.random() * 5);
      if (r == 0) {
        grid[i][j].weight = Infinity;
      } else {
        grid[i][j].weight = 1;
      }
    }
  }
  return grid;
}

/*
    node : {
        row,
        col,
        isPath, //false
        isShortestPath, // false
        weight, // weight -> 1,2, Infinity
    }
*/
