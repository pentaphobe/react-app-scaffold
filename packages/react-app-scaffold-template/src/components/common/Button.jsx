import React from 'react';
import styled from 'styled-components';

import themes, { utils as theme } from 'theme';

const Button = styled.button`
	background: ${ theme.get('button/background') };
	color: ${ theme.get('button/color') };
	border: ${ theme.get('button/border') };
	border-radius: 8px;
	padding: ${ theme.get('core/padding') };
	margin: ${ theme.get('core/margin') };
	font-size: 1.4em;
	transition: all 0.2s ease-in-out;

	&:hover {		
		background: ${ theme.get('button/hover/background') };
		color: ${ theme.get('button/hover/color') };
	}
`;

export {
	Button
};

export default Button;