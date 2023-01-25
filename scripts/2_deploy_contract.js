import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
import { collectionMetadata, storeArrayMetadata } from './1_create_metadata.js';

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

const newContract = await sdk.deploy({
    template: TEMPLATES.ERC721Mintable,
    params: {
        name: '1507Contract',
        symbol: 'TOC',
        contractURI: collectionMetadata,
        baseURI: storeArrayMetadata,
    },
});
console.log('contract address: ', newContract.contractAddress);