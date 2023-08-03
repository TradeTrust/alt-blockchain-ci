import { utils } from 'ethers';

// interface WalletKeys {
//     address: string;
//     privateKey: string;
//     publicKey: string;
// }

// process.env.MNEMONIC
export const getHDNode = (mnemonic, count = 10) => {
    const hdNode = utils.HDNode.fromMnemonic(mnemonic) // HDNode
    const walletList = []; // WalletKeys[]
    for (let i = 0; i < count; i++) {
        const wallet = hdNode.derivePath(`${utils.defaultPath}${i}`) // HDNode
        walletList.push({
            address: wallet.address,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
        }); //WalletKeys
    }
    return walletList; // WalletKeys[]
};
