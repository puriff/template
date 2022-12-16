import { ethers } from 'ethers'
import { useState } from 'react';

const provider = new ethers.providers.Web3Provider(window.ethereum)

async function Wallet() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectwalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            })
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    }

    const accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance()
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address)
    }
    const getuserBalance = async (address) => {
        const balance = await provider.getBalance(address, "latest")
    }
}

export default Wallet
