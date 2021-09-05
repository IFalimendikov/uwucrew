import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import Image from 'next/image';

import uwu from '../assets/girls/buy.jpg';
import Header from '../components/Header';
import OwnedTickets from 'components/OwnedTickets';
import ForceConnect from 'components/ForceConnect';
import { SECONDS_PER_BLOCK, waveLimits } from 'core/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	reload,
	selectBuyPriceNumber,
	selectIsLocked,
	selectRemaining,
	selectStartTime,
	selectWaveBlockLength,
	setIsLocked
} from 'state/reducers/uwu';
import Countdown from 'components/Countdown';
import BuyInput from 'components/BuyInput';
import Footer from 'components/Footer';
import { useRouter } from 'next/dist/client/router';

const StyledBuy = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--bg-04);
	background-image: radial-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75));
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const Container = styled.div`
	position: relative;
	width: 100vw;
	display: flex;
	flex-direction: column;
	padding: 6rem;

	@media (max-width: 768px) {
		padding: 2rem;
		margin-top: 5rem;
		margin-bottom: 5rem;
	}
`;

const HeaderText = styled.div`
	font-weight: 700;
	color: var(--bg-04);

	font-size: 10rem;
	@media (max-width: 768px) {
		font-size: 4.5rem;
		white-space: nowrap;
		margin-bottom: 2rem;
	}
`;

const Content = styled.div`
	width: 100%;
	min-height: 70vh;
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	@media (max-width: 768px) {
		flex-direction: column-reverse;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 768px) {
		width: 100%;
		margin-top: 3rem;
	}
`;

const BodyHeader = styled.h1`
	letter-spacing: 0.17rem;
	color: var(--text-primary);

	font-size: 8rem;
	line-height: 10rem;
	margin-bottom: 2rem;
	@media (max-width: 768px) {
		font-size: 5rem;
		line-height: 5rem;
		margin-bottom: 1rem;
		white-space: nowrap;
	}
`;

const Label = styled.div`
	font-weight: 500;
	color: var(--text-primary);
	line-height: 2.3rem;
	margin-bottom: 2rem;
	max-width: 60rem;

	font-size: 2rem;
	@media (max-width: 768px) {
		font-size: 1.7rem;
		max-width: 100%;
	}
`;

// const Link = styled.a`
// 	font-weight: 500;
// 	color: var(--text-primary);
// 	line-height: 2.3rem;
// 	margin-bottom: 2rem;
// 	max-width: 60rem;
// 	text-decoration: underline;
// 	margin-left: 0.2rem;

// 	font-size: 2rem;
// 	@media (max-width: 768px) {
// 		font-size: 1.7rem;
// 		max-width: 100%;
// 	}
// `;

const Uwu = styled.div`
	width: 30vw;

	@media (max-width: 768px) {
		width: 100%;
		margin-top: 3rem;
	}
`;

const Button = styled.button`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--bg-04);
	transition: all 1s;
	color: white;
	font-size: 2.2rem;
	font-weight: 500;
	text-transform: uppercase;
	cursor: pointer;
	padding: 0 5rem;
	height: 5rem;
	margin-top: 1.5rem;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const BuyPage: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const buyPrice = useSelector(selectBuyPriceNumber);
	const remaining = useSelector(selectRemaining);
	const isLocked = useSelector(selectIsLocked);
	const startTimeEpocs = useSelector(selectStartTime);
	const waveBlockLength = useSelector(selectWaveBlockLength);

	const [update, setUpdate] = useState(0);

	useEffect(() => {
		setInterval(() => setUpdate(Math.random() + update), 1000);
	}, []);

	const startDate = () => {
		const startTime = new Date(0);
		startTime.setUTCSeconds(startTimeEpocs);
		return startTime;
	};

	const live = new Date() >= startDate();

	const wave = (): number => {
		const startTime = new Date(0);
		startTime.setUTCSeconds(startTimeEpocs);
		const now = new Date();
		if (now.getTime() < startTime.getTime()) return 1;
		const secondsPast = (now.getTime() - startTime.getTime()) / 1000;
		const blocksPast = secondsPast / SECONDS_PER_BLOCK;
		const wavesPast = Math.floor(blocksPast / waveBlockLength);
		return 1 + wavesPast;
	};

	const nextWave = (): Date => {
		const startTime = new Date(0);
		startTime.setUTCSeconds(startTimeEpocs);
		const secondsToAdd = wave() * waveBlockLength * SECONDS_PER_BLOCK;
		startTime.setSeconds(startTime.getSeconds() + secondsToAdd);
		return startTime;
	};

	useEffect(() => {
		console.log('Triggerd locked handling');
		dispatch(setIsLocked(false));
		dispatch(reload());
	}, [wave()]);

	return (
		<StyledBuy>
			<ForceConnect color="var(--bg-04)" />
			<GlobalStyles />
			<Header />

			<Container>
				<HeaderContainer>
					<HeaderText>Buy uwu-tickets</HeaderText>
					<OwnedTickets color="var(--bg-04)" />
				</HeaderContainer>
				<Content>
					<Uwu>
						<Image src={uwu} />
					</Uwu>
					<Body>
						<BodyHeader>{remaining === 0 ? 'Sold Out!' : live ? 'Sale Live!!' : 'Starting Soon!'}</BodyHeader>
						{remaining > 0 && (
							<Label>
								{`uwu-tickets are redeemable for uwucrew NFTs! There are ${remaining} remaining for sale and they cost ${buyPrice} ETH to buy. ${
									live
										? `The current wave is ${wave()} and you can get ${Math.min(
												isLocked ? 0 : waveLimits[wave() - 1] || 32,
												remaining
										  )} more tickets this wave.`
										: ''
								}`}
								{/* <Link href="https://etherscan.io/address/0x5E75Bc35955F9E196e5bb25ddDE09424B476a18D" target="_blank" rel="noreferrer">
									View Ticket Contract
								</Link> */}
							</Label>
						)}
						{remaining === 0 && (
							<Label>{'All uwu-tickets have sold out! If you have any tickets, head to the mint page to redeem your uwus.'}</Label>
						)}
						{remaining > 0 && !live && <Countdown date={startDate()} />}
						{remaining > 0 && live && (
							<>
								<Label>Next wave starts in:</Label>
								<Countdown date={nextWave()} />
							</>
						)}

						{remaining > 0 && live && !isLocked && <BuyInput max={Math.min(waveLimits[wave() - 1] || 32, remaining)} />}
						{remaining === 0 && <Button onClick={() => void router.replace('/mint')}>Mint uwus</Button>}
					</Body>
				</Content>
			</Container>
			<Footer />
		</StyledBuy>
	);
};

export default BuyPage;
