const existing = await sdk.loadContract({
    template: TEMPLATES.ERC721Mintable,
    contractAddress: "0x16847AfAb268Ac7211112C19e5C47C0E36E4aE7D",
  });
  console.log(`Contract address is: ${existing.contractAddress}`);

  const mint1 = await existing.mint({
    publicAddress: process.env.WALLET_PUBLIC_ADDRESS,
    tokenURI: 'https://gateway.pinata.cloud/ipfs/QmRe2d92B43ReHNEn6V89jAk1ojakW6XqLSK8mTvFxeVQZ?_gl=1*lifwy*_ga*OTcwMDU3ODM2LjE2NzQyMjAyMTM.*_ga_5RMPXG14TE*MTY3NDY0MDUxNS4zLjEuMTY3NDY0MDUxNy41OC4wLjA.',
  }
 );
 const minted = await mint1.wait();
 console.log(`Status: ${minted.status}\n NFT minted on ${minted.blockHash} with ${minted.confirmations} confirmation!`);