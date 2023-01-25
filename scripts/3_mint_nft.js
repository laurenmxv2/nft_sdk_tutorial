import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';

loadEnv();

const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    chainId: 5,
    ipfs: {
        projectId: process.env.INFURA_IPFS_API_KEY,
        apiKeySecret: process.env.INFURA_IPFS_API_KEY_SECRET,
    },
});

const sdk = new SDK(auth);

const tx = await ERC721UserMintable.toggleSale();

const sale = await tx.wait();

const txMinted = await ERC721UserMintable.mint({
    quantity: 2,
    cost: '0.00002',
});

const mintedNFTERC721 = await txMinted.wait();
console.log('mintedNFT: ', mintedNFTERC721);