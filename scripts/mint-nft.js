require('dotenv').config();
const ethers = require('ethers');
const contract = require("../artifacts/contracts/my-first-nft.sol/MyNFT.json");

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
let url = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`;

const provider = new ethers.providers.JsonRpcProvider(url);

console.log(JSON.stringify(contract.abi));

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0xbcED673511ee154d5c4C39Fbc6d048387AF33a8B'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL

const tokenUri = "https://gateway.pinata.cloud/ipfs/Qmc6bhT299k45VdeYcJBb1aBNWtgp8Cv4dmRedgq4FM4KG"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });