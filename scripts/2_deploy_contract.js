const newContract = await sdk.deploy({
    template: TEMPLATES.ERC721Mintable,
    params: {
      name: '1507Contract',
      symbol: 'TOC',
      contractURI: collectionMetadata,
    },
  });
  console.log('contract address: ', newContract.contractAddress);