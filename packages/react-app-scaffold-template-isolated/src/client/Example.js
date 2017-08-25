import React, {
  PureComponent
  } from 'react'; 
import styled, { 
  ThemeProvider,
  injectGlobal
  } from 'styled-components';

import './FontInjection';
import Screen from 'components/Screen';
import Main from 'components/Main';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Heading from 'components/common/Heading';
import Button from 'components/common/Button';
import Input from 'components/common/form/Input';

const ExampleBase = (props) => (
  <Screen>
    <Header>
    </Header>
    <Main>
      <Heading>Theme is {props.themeName}</Heading>
      {
        props.state.themeNames.map( (themeName, idx) => (
          <Button 
            key={idx} 
            onClick={() => props.onThemeChange(themeName)}>
              {themeName}
          </Button>
        ))
      }
      <Input id="testInput" label="Test label" />
    </Main>
    <Footer>
    </Footer>
  </Screen>
);

const Example = styled(ExampleBase)`
  background: ${ props => props.theme.base };
  color: ${ props => props.theme.primary };
`;

export default Example;