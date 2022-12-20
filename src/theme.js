import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    background: '#F9F9F9',
    header: '#161615',
    content_div: 'white',
};

export const darkTheme = {
    background: '#161615',
    header: 'rgb(55,55,55)',
    content_div: '#1C1C1B',
    dark_grey: '#282829',
    light_grey: 'rgb(55,55,55)'
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;