import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ChatProvider } from './context/ChatProvider';
import Wrapper from './components/Wrapper';

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color-dark-palette: #f2f2f2;
    --secondry-color-dark-palette: #373737;
    --blue-button-color: #64309c ;
    --blue-active-color: #3f1f5f;
    --blue-gradient: #64309c;
  }

  * {
    margin: 0;
    padding: 0;
    outline: transparent;
    text-decoration: none;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: var(--blue-gradient);
  }
`;

const Background = styled.div`
position: absolute;
height: 100vh;
width: 100vw;
overflow: hidden;
z-index: -1;

&::before, &::after {
    content: '';
    position: absolute;
    inset: -170px auto auto -200px;
    width: clamp(30vw, 600px, 42vw);
    height: clamp(30vw, 600px, 42vw);
    border-radius: 50%;
    background: #3f1f5f;
    z-index: -1;
  }

  &::after {
    inset: auto -170px -200px auto;
  }

  @media (max-width: 820px) {
    &::before, &::after {
      width: 25rem;
      height: 25rem;
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      
      <Background />

      <ChatProvider>  
        <Wrapper />
      </ChatProvider>
    </>
  );
}

export default App;
