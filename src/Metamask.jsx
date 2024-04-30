import React, {useState} from "react";
import {ethers} from 'ethers'

const MetaMask = () => {
    const  [errorMessage, setErrorMessage] = useState(null);
    const  [defaultAccount, setDefaultAccount] = useState(null);
    const  [userBalance, setUserBalance] = useState(null);

    const connectWallet = () => {
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChanged([result[0]])
            })
        } else {
            setErrorMessage('Install MetaMask Please!!!')
        }
    }

    const accountChanged = (accountName) => {
        setDefaultAccount(accountName);
        getUserBalance(accountName)
    }

    const getUserBalance = (accountAddress) => {
        window.ethereum.request({method: 'eth.getBalance', params: [String(accountAddress)]})
        .then(balance => {
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

    return(
        <div>

            <h1>Metamask Wallet Connection</h1>

            <button onClick={connectWallet}>Connect Wallet</button>
            <h3>Address: {defaultAccount}</h3>
            <h3>Balance: $ {userBalance}</h3>

            {errorMessage}
        </div>
    )
}

export default MetaMask;