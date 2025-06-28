import React, { Component } from "react";
import Node from "./Node.jsx";
import "./grid.css";
import dikstras from "./Algorithms/dikstras.js";
import Navbar from "./navbar.jsx";

const START_ROW = 10;
const START_COL = 15;
const FINISH_ROW = 12;
const FINISH_COL = 20;

const ROWS = 25;
const COLS = 65;
const BUILDING_MAZE = "building_maze";
const VISUALIZING_ALGORITHM = "visualizing_algorithm";
const VISUALIZING_SHORTEST_PATH = "visualizing_shortest_path";

export default class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      action: BUILDING_MAZE, // BUILDING_MAZE | VISUALIZING_ALGORITHM | VISUALIZING_SHORTEST_PATH
    };
  }

  visualizeDikstras = async () => {
    if (this.state.action == BUILDING_MAZE) {
      await this.clearPath();
      const grid = this.state.grid.map((row) =>
        row.map((node) => ({ ...node }))
      );
      const { visitedNodes, shortestPath } = dikstras(
        grid,
        grid[START_ROW][START_COL],
        grid[FINISH_ROW][FINISH_COL]
      );

      await this.animateDikstras(visitedNodes);
      await this.animatePath(shortestPath);
    }
  };

  animateDikstras = (visitedNodes) => {
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

  handleWeightChange = (row, col) => {
    const newGrid = this.state.grid.map((r) => r.map((n) => ({ ...n })));
    newGrid[row][col].weight = newGrid[row][col].weight === 1 ? Infinity : 1;
    this.setState({ grid: newGrid });
  };

  componentDidMount() {
    const newGrid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        const currentNode = {
          row: row,
          col: col,
          isStart: row == START_ROW && col == START_COL,
          isFinish: row == FINISH_ROW && col == FINISH_COL,
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
      <>
        <Navbar
          visualizeDikstras={this.visualizeDikstras}
          clearPath={this.clearPath}
          resetGrid={this.resetGrid}
          action={this.state.action}
        />

        <div className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {row.map((node, nodeIdx) => (
                <Node
                  key={nodeIdx}
                  row={node.row}
                  col={node.col}
                  isStart={node.isStart}
                  isFinish={node.isFinish}
                  isPath={node.isPath}
                  weight={node.weight}
                  isShortestPath={node.isShortestPath}
                  handleWeightChange={this.handleWeightChange}
                />
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }
}
