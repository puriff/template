import { Box, Button, InputBase, InputLabel, TextField } from "@mui/material";
import styled from "styled-components";
import { ethers } from 'ethers'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background:  ${(props) => props.theme.background};
  display: flex;
  justify-content: center;

  .button {
        height: 50%;
        width: 50%;
        position: relative;
        top: 10%;
  }

  .main-div {
      height: 70%;
      width: 70%;
      position: relative;
      top: 5%;
      display: flex;
      justify-content: center;
      align-items: center;

      .content-box {
        height: 100%;
        width: 100%;
        position: relative;
        display: block;
        margin: 0 auto;
        background: ${(props) => props.theme.content_div}; 
        border-radius: 15px;   
        
      .search-div {
          width: 60%;
          margin: auto; 
          display: flex;
          position: relative;
          margin-top: 2%;
          margin-bottom: 1%;

          .search-bar {
            height: fit-content;
            width: 90%;
            margin: auto;  
          }

          .MuiInputBase-root {
            color: ${(props) => props.theme.search_cursor};
            
            :after {
                border-color: white;
            }
        }
        }
        
        .cards-div {
            height: 80%;
            width: 95%;
            margin: auto;
            margin-bottom: 1%;
            display: flex;
            justify-content: center;
            align-items: center;

            .column {
              margin-left: 1%;
              margin-right: 1%;
              width: 33.33%;
              height: 95%;
              border-radius: 15px;
              background: ${(props) => props.theme.column_background};  
              display: flex;
              justify-content: center;
              align-items: center;

              .chain-div {
                position: relative;
                width: 80%;
                height: 80%;
                text-align: center;
                
                .chain-logo {
                  position: relative;
                  width: 50%;
                  margin-top: 5%;
                  outline: 2px solid ${(props) => props.theme.usdc_blue};
                  border-radius: 50%;

                  :hover {
                    box-shadow: 0px 0px 15px 1px ${(props) => props.theme.usdc_blue};
                  }
                }

                .chain-name {
                  color: white;
                  position: relative;
                  height: fit-content;
                  width: fit-content;
                  font-size: 24px;
                  margin: auto;
                  margin-top: 5%;
                  font-weight: bold;
                }

                .chain-balance {
                  position: absolute;
                  bottom: 0;
                  height: 20%;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  outline: 2px solid ${(props) => props.theme.usdc_blue};
                  border-radius: 50px;
                  background: ${(props) => props.theme.balance_background};
                  margin-bottom: 5%;
                  
                  :hover {
                    box-shadow: 0px 0px 15px 1px ${(props) => props.theme.usdc_blue};
                  }

                  .usdc-logo {
                    position: relative;
                    height: 100%;
                  }

                  .balance {
                    text-align: right;
                    position: relative;
                    font-size: 28px;
                    color: ${(props) => props.theme.balance}; 
                    cursor: default;          
                    width: 100%;
                    margin-right: 10%;               
                  }
                }
              } 
            }
        }
      }    
  }
`;

const abi = [
    "function balanceOf(address account) external view returns (uint256)",
    "function name() external view returns (string memory)"
]

function Main() {

    let USDCLogo = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"

    const providerRPC = [
        {
          name: 'Arbitrum',
          rpc: 'https://arb1.arbitrum.io/rpc', // Insert your RPC URL here
          chainId: 42161, // 0x504 in hex,
          usdc: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
          logo: 'https://www.xdefi.io/wp-content/uploads/2022/05/logo-9.png',
        },
        {
            name: 'Avalanche',
            rpc: 'https://api.avax.network/ext/bc/C/rpc', // Insert your RPC URL here
            chainId: 43114, // 0x504 in hex,
            usdc: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            logo: 'https://glacier-api.avax.network/proxy/chain-assets/cb14a1f/chains/43114/chain-logo.png',
          },
        {
            name: 'Ethereum',
            rpc: "https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79", // Insert your RPC URL here
            chainId: 1, // 0x504 in hex,
            usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            logo: 'https://glacier-api.avax.network/proxy/chain-assets/de66c50/non-subnet-chains/1/chain-logo.png',
        }   
    ];

      const providerArbitrum = new ethers.providers.StaticJsonRpcProvider(
        providerRPC[0].rpc, 
        {
          chainId: providerRPC[0].chainId,
          name: providerRPC[0].name,
        }
      );
      const providerAvalanche = new ethers.providers.StaticJsonRpcProvider(
        providerRPC[1].rpc, 
        {
          chainId: providerRPC[1].chainId,
          name: providerRPC[1].name,
        }
      );
      const providerEthereum = new ethers.providers.StaticJsonRpcProvider(
        providerRPC[2].rpc, 
        {
          chainId: providerRPC[2].chainId,
          name: providerRPC[2].name,
        }
      );

      const providers = [providerArbitrum, providerAvalanche, providerEthereum]

      const [address, setAddress] = useState('');
      const [balances, setBalances] = useState([]);

    async function getCrosschainBalances() {
        let balancesTMP = []
        for (let index = 0; index < providerRPC.length; index++) {
            const contract = new ethers.Contract(providerRPC[index].usdc, abi, providers[index]);
            const balance = await contract.balanceOf(address);
            balancesTMP.push((Number(balance)/Math.pow(10,6)).toFixed(2))
        }
        setBalances(balancesTMP)
    }


    return (
        <Container>
            <div className="main-div">
                <div className="content-box">
                  <div className="search-div">
                      <TextField className="search-bar" variant="outlined" label="Enter address"
                                  color="primary"
                                  focused
                                  value= {address}
                                  onChange= {(e) => setAddress(e.target.value)}
                                  InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton color="primary"
                                            onClick={() => getCrosschainBalances()}
                                          >
                                              <SearchIcon />
                                          </IconButton>
                                        </InputAdornment>
                                    )
                                  }}
                      ></TextField>
                  </div>
                  <div className="cards-div">
                    {providerRPC.map((item,index) => {
                                  return <div className="column">
                                      <div className="chain-div">
                                        <img className="chain-logo" src={item.logo}></img>
                                        <div className="chain-name">{item.name.toUpperCase()}</div>
                                        <Box className="chain-balance">
                                            <img className="usdc-logo" src={USDCLogo}></img>
                                            <div className="balance">{balances[index] != null ? balances[index] : 0}</div>
                                        </Box>
                                      </div>
                                    </div>;
                        })}
                  </div>
                </div>
            </div>
        </Container>
    )
}

export default Main