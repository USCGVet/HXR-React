import Web3 from 'web3';

let web3;

const getNetworkName = (networkId) => {
  switch (networkId) {
    case '1': return 'Mainnet';
    case '3': return 'Ropsten';
    case '4': return 'Rinkeby';
    case '5': return 'Goerli';
    case '42': return 'Kovan';
    case '369': return 'PulseChain Mainnet';
    case '943': return 'PulseChain Testnet v4';
    default: return 'Unknown';
  }
};

const initWeb3 = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // We are in the browser and metamask is running
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      
      // Get network ID and name
      const networkId = await web3.eth.net.getId();
      const networkName = getNetworkName(networkId.toString());
      
      console.log('Connected to ' + networkName);
      
      return { web3, networkName };
    } catch (error) {
      console.error("User denied account access")
    }
  } else {
    console.log('MetaMask is not installed');
    return { web3: null, networkName: 'Not Connected' };
  }
};

export { initWeb3 };
export default web3;