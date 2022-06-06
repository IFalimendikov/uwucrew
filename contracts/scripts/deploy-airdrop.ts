import { ethers } from "hardhat";

async function main() {
  let signers = await ethers.getSigners();
  let primary = signers[0];

  console.log("deploying from: ", await primary.getAddress());
  
  // let Airdrop1155 = await ethers.getContractFactory("Airdrop1155");
  // let airdrop = await Airdrop1155.deploy("uwucrew extras", "EXTRA", "ipfs://");
  // await airdrop.deployed();
  // console.log("Airdrop deployed: ", airdrop.address);

  // let airdrop = await ethers.getContractAt("Airdrop1155", "0x918EAa82Ee6F07e46c82D04e34ebC352A56317C2"); // uwucrew
  let airdrop = await ethers.getContractAt("Airdrop1155", "0xa3b041ee6b56bccbc54a3048417d82fe67736f62"); // persona lamps
  // let tx1 = await airdrop.initializeAirdrop(0, "QmX92tTuRvXKgsLa5L8g8sapeqgYddinCKmkhPAHnpKGAB", {gasLimit: 160000})
  // await tx1.wait();
  let tx2 = await airdrop.setTokenURI(3, "QmWWT9ikoXdn8WC1EfkMc6ansPsL8Nc4mwpUyLeX6Dz388", {gasLimit: 160000})
  await tx2.wait()
  console.log("Airdrop initialized");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
