import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const ConnectWalletButton = () => {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [installed, setInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setInstalled(true);

      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
      }

      const handleChainChanged = (chainId) => {
        setNetwork(getNetworkName(chainId));
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      if (window.ethereum.selectedAddress) {
        setAccount(window.ethereum.selectedAddress);

        const networkId = window.ethereum.networkVersion;
        setNetwork(getNetworkName(networkId));
      } else {
        setAccount('');
        setNetwork('');
      }
    } else {
      setInstalled(false);
    }

    if (window.innerWidth < 768 && navigator.userAgent.includes('Mobile')) {
      setIsMobile(true);
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      setNetwork(getNetworkName(networkId));
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = async () => {
    try {
      await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
      setAccount('');
      setNetwork('');
    } catch (error) {
      console.error(error);
    }
  }

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case '1':
        return 'Mainnet';
      case '3':
        return 'Ropsten';
      case '4':
        return 'Rinkeby';
      case '5':
        return 'Goerli';
      case '42':
        return 'Kovan';
      default:
        return '';
    }
  }

  const openInMetamask = () => {
    const url = window.location.href;
    const mobileUrl =`metamask://open?url=${url}`;
    window.location.href = mobileUrl;
  }

  return (
    <div>
      {installed ? (
        account === '' ? (
            <div className='bg-orange-600  absolute top-4 right-24 rounded-full p-2 gap-1'>
            {/* <p className='text-black'>{account}</p> 
             <p >{network}</p> */}
             <div className='bg-orange-600 w-30 h-10 rounded-full flex'>
                <img src="https://logowik.com/content/uploads/images/metamask-fox6185.jpg" alt='Metamask' className='rounded-full'></img>
                <button onClick={isMobile ? openInMetamask : handleConnectWallet}>Logout</button> 
            </div>
          </div>
          
        ) : (
          <div className='bg-orange-600  absolute top-4 right-24 rounded-full p-2 gap-1'>
            {/* <p className='text-black'>{account}</p> 
             <p >{network}</p> */}
             <div className='bg-orange-600 w-30 h-10 rounded-full flex'>
                <img src="https://logowik.com/content/uploads/images/metamask-fox6185.jpg" alt='Metamask' className='rounded-full'></img>
            <    button onClick={handleLogout}>Connect Wallet</button>
            </div>
          </div>
        )
      ) : (
        <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">
          Install Metamask
        </a>
      )}
    </div>
  );
}

export default ConnectWalletButton;