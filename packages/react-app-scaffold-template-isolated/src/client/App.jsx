import React, {
  PureComponent
} from 'react'; 
import styled, { 
  ThemeProvider,
} from 'styled-components';

import Example from './Example';
import themes, { utils as theme } from '../theme';


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