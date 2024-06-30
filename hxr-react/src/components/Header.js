import React from 'react';

function Header({ account, networkName }) {
  return (
    <header className="app-header">
      <div className="logo">
        <img src="/logo-nobackground-1000.png" alt="HexRewards Logo" />
        <h1>HexRewards</h1>
      </div>
      <div className="header-right">
        {account ? (
          <>
            <div>Connected: {account}</div>
            <div>Network: {networkName}</div>
          </>
        ) : (
          <button className="connect-button">Connect to MetaMask</button>
        )}
      </div>
    </header>
  );
}

export default Header;