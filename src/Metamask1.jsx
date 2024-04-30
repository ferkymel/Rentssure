import React, {useState} from "react";
import {ethers} from 'ethers'
import {userState} from "react";
import RentAssure from "./contract/RentAssure.json";

const addressContract = "0x30Ec832d35966b4030DEcdFD6df89BCefc59c2AB";

const MetaMask = () => {
    const  [errorMessage, setErrorMessage] = useState(null);
    const  [defaultAccount, setDefaultAccount] = useState(null);
    const  [userBalance, setUserBalance] = useState(null);
    const  [words, setWords] = useState(null);
    const  [inputValue, setInputValue] = useState(null);

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

    async function fetchWords(){
        if(typeof window.ethereum !=='undefined'){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                addressContract,
                RentAssure.abi,
                provider
            );
            try {
                const data = await contract.getOwner();
                setWords(data);
            } catch (err) {
                console.log("Error:",err);
            }
        }
    }

    async function buyTokens(){
        if(typeof window.ethereum !=='undefined'){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                addressContract,
                RentAssure.abi,
                signer
            );
            try {
                const data = await contract.receiveInv("0x78fCb0846305602d9a02B9aEe0829EF2F028B396");
                console.log(data);
            } catch (err) {
                console.log("Error:",err);
            }
        }
    }
    

    return(
        <div>

            <h1>Metamask Wallet Connection</h1>

            <button onClick={connectWallet}>Connect Wallet</button>
            <h3>Address: {defaultAccount}</h3>
            <h3>Balance: $ {userBalance}</h3>
            <button onClick={fetchWords}>Prueba contrato</button>
            <h3>Owner: $ {words}</h3>
            <button onClick={buyTokens}>obtener</button>
            {errorMessage}
        </div>
    )
}

export default MetaMask;