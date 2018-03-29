import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';

import { CELL_STATE, chopBoard } from '../lib/board';

class Cell extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node
  };

  onClick = () => {
    if (!this.props.onClick) {
      return;
    }
    this.props.onClick(this.props.index);
  };

  render() {
    return (
      <Div
        onClick={this.onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          cursor: 'pointer'
        }}
        css={
          this.props.onClick
            ? {
                background: '#FFFFFF',
                transition: 'background 0.2s ease-in',
                ':hover': {
                  background: '#FFFF99'
                }
              }
            : null
        }
      >
        {this.props.children}
      </Div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.node,
  onClick: PropTypes.func
};

function Board({ board, onClick }) {
  const uiBoard = chopBoard(board);
  let globalIndex = -1;
  return (
    <table>
      <tbody>
        {uiBoard.map((line, xi) => (
          <tr key={xi}>
            {line.map((val, yi) => {
              ++globalIndex;
              return (
                <td key={yi} title={val}>
                  {val === CELL_STATE.PLAYER_X && <Cell index={globalIndex}>X</Cell>}
                  {val === CELL_STATE.PLAYER_0 && <Cell index={globalIndex}>0</Cell>}
                  {val === CELL_STATE.NONE && (
                    <Cell index={globalIndex} onClick={onClick}>
                      &nbsp;
                    </Cell>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

BoardWrapper.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
};

function BoardWrapper({ board, onClick, children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Board board={board} onClick={onClick} />
      {children}
    </div>
  );
}

export default BoardWrapper;
