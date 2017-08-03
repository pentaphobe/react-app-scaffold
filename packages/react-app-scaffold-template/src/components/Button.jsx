import React from 'react';
import styled from 'styled-components';

import themes, { utils as theme } from '../theme';

const Button = styled.button`
	background: ${ theme.get('primary') };
	color: ${ theme.get('base') };
	border: 2px solid ${ theme.get('base') };
	border-radius: 8px;
	padding: 8px;
	margin: 4px;
	font-size: 1.4em;
	transition: all 0.2s ease-in-out;

	&:hover {		
		background: ${ theme.darken('secondary', 0.1) };
		color: ${ theme.lighten('base', 0.8) };
		border: 2px solid ${ theme.darken('base', 0.1) };
	}
`;

export {
	Button
};

export default Button;