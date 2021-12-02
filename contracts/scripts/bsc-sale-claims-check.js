const { ethers } = require('hardhat');
const hre = require('hardhat');

const json = require('../bsc_proofs.json');

async function main() {
	const signers = await ethers.getSigners();
	const primary = signers[0];

	console.log('deploying from: ', primary.address);

	const allContributorsEth = Object.keys(json);
	const allContributorsBalance = [];
	for (let i = 0; i < allContributorsEth.length - 1; i++) {
		allContributorsBalance.push(json[allContributorsEth[i]].Amount);
	}

	const claims = await ethers.getContractAt('NFTMerkleDistributor', '0xa0e85bbca0ab3acc9d6404e55a3e6b6c147a3770');
	for (let i = 0; i < allContributorsEth.length - 1; i++) {
		const minted = await claims.mintedPerAccount(allContributorsEth[i]);
		if (minted.toString() == allContributorsBalance[i]) {
			continue;
		}
		console.log(`${allContributorsEth[i]},${Number(allContributorsBalance[i]) * 0.06}`);
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
