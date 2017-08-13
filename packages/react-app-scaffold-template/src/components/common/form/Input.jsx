import React from 'react';
import styled  from 'styled-components';
import { branch, renderComponent } from 'recompose';

import themes, { utils as theme } from 'theme';
import { Section } from 'components/common/Section';
import {
  InputWithLabelChildProps,
  InputWithLabelAttributeProps
} from './Input.propTypes';

const InputWrapper = (props) => (<Section {...props} />);

const InputField = styled.input`
	background: ${ theme.get('input/background') };
	color: ${ theme.get('input/color') };
	border: ${ theme.get('input/border') };	
	border-radius: 3px;
	font-size: 24px;
	min-width: 238px;
	padding: ${ theme.get('core/padding') };
	margin: ${ theme.get('core/margin') };
	height: 38px;
`;

const Label = styled.label`
	background: ${ theme.get('label/background') };
	color: ${ theme.get('label/color') };
	font-size: 24px;
	padding: ${ theme.get('core/padding') };
	margin: ${ theme.get('core/margin') };	
	height: 38px;
	display: block;
`;

const InputWithLabelAttribute = (props) => (
	<InputWrapper>
		<Label htmlFor={props.id} >
			{props.label}
		</Label>
		<InputField id={props.id} />		
	</InputWrapper>
);

InputWithLabelAttribute.propTypes = InputWithLabelAttributeProps;

const InputWithLabelChild = (props) => (
	<InputWrapper>
		<Label htmlFor={props.id} >
			{React.Children.toArray(props.children).map( n => 
				n.type && n.type.target === 'label'
				? React.cloneElement(n, {htmlFor:props.id})
				: n
			)}			
		</Label>
		<InputField id={props.id} />		
	</InputWrapper>	
);

InputWithLabelChild.propTypes = InputWithLabelChildProps;

const Input = branch(
	(props) => !!props.children,
	renderComponent(InputWithLabelChild),
	t => t
)(InputWithLabelAttribute);



export default Input;