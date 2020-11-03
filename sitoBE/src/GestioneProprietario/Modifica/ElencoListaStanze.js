import React, { Component } from 'react'

import List from './List'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Montserrat";
    src: url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  }
  * {
    margin: 0;
	  padding: 0;
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
  }
  body {
    background-color: #f5f5f5;
  }
`


class  ElencoListaStanze extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
       
        <List />
       
      </>
    )
  }
}

export default ElencoListaStanze;