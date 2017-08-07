import React, {
	PureComponent
	} from 'react';
import styled, { 
	ThemeProvider 
	} from 'styled-components';

import Screen from 'components/Screen';
import Header from 'components/Header';
import Main from 'components/Main';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Input from 'components/form/Input';

import themes, { utils as theme } from '../theme';

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


export default class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			timer: 0,
			theme: 0,
			themeNames: ['default', 'alternative']
		};		
	}

	changeTheme(themeName) {
		let themeIndex = this.state.themeNames.indexOf(themeName);

		let newState = Object.assign({}, this.state, {
			theme: themeIndex === -1 ? 0 : themeIndex
		});
		this.setState(newState);
	}

	componentDidMount() {
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}

	render() {
		let themeName = this.state.themeNames[this.state.theme];
		let themeObj = themes[themeName];

		return (
			<ThemeProvider theme={themeObj}>				
				<Example state={this.state} onThemeChange={(themeName) => this.changeTheme(themeName)} themeName={themeName} /> 
			</ThemeProvider>
		);
	}
}