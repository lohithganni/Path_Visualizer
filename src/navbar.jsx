import React, { Component } from "react";
import "./navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visualizeDikstras, clearPath, resetGrid, action } = this.props;
    return (
      <>
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              <button
                onClick={() => visualizeDikstras()}
                className={`nav-btn${
                  action === "visualizing_algorithm"
                    ? " visualizing_algorithm"
                    : ""
                }`}
              >
                visualize dikstras
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
              <select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
