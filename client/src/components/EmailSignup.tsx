import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const raise = keyframes`
  from {
	opacity: 0;
	transform: translateY(100%);
  }
  to {
	  opacity: 1;
	transform: translateY(0);
  }
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	height: 4.5rem;
	animation: ${raise} 1s 2.9s ease-out forwards;

	@media (max-width: 768px) {
		width: calc(100vw - 4rem);
	}

	opacity: 0;
	transform: translateY(100%);
`;

const Input = styled.input`
	height: 100%;
	border: solid 2px ${(props: Props) => props.color};
	transition: all 1s;
	background: rgba(255, 255, 255, 0.5);
	width: 18rem;
	font-size: 1.6rem;
	padding: 0 1rem;
	color: var(--text-primary);

	@media (max-width: 768px) {
		width: 100%;
		flex: 1;
	}
`;

const Button = styled.input`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
	background-color: ${(props: Props) => props.color};
	transition: all 1s;
	color: white;
	font-size: 1.8rem;
	text-transform: uppercase;
	cursor: pointer;

	@media (max-width: 768px) {
		padding: 0 1rem;
	}
`;

interface Props {
	color: string;
}

const EmailSignup = ({ color }: Props) => {
	const [email, setEmail] = useState('');

	return (
		<Form
			action="https://waifusion.us6.list-manage.com/subscribe/post?u=e27a013fdf4b77f3f4cd29de4&amp;id=53d3057369"
			method="post"
			id="mc-embedded-subscribe-form"
			name="mc-embedded-subscribe-form"
			target="_blank"
		>
			<Input
				color={color}
				placeholder="Enter email"
				type="email"
				value={email}
				name="EMAIL"
				id="mce-EMAIL"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button color={color} type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
		</Form>
	);
};

export default EmailSignup;
