import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'glamorous';

import { PLAYERS } from '../lib/board';

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
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '49px',
          height: '49px',
          cursor: 'pointer',
          margin: '3px',
          position: 'relative',
          ...(this.props.onClick
            ? {
                background: '#fff',
                transition: 'background 0.2s ease-in',
                ':hover': {
                  background: '#eee'
                }
              }
            : null)
        }}
      >
        <Div
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: '3px',
            color: '#000',
            fontSize: '10px',
            opacity: 0.1
          }}
        >
          {this.props.index + 1}
        </Div>
        {this.props.children}
      </Div>
    );
  }
}

const VLine = ({ css }) => (
  <Div
    css={{
      position: 'absolute',
      borderLeft: '1px solid #000',
      zIndex: 1,
      opacity: 0.2,
      top: 0,
      bottom: 0,
      ...css
    }}
  />
);

const HLine = ({ css }) => (
  <Div
    css={{
      position: 'absolute',
      borderBottom: '1px solid #000',
      zIndex: 1,
      opacity: 0.2,
      left: 0,
      right: 0,
      ...css
    }}
  />
);

Board.propTypes = {
  board: PropTypes.node,
  onClick: PropTypes.func
};

function Board({ board, player, currentPlayer, onClick, children }) {
  const disabled = player !== currentPlayer;
  return (
    <Div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Div
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '165px',
          height: '165px',
          position: 'relative'
          // border: '1px solid #fff',
        }}
      >
        <VLine css={{ left: `${100 / 3}%` }} />
        <VLine css={{ left: `${200 / 3}%` }} />
        <HLine css={{ top: `${100 / 3}%` }} />
        <HLine css={{ top: `${200 / 3}%` }} />
        {board.map((val, i) => (
          <Div
            key={[i, val].join('.')}
            css={{
              display: 'flex',
              flexFlow: i % 3 === 0 ? 'row wrap' : ''
            }}
          >
            {val === PLAYERS.PLAYER_X && <Cell index={i}>X</Cell>}
            {val === PLAYERS.PLAYER_0 && <Cell index={i}>0</Cell>}
            {val === PLAYERS.NOBODY && (
              <Cell index={i} onClick={disabled ? undefined : onClick}>
                &nbsp;
              </Cell>
            )}
          </Div>
        ))}

        {children}
      </Div>
    </Div>
  );
}

export default Board;
