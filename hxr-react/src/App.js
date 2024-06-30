import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import StakeList from './components/StakeList';
import { initWeb3 } from './utils/web3';
import HexRewardsContract from './contracts/HexRewards';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [networkName, setNetworkName] = useState('');
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function loadBlockchainData() {
      const { web3: web3Instance, networkName } = await initWeb3();
      setWeb3(web3Instance);
      setNetworkName(networkName);

      if (web3Instance) {
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // Initialize contract with web3 instance
        const contract = new web3Instance.eth.Contract(HexRewardsContract.abi, HexRewardsContract.address);

        // Fetch stakes from the contract
        const stakeList = await contract.methods.getStakeList(accounts[0]).call();
        
        // Transform the stake data
        const formattedStakes = stakeList.map((stake, index) => ({
          id: index,
          stakeId: stake.stakeId,
          stakedHearts: stake.stakedHearts,
          stakeShares: stake.stakeShares,
          lockedDay: stake.lockedDay,
          stakedDays: stake.stakedDays
        }));

        setStakes(formattedStakes);
      }
      setLoading(false);
    }

    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <Header account={account} networkName={networkName} />
      <Navigation />
      <main>
        {loading ? (
          <p>Loading stake data...</p>
        ) : (
          <StakeList stakes={stakes} />
        )}
      </main>
    </div>
  );
}

export default App;