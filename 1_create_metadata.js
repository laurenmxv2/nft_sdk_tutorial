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

  const collectionMetadata = Metadata.openSeaCollectionLevelStandard({
    name: 'My awesome collection',
    description: "A long description explaining why it's awesome",
    image: await sdk.storeFile('https://gateway.pinata.cloud/ipfs/QmPfsXbEECNPsXWeSs3Go7mrcDck3sszwXYsAnSwv1wXeW/penguin3.jpeg'),
    external_link: 'https://myawesomewebsite.net',
  });
  
  
  console.log('collectionMetadata: ', collectionMetadata);

  const storeArrayMetadata = await sdk.createFolder([
    Metadata.openSeaTokenLevelStandard({
      description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
      external_url: 'https://openseacreatures.io/3',
      image: await sdk.storeFile(
        'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
      ),
      name: 'Dave Starbelly',
      attributes: [],
    }),
    Metadata.openSeaTokenLevelStandard({
      description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
      external_url: 'https://openseacreatures.io/3',
      image: await sdk.storeFile(
        'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
      ),
      name: 'Dave Starbelly',
      attributes: [],
    }),
  ]);
  
  console.log('storeArrayMetadata: ', storeArrayMetadata);

  const newContract = await sdk.deploy({
    template: TEMPLATES.ERC721Mintable,
    params: {
      name: '1507Contract',
      symbol: 'TOC',
      contractURI: collectionMetadata,
    },
  });
  console.log('contract address: ', newContract.contractAddress);