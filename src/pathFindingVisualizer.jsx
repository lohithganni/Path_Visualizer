import React, { Component } from "react";
import Node from "./Node.jsx";
import "./grid.css";
import {
  dijkstra,
  aStar,
  greedyBFS,
  bfs,
  dfs,
} from "./Algorithms/algorithms.js";
import { generateMaze } from "./gridUtils.js";
import Navbar from "./navbar.jsx";
import "./navbar.css";

const ROWS = 25;
const COLS = 69;

const START_ROW = 0;
const START_COL = 0;
const FINISH_ROW = ROWS - 1;
const FINISH_COL = COLS - 1;

const BUILDING_MAZE = "building_maze";
const VISUALIZING_ALGORITHM = "visualizing_algorithm";
const VISUALIZING_SHORTEST_PATH = "visualizing_shortest_path";
const MOVING_STARTING_NODE = "moving_startting_node";
const MOVING_FINISH_NODE = "moving_finish_node";

export default class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      start_row: START_ROW,
      start_col: START_COL,
      finish_row: FINISH_ROW,
      finish_col: FINISH_COL,
      isMousePressed: false,
      action: BUILDING_MAZE, // BUILDING_MAZE | VISUALIZING_ALGORITHM | VISUALIZING_SHORTEST_PATH
      algorithm: "DIJKSTRA", // default algorithm
    };
  }

  visualize = async () => {
    if (this.state.action == BUILDING_MAZE) {
      await this.clearPath();
      const grid = this.state.grid.map((row) =>
        row.map((node) => ({ ...node }))
      );
      let visitedNodes, shortestPath;
      if (this.state.algorithm === "DIJKSTRA") {
        const result = dijkstra(
          grid,
          grid[this.state.start_row][this.state.start_col],
          grid[this.state.finish_row][this.state.finish_col]
        );
        visitedNodes = result.visitedNodes;
        shortestPath = result.shortestPath;
      } else if (this.state.algorithm === "ASTAR") {
        const result = aStar(
          grid,
          grid[this.state.start_row][this.state.start_col],
          grid[this.state.finish_row][this.state.finish_col]
        );
        visitedNodes = result.visitedNodes;
        shortestPath = result.shortestPath;
      } else if (this.state.algorithm === "greedyBFS") {
        const result = greedyBFS(
          grid,
          grid[this.state.start_row][this.state.start_col],
          grid[this.state.finish_row][this.state.finish_col]
        );
        visitedNodes = result.visitedNodes;
        shortestPath = result.shortestPath;
      } else if (this.state.algorithm === "BFS") {
        const result = bfs(
          grid,
          grid[this.state.start_row][this.state.start_col],
          grid[this.state.finish_row][this.state.finish_col]
        );
        visitedNodes = result.visitedNodes;
        shortestPath = result.shortestPath;
      } else {
        console.log('select an algorithm');
        return;
      }

      await this.animateSearch(visitedNodes);
      await this.animatePath(shortestPath);
    }
  };

  animateSearch = (visitedNodes) => {
    this.setState({ action: VISUALIZING_ALGORITHM });
    const newGrid = this.state.grid.map((row) =>
      row.map((node) => ({ ...node }))
    );
    return new Promise((resolve) => {
      for (let i = 0; i < visitedNodes.length; i++) {
        setTimeout(() => {
          const node = visitedNodes[i];
          newGrid[node.row][node.col].isPath = true;
          this.setState({ grid: newGrid });
          if (i === visitedNodes.length - 1) resolve();
        }, 10 * i);
      }
    });
  };

  animatePath = (shortestPath) => {
    this.setState({ action: VISUALIZING_SHORTEST_PATH });
    const newGrid = this.state.grid.map((row) =>
      row.map((node) => ({ ...node }))
    );
    return new Promise((resolve) => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          newGrid[node.row][node.col].isShortestPath = true;
          this.setState({ grid: newGrid });
          if (i === shortestPath.length - 1) {
            this.setState({ action: BUILDING_MAZE });
            resolve();
          }
        }, 10 * i);
      }
    });
  };

  resetGrid = () => {
    this.componentDidMount();
  };

  clearPath = () => {
    return new Promise((resolve) => {
      if (this.state.action === BUILDING_MAZE) {
        const grid = this.state.grid;
        const newGrid = grid.map((row) =>
          row.map((node) => ({ ...node, isPath: false, isShortestPath: false }))
        );
        this.setState({ grid: newGrid }, resolve);
      }
    });
  };

  handleWeightChange = async (row, col) => {
    if (
      (row === this.state.start_row && col === this.state.start_col) ||
      (row === this.state.finish_row && col === this.state.finish_col)
    ) {
      return;
    }
    const newGrid = this.state.grid.map((r) => r.map((n) => ({ ...n })));
    newGrid[row][col].weight = newGrid[row][col].weight === 1 ? Infinity : 1;
    await new Promise((resolve) => this.setState({ grid: newGrid }, resolve));
  };

  handleMouseDown = (row, col) => {
    if (row === this.state.start_row && col === this.state.start_col) {
      this.setState({ isMousePressed: true, action: MOVING_STARTING_NODE });
    } else if (row === this.state.finish_row && col === this.state.finish_col) {
      this.setState({ isMousePressed: true, action: MOVING_FINISH_NODE });
    } else {
      this.setState({ isMousePressed: true }, () => {
        this.handleWeightChange(row, col);
      });
    }
  };

  handleMouseUp = () => {
    if (
      this.state.action === MOVING_STARTING_NODE ||
      this.state.action === MOVING_FINISH_NODE
    ) {
      this.setState({
        action: BUILDING_MAZE,
        isMousePressed: false,
      });
    } else {
      this.setState({ isMousePressed: false });
    }
    console.log("mouseUp");
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.isMousePressed) return;

    if (this.state.action === MOVING_STARTING_NODE) {
      this.setState({
        start_row: row,
        start_col: col,
      });
    } else if (this.state.action === MOVING_FINISH_NODE) {
      this.setState({
        finish_row: row,
        finish_col: col,
      });
    } else {
      this.handleWeightChange(row, col);
    }
  };

  generateRandomMaze = async () => {
    await this.clearPath();
    const newGrid = generateMaze(
      this.state.grid,
      this.state.start_row,
      this.state.start_col,
      this.state.finish_row,
      this.state.finish_col
    );
    this.setState({ grid: newGrid });
  };

  handleAlgorithmChange = (value) => {
    this.setState({ algorithm: value });
  };

  componentDidMount() {
    const newGrid = [];
    console.log("component did mount");
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        const currentNode = {
          row: row,
          col: col,

          isPath: false,
          isShortestPath: false,
          weight: 1,
        };
        currentRow.push(currentNode);
      }
      newGrid.push(currentRow);
    }
    this.setState({
      grid: newGrid,
      action: BUILDING_MAZE,
    });
  }

  render() {
    const grid = this.state.grid;

    return (
      <div>
        <Navbar
          visualize={this.visualize}
          clearPath={this.clearPath}
          resetGrid={this.resetGrid}
          action={this.state.action}
          algorithm={this.state.algorithm}
          onAlgorithmChange={this.handleAlgorithmChange}
          generateRandomMaze={this.generateRandomMaze}
        />

        <div className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {row.map((node, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  row={node.row}
                  col={node.col}
                  isStart={
                    this.state.start_row === node.row &&
                    this.state.start_col === node.col
                  }
                  isFinish={
                    this.state.finish_row === node.row &&
                    this.state.finish_col === node.col
                  }
                  isPath={node.isPath}
                  weight={node.weight}
                  isShortestPath={node.isShortestPath}
                  handleWeightChange={this.handleWeightChange}
                  handleMouseDown={this.handleMouseDown}
                  handleMouseUp={this.handleMouseUp}
                  handleMouseEnter={this.handleMouseEnter}
                  onAlgorithmChange={this.handleAlgorithmChange}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
