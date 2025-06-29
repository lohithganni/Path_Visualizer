import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isStart, isFinish, weight, isPath, isShortestPath, handleMouseEnter, handleMouseDown, handleMouseUp } = this.props;

    
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
        onMouseEnter={() => handleMouseEnter(this.props.row, this.props.col)}
        onMouseDown={() => handleMouseDown(this.props.row, this.props.col)}
        onMouseUp={() => handleMouseUp(this.props.row, this.props.col)}
      ></div>
    );
  }
}
