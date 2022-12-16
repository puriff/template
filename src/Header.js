import styled from 'styled-components';
import happy from './happy.png';
import { Button } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'

const Container = styled.div`
    position: relative;
    background: ${(props) => props.theme.header};
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;

    .happy {
        position: absolute;
        left: 5%;
        height: 80%;
    }

    .button-div {
        position: absolute;
        right: 1%;
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .connect-button {
            width: 70%;
            height: 60%;
            margin-right: 10px;
            border-radius: 15px;
            color: white;
            border: 1px white solid;
            font-size: 16px;

            .button-text {
                position: relative;
                text-decoration: none;

                ::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    bottom: 0;
                    left: 0;
                    background-color: white;
                    transform: scaleX(0);
                    transition: transform 0.2s ease;
                  }
                
                  :hover::before {
                    transform: scaleX(1);
                  }
            }
        }

        .theme-button-light {
            aspect-ratio : 1 / 1;
            height: 60%;
            border-radius: 15px;
            background: transparent;
            color: white;
            font-size: 24px;
            border: 1px solid white;    

            :hover {
                background: white;
                color: black;
                border: 1px solid white;
                animation: none;
            }
        }

        .theme-button-dark {
            aspect-ratio : 1 / 1;
            height: 60%;
            border-radius: 15px;
            background: white;
            color: black;
            font-size: 24px;

            :hover {
                background: transparent;
                color: white;
                border: 1px solid white;
                animation: none;
            }
        }
    }
`;

function Header({theme, setTheme}) {

    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
    const [provider, setProvider] = useState(null);

	const connectWalletHandler = async () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
            let provider = new ethers.providers.Web3Provider(window.ethereum)
			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
        else if(window.ethereum && defaultAccount != null) {
        }
	}

    const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount[0]);
	}

    const networkChangedHandler = async(chainId) => {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
		provider.getNetwork().then(result => {
            console.log(result)
        })  
	}

    window.ethereum.on('accountsChanged', accountChangedHandler)

    window.ethereum.on('chainChanged', networkChangedHandler)

    return (
        <Container>
            <img className='happy' src={happy}></img>
            <div className='button-div'>
                <Button className='connect-button' onClick={connectWalletHandler}><div className='button-text'> {defaultAccount != null ? defaultAccount.substring(0,6) + "..." + defaultAccount.substring(defaultAccount.length -6) : "CONNECT WALLET"} </div></Button>
                    { theme == "dark" ? 
                        <IconButton className='theme-button-dark' onClick={themeToggler}>
                            <LightModeIcon/>
                        </IconButton> :
                        <IconButton className='theme-button-light' onClick={themeToggler}>
                            <DarkModeOutlinedIcon/>
                        </IconButton>
                    }
            </div>

        </Container>
    )
}

export default Header