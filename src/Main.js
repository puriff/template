import { Button } from "@mui/material";
import styled from "styled-components";
import { ethers } from 'ethers'

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
`;

const abi = [
    "function balanceOf(address account) external view returns (uint256)",
    "function name() external view returns (string memory)"
]

function Main() {

    const providerRPC = [
        {
          name: 'arbi',
          rpc: 'https://arb1.arbitrum.io/rpc', // Insert your RPC URL here
          chainId: 42161, // 0x504 in hex,
          usdc: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
        },
        {
            name: 'avalanche',
            rpc: 'https://api.avax.network/ext/bc/C/rpc', // Insert your RPC URL here
            chainId: 43114, // 0x504 in hex,
            usdc: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
          },
        {
            name: 'ethereum',
            rpc: "https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79", // Insert your RPC URL here
            chainId: 1, // 0x504 in hex,
            usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
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

    async function whenClickButton() {
        for (let index = 0; index < providerRPC.length; index++) {
            const contract = new ethers.Contract(providerRPC[index].usdc, abi, providers[index]);
            const contractName = await contract.balanceOf(process.env.REACT_APP_WALLET);
            console.log(contractName.toString()/Math.pow(10,6));
        }
    }

    return (
        <Container>
            <Button className="button" variant="contained" onClick={() => whenClickButton()}>CLICK HERE</Button>
        </Container>
    )
}

export default Main