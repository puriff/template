import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    background: '#d2d3db',
    header: '#484b6a',
    content_div: '#e4e5f1',
    column_background: '#9394a5',
    balance_background: '#e4e5f1',
    usdc_blue: '#2775CA',
    balance: '#484b6a',
    search_cursor: 'black'
};

export const darkTheme = {
    background: '#161615',
    header: 'transparent',
    content_div: '#1C1C1B',
    column_background: '#282829',
    balance_background: '#1C1C1B',
    usdc_blue: '#2775CA',
    balance: '#F9F9F9',
    search_cursor: 'white'
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;