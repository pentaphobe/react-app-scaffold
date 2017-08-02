import React from 'react';
import { styled } from 'styled-components';
import { branch, renderComponent } from 'recompose';
import { Section } from 'components/containers/Section';

const InputWrapper = (props) => (<Section {...props} />);

const InputWithLabelAttribute = (props) => (
	<InputWrapper>
		<label htmlFor={props.id} >
			{props.label}
		</label>
		<input id={props.id} />		
	</InputWrapper>
);

const InputWithLabelChild = (props) => (
	<InputWrapper>
		<label htmlFor={props.id} >
			{React.Children.toArray(props.children).map( n => 
				n.type && n.type.target === 'label'
				? React.cloneElement(n, {htmlFor:props.id})
				: n
			)}			
		</label>
		<input id={props.id} />		
	</InputWrapper>	
);

const Input = branch(
	(props) => !!props.children,
	renderComponent(InputWithLabelChild),
	t => t
)(InputWithLabelAttribute);

export default Input;