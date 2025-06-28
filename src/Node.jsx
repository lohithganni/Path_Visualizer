import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isStart, isFinish, weight, isPath, isShortestPath, handleWeightChange } = this.props;

    
    const appendClassName = isShortestPath
      ? "shortest-path-node"
      : isPath
      ? "path-node"
      : isStart
      ? "start-node"
      : isFinish
      ? "finish-node"
      : "";
    return (
      <div
        className={`node ` + (weight===Infinity? `wall-node` : `${appendClassName}`)}
        onClick={() => handleWeightChange(this.props.row, this.props.col)}
      ></div>
    );
  }
}
