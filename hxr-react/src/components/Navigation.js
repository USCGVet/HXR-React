import React from 'react';

function Navigation() {
  return (
    <nav className="app-navigation">
      <a href="/">Home</a>
      <a href="/whitepaper">White Paper</a>
      <a href="/slow">Single-Stake-Query</a>
      <a href="https://hex.com">
        <img src="/HEXagon.png" alt="Hex" className="nav-icon" />
        Hex
      </a>
      <a href="/createStake">Stake Hex</a>
    </nav>
  );
}

export default Navigation;