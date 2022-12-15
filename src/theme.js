import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    background: 'white',
    header: '#161615',
};

export const darkTheme = {
    background: '#161615',
    header: 'rgb(55,55,55)',
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;