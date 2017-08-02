import React, {
	PureComponent
	} from 'react';
import styled, { 
	ThemeProvider 
	} from 'styled-components';

import Button from 'components/Button';

const themes = {
	default: {
		base: '#e8e8e8',
		primary: '#222',
		secondary: '#888'
	},
	alternative: {
		base: '#222',
		primary: '#eee',
		secondary: '#888'
	}
};


const Heading = styled.h1`
	background: transparent;
	color: ${ props => props.theme.base };
	padding: 8px;
	margin: 0;
`;

const Header = styled.header`
	background: ${ props => props.theme.base };
	color: ${ props => props.theme.primary };
	min-height: 64px;
	padding: 8px;
	margin: 0;
`;

const Main = styled.main`
	background: transparent;
	min-height: 100%;
	padding: 8px;
`;

const Screen = styled.div`
	background: ${ props => props.theme.primary };
	position: absolute;
	width: 100%;
	min-height: 100%;
`;

const ExampleBase = (props) => (
	<Screen>
		<Header>Header
		</Header>
		<Main>
			<Heading>Theme is {props.themeName}</Heading>
				{
					props.state.themeNames.map( (themeName, idx) => (<Button key={idx} onClick={() => props.onThemeChange(themeName)}>{themeName}</Button>) )
				}
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
		console.log(themeName, this);
		let themeIndex = this.state.themeNames.indexOf(themeName);

		let newState = Object.assign({}, this.state, {
			theme: themeIndex === -1 ? 0 : themeIndex
		});
		this.setState(newState);
	}

	componentDidMount() {
		// this.timerHandle = setInterval(() => {
		// 	let newState = Object.assign({}, this.state, {				
		// 		timer: this.state.timer + 1
		// 	});
		// 	// newState.__proto__ = this.state;
		// 	this.setState(newState);
		// }, 500);		
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}

	render() {
		let themeName = this.state.themeNames[this.state.theme];
		let themeObj = themes[themeName];
		console.log(themeObj);
		return (
			<ThemeProvider theme={themeObj}>				
				<Example state={this.state} onThemeChange={(themeName) => this.changeTheme(themeName)} themeName={themeName} /> 
			</ThemeProvider>
		);
	}
}