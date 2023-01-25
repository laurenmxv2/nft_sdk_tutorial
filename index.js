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

export const collectionMetadata = Metadata.openSeaCollectionLevelStandard({
    name: 'My awesome collection',
    description: "A long description explaining why it's awesome",
    image: await sdk.storeFile({ metadata: 'https://gateway.pinata.cloud/ipfs/QmPfsXbEECNPsXWeSs3Go7mrcDck3sszwXYsAnSwv1wXeW/penguin3.jpeg' }),
});

console.log('collectionMetadata: ', collectionMetadata);


export const storeArrayMetadata = await sdk.createFolder({
    metadata: [
        Metadata.openSeaTokenLevelStandard({
            description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
            external_url: 'https://openseacreatures.io/3',
            image: await sdk.storeFile({ metadata: 'https://gateway.pinata.cloud/ipfs/QmPfsXbEECNPsXWeSs3Go7mrcDck3sszwXYsAnSwv1wXeW/penguin3.jpeg' }),
            name: 'Dave Starbelly',
            attributes: []
        })
    ]
});

Metadata.openSeaTokenLevelStandard({
    description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
    external_url: 'https://openseacreatures.io/3',
    image: await sdk.storeFile({ metadata: 'https://gateway.pinata.cloud/ipfs/QmPfsXbEECNPsXWeSs3Go7mrcDck3sszwXYsAnSwv1wXeW/penguin3.jpeg' }),
    name: 'Dave Starbelly',
    attributes: [],
});

console.log('storeArrayMetadata: ', storeArrayMetadata);

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


//minting

const tx = await ERC721Mintable.toggleSale();
const sale = await tx.wait();
const txMinted = await ERC721UserMintable.mint({
    quantity: 2,
    cost: '0.00002',
});

const mintedNFTERC721 = await txMinted.wait();
console.log('mintedNFT: ', mintedNFTERC721);