import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/*
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleFunction(this.props.id);
  }
  render() {
    return (
      <button className="square" onClick={this.handleClick}>
        {this.props.value}
      </button>
    );
  }
}
*/

function SquareF(props) {
  return (
    <button className="square" onClick={props.handleClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <SquareF
        id={i}
        value={this.props.squares[i]}
        handleClick={this.props.handleClick.bind(this, i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      player: "X",
    };
  }

  handleClick(id) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    if (winner) {
      return;
    }
    let updatedSquares = current.squares.slice();
    updatedSquares[id] = this.state.player;
    let updatedPlayer = this.state.player === "X" ? "O" : "X";
    this.setState({
      player: updatedPlayer,
      history: history.concat([{ squares: updatedSquares }]),
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    let status = <div className="status">Next Player: {this.state.player}</div>;
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = (
        <div className="status">Game Over! Player {winner} has won!</div>
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            handleClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
