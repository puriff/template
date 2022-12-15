import styled from 'styled-components';
import happy from './happy.png';
import { Button } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import { useState } from 'react';


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
    
    return (
        <Container>
            <img className='happy' src={happy}></img>
            <div className='button-div'>
                <Button className='connect-button'><div className='button-text'> CONNECT WALLET </div></Button>
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