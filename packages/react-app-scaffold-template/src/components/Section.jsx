/**
 * Rudimentary component to test module resolution
 */
import React from 'react';
import styled from 'styled-components';

const SectionHeading = styled.h1`
	background: #eee;
	padding: 5px;
`;

const SectionBody = styled.div`
	background: #f0f;
`;

const Section = styled.section`
	background: #eee;
	padding: 5px;
	margin: 5px;
`;

/**
 * Styled-components don't take any responsibility for children
 * would be nice to be able to wrap them with some magic to sort that out for us
 *
 * So far, it's a quagmire trying to steal my inner Atreyu
 */

const container = (El) => (props) => (
	<El {...props}>
		{
			React.Children.toArray(props.children).map( (child, idx) => (
				React.cloneElement(child)
			))
		}
	</El>
);

// const Foo = (props) => (
// 	<h1 {...props}>Nubile</h1>
// );

// const wrapChildren = (Element, (wrapProps) => Wrapper(wrapProps) ) => (props) => (
// 	<Wrapper {...wrapProps}>
// 		<Element {...Element.props} {...props}>
// 			<h1>Blah</h1>
// 			{props.children && props.children.map( (Child, idx) => Child )}
// 		</Element>
// 	</Wrapper>
// );

const SectionWithHeading = container(SectionWithHeading);

const SectionFancy = (props) => (
	<SectionWithHeading>
		<SectionHeading>{props.title}</SectionHeading>
		<SectionBody>
			{props.children}
		</SectionBody>
	</SectionWithHeading>
);

export {Section, SectionFancy};


