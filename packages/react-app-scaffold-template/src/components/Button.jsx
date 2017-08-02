import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	background: ${ props => props.theme.primary };
	color: ${ props => props.theme.base };
	border: 2px solid ${ props => props.theme.base };
	border-radius: 8px;
	padding: 8px;
	margin: 4px;
	font-size: 1.4em;
	transition: all 0.2s ease-in-out;

	&:hover {
		background: ${ props => props.theme.secondary };
		color: ${ props => props.theme.primary };
		border: 2px solid ${ props => props.theme.base };
	}
`;

export {
	Button
};

export default Button;