import React from 'react';
import Slide from 'components/Slide';

const AboutSlide = () => {
	return (
		<Slide
			color="var(--bg-01)"
			section="about"
			header="About"
			subHeaders={[
				'uwucrew is a generative collection of 10,000 female-focused avatars inspired by anime and pop culture, aiming to be both inclusive and expressive. Every uwucrew NFT is completely unique and features up to 8 traits - Background, Hat, Hair, Eyes, Mouth, Top, Left Accessory, and Right Accessory.',
				'An interesting property of uwucrew is our unique asset generation which involves over 25 layers of hand-drawn art! In order to support various kinds of outfits and expressions, the uwucrew collection also supports multiple arm poses (even with sleeved clothes) to let us incorporate several kinds of hand accessories!'
			]}
		/>
	);
};

export default AboutSlide;