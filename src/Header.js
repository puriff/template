import styled from 'styled-components';
import happy from './happy.png';
import { Button, Drawer, Box, Divider, ListItemButton, ListItemText, ListItemIcon  } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.header};

    .burger-menu {
        display: none;
    }

    .happy {
        position: absolute;
        left: 2%;
        margin-right: 5%;
        height: 80%;
    }

    .button-div {
        position: absolute;
        right: 1%;
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: right;
        align-items: center;

        .links-button {
            width: fit-content;
            height: fit-content;
            margin-right: 10px;
            border-radius: 15px;
            color: white;
            font-size: 14px;
            
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

        .connect-button {
            width: fit-content;
            height: 60%;
            margin-right: 10px;
            margin-left: 10px;
            padding-left: 15px;
            padding-right: 15px;
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

    @media only screen and (max-width: 768px) {
        .happy {
            height: 70%;
        }
        .button-div {
            display: none;
        }
        .burger-menu {
            height: 100%;
            width: fit-content;
            position: absolute;
            right: 1%;
            display: flex;
            justify-content: right;
            align-items: center;
            color: white;
        }
    }

    @media only screen and (max-width: 320px) {
        .happy {
            height: 50%;
        }
    }
`;

const DrawerStyled = styled.div`
    width: 100%;
    height: 100%;
    background: #161615;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    .close-button {
        margin-top: 5%;
        color: white;
    }
    
    .button-connect-drawer {
        height: 10%;
        width: 70%;
        margin-top: 5%;
        margin-bottom: 5%;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 15px;
        color: white;
        border: 1px white solid;
        font-size: 16px;
        font-weight: bold;

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

    .links-button-drawer {
            width: 100%;
            height: fit-content;
            color: white;
            font-size: 16px;
            display: flex;
            margin: auto;
            margin-top: 50%;
            
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

    .theme-button-dark-drawer {
        aspect-ratio : 1 / 1;
        width: 15%;
        border-radius: 15px;
        background: transparent;
        color: white;
        font-size: 24px;
        border: 1px solid white;
        margin-top: 25%;

        :hover {
            background: white;
            color: black;
            border: 1px solid white;
            animation: none;
        }
    }

    .theme-button-light-drawer {
        aspect-ratio : 1 / 1;
        width: 15%;
        border-radius: 15px;
        background: transparent;
        color: white;
        font-size: 24px;
        border: 1px solid white;  
        margin-top: 25%;

        :hover {
            background: white;
            color: black;
            border: 1px solid white;
            animation: none;
        }
    }

    @media only screen and (max-width: 320px) {
        .theme-button-light-drawer {
            width: 20%;
            margin-top: 75%;
        }
        .theme-button-dark-drawer {
            width: 20%;
            margin-top: 75%;
        }
    }
`;

function Header({theme, setTheme}) {

    let links = [
        {   label: "Twitter",
            link: "https://twitter.com/home"},
        {   label: "Chart",
            link: "https://www.tradingview.com/chart/?symbol=BINANCE%3ABTCUSDT"},
        {   label: "Uniswap",
            link: "https://app.uniswap.org/#/swap"},
    ]

    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);

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

    function openLink(link) {
        window.open(link, "_blank")
    }
    
    const [open, setState] = useState(false);

    //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
    const toggleDrawer = (open) => () => {
        setState(open);
    };

    window.ethereum.on('accountsChanged', accountChangedHandler)
    window.ethereum.on('chainChanged', networkChangedHandler)

    return (
        <Container>
            <img className='happy' src={happy}></img>
            <div className='button-div'>
                {links.map((item, index) => {
                    return <Button className='links-button' onClick={() => openLink(item.link)}> <div className='button-text'>{item.label}</div> </Button>
                })}
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
            <div className='burger-menu'>
                <IconButton 
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    >   
                    <MenuIcon sx={{fontSize:"32px"}}/>
                </IconButton>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}    
                PaperProps={{

                    sx: {
                      width: '75%'
                    }
                  }}            
                >

                <DrawerStyled>
                    <IconButton className='close-button'>
                        <CloseIcon onClick={toggleDrawer(false)} sx={{fontSize:"32px"}}/>
                    </IconButton>
                    <Button className='button-connect-drawer' onClick={connectWalletHandler}><div className='button-text'> {defaultAccount != null ? defaultAccount.substring(0,6) + "..." + defaultAccount.substring(defaultAccount.length -6) : "CONNECT WALLET"} </div></Button>
                    
                    <Divider variant='middle' flexItem sx={{background:"white"}}/>

                    <Box className='box'>
                        {/*<ListItemButton>
                        <ListItemIcon>
                            <ImageIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Pictures" />
                        </ListItemButton>

                        <ListItemButton>
                        <ListItemIcon>
                            <DescriptionIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Documents" />
                        </ListItemButton>

                        <ListItemButton>
                        <ListItemIcon>
                            <FolderIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Other" />
                        </ListItemButton>*/}
                        {links.map((item, index) => {
                            return <Button className='links-button-drawer' onClick={() => openLink(item.link)}> <div className='button-text'>{item.label}</div> </Button>
                        })}
                    </Box>
                    { theme == "dark" ? 
                        <IconButton className='theme-button-dark-drawer' onClick={themeToggler}>
                            <LightModeIcon/>
                        </IconButton> :
                        <IconButton className='theme-button-light-drawer' onClick={themeToggler}>
                            <DarkModeOutlinedIcon/>
                        </IconButton>
                    }

                </DrawerStyled>
            </Drawer>
            </div>

        </Container>
    )
}

export default Header