import theme from './i.js';
import Header from './Header.js';
import Main from './Main.js';
import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.background};
  overflow: auto;
`;

function App() {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    console.log(theme)
  },[theme])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <Header theme={theme} setTheme={setTheme}/>
        <Main/>
      </Container>
    </ThemeProvider>
  );
  
}

export default App;
