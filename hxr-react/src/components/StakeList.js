import React, { useState } from 'react';

function StakeList({ stakes }) {
  const [currentPage, setCurrentPage] = useState(1);
  const stakesPerPage = 10;

  // Get current stakes
  const indexOfLastStake = currentPage * stakesPerPage;
  const indexOfFirstStake = indexOfLastStake - stakesPerPage;
  const currentStakes = stakes.slice(indexOfFirstStake, indexOfLastStake);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format number function (similar to formatBigIntWithDecimals in the original script)
  const formatNumber = (value, divisor, decimalPlaces) => {
    const stringValue = value.toString();
    const integerPart = stringValue.slice(0, -divisor) || '0';
    const fractionalPart = stringValue.slice(-divisor);
    const formattedFractional = fractionalPart.padStart(divisor, '0').slice(0, decimalPlaces);
    return `${integerPart}.${formattedFractional}`;
  };

  return (
    <div className="stake-list">
      <h2>Stake List</h2>
      <table>
        <thead>
          <tr>
            <th>Stake ID</th>
            <th>Staked Hex</th>
            <th>Stake B-Shares</th>
            <th>Locked Day</th>
            <th>Staked Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStakes.map((stake) => (
            <tr key={stake.id}>
              <td>{stake.stakeId}</td>
              <td>{formatNumber(stake.stakedHearts, 8, 3)}</td>
              <td>{formatNumber(stake.stakeShares, 9, 3)}</td>
              <td>{stake.lockedDay}</td>
              <td>{stake.stakedDays}</td>
              <td>
                <button className="action-button">Claim</button>
                <button className="action-button">Good Accounting</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(stakes.length / stakesPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StakeList;