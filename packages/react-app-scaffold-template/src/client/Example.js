import React, {
  PureComponent
  } from 'react'; 
import styled, { 
  ThemeProvider,
  injectGlobal
  } from 'styled-components';

import './FontInjection';
import Screen from 'components/Screen';
import Header from 'components/Header';
import Main from 'components/Main';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Input from 'components/form/Input';

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
  </Screen>
);

const Example = styled(ExampleBase)`
  background: ${ props => props.theme.base };
  color: ${ props => props.theme.primary };
`;

export default Example;