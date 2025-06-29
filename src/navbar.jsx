import React, { Component } from "react";
import "./navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      visualize,
      clearPath,
      resetGrid,
      action,
      algorithm,
      onAlgorithmChange,
      generateRandomMaze
    } = this.props;
    return (
      <>
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              <select
                value={algorithm}
                onChange={(e) => onAlgorithmChange(e.target.value)}
                className="nav-select"
              >
                <option value="DIJKSTRA">Dijkstra</option>
                <option value="ASTAR">A*</option>
                <option value="greedyBFS">Greedy BFS</option>
                <option value="BFS">BFS</option>
              </select>
            </li>
            <li>
              <button
                onClick={() => visualize()}
                className={`nav-btn${
                  action === "visualizing_algorithm" ? " visualizing_algorithm" : ""
                }`}
              >
                visualize {algorithm.toLowerCase()}
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => clearPath()}>
                Clear Path
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => resetGrid()}>
                Reset Board
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => generateRandomMaze()}>
                Generate Random Maze
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}


