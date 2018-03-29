import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import logo from '../assets/logo.svg';

const rotate = css.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});

Header.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
};

export default function Header({ title, children }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <header
        style={{
          backgroundColor: '#222',
          height: '150px',
          padding: '20px',
          color: 'white'
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            animation: `${rotate} infinite 20s linear`,
            height: '80px'
          }}
        />
        <h1 style={{ fontSize: '1.5em' }}>{title}</h1>
      </header>
      {children}
    </div>
  );
}
