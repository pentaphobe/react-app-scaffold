import React from 'react';
import styled  from 'styled-components';
import { branch, renderComponent } from 'recompose';
import PropTypes from 'prop-types';

import themes, { utils as theme } from '../../theme';
import { Section } from 'components/Section';

const InputWrapper = (props) => (<Section {...props} />);

const InputStyled = styled.input`
	background: ${ theme.get('primary') };
	color: ${ theme.get('base') };
	border: 2px solid ${ theme.get('base') };	
`;

const LabelStyled = styled.label`
	background: ${ theme.get('primary') };
	color: ${ theme.get('base') };
	border: 2px solid ${ theme.get('base') };	
`;

const InputWithLabelAttribute = (props) => (
	<InputWrapper>
		<LabelStyled htmlFor={props.id} >
			{props.label}
		</LabelStyled>
		<InputStyled id={props.id} />		
	</InputWrapper>
);

InputWithLabelAttribute.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string
};

const InputWithLabelChild = (props) => (
	<InputWrapper>
		<LabelStyled htmlFor={props.id} >
			{React.Children.toArray(props.children).map( n => 
				n.type && n.type.target === 'label'
				? React.cloneElement(n, {htmlFor:props.id})
				: n
			)}			
		</LabelStyled>
		<InputStyled id={props.id} />		
	</InputWrapper>	
);

InputWithLabelChild.propTypes = {
	id: PropTypes.string,
	children: PropTypes.array
};

const Input = branch(
	(props) => !!props.children,
	renderComponent(InputWithLabelChild),
	t => t
)(InputWithLabelAttribute);



export default Input;