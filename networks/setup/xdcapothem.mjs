// require('dotenv').config({ path: __dirname+'/.env' });
import shell from "shelljs";
import { getHDNode } from "./utils/keys.mjs";
import { fillTemplate, extractTokenRegistryAddress, extractDomainName, getMerkleRoots } from "./utils/template.mjs";

const oaCLI_PATH = "open-attestation";

// Network Specific
const standalone = true ? "--standalone" : "";
const OACLINetwork = "xdcapothem";
const ChainInfo = {
  $CHAIN: "XDC",
  $CHAINID: "51",
};

// Keys && Address
const mnemonic = process.env.SECRET_WORDS;
if (!mnemonic) {
  throw new Error(`MNEMONIC not found: ${mnemonic}`);
}
const wallets = getHDNode(mnemonic);
const ACCOUNT_KEY = wallets[0].privateKey;
const ADDRESS_EXAMPLE_1 = wallets[0].address;
shell.exec(`which ${oaCLI_PATH}`)
// const tokenRegistryFactoryOutput = shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n ${OACLINetwork} -k ${ACCOUNT_KEY}`, {
//   silent: true,
// });
// const TITLE_ESCROW_FACTORY_ADDRESS = extractTokenRegistryFactoryAddress(tokenRegistryFactoryOutput);

const tokenRegistryOutput = shell.exec(
  // `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n ${OACLINetwork} -k ${ACCOUNT_KEY} ${standalone} --factoryAddress ${TITLE_ESCROW_FACTORY_ADDRESS}`,
  `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n ${OACLINetwork} -k ${ACCOUNT_KEY} ${standalone}`
  // { silent: true }
);
const TOKEN_REGISTRY_ADDRESS = extractTokenRegistryAddress(tokenRegistryOutput);
console.log(`Token Registry Address: ${TOKEN_REGISTRY_ADDRESS}`);
const dnsCreateOutput = shell.exec(
  `${oaCLI_PATH} dns txt-record create -a ${TOKEN_REGISTRY_ADDRESS} --networkId ${ChainInfo["$CHAINID"]}`
  // { silent: true }
);
const DOMAIN_NAME = extractDomainName(dnsCreateOutput);
console.log(`Domain Name: ${DOMAIN_NAME}`);
fillTemplate("xdcapothem", { $TOKENREGISTRYADDRESS: TOKEN_REGISTRY_ADDRESS, $DOMAINNAME: DOMAIN_NAME, ...ChainInfo });
shell.exec(
  `${oaCLI_PATH} wrap ${"networks/fixtures/xdcapothem/unwrapped/"} --oav3 --output-dir ${"networks/fixtures/xdcapothem/wrapped/"} --batched false`,
  // { silent: true }
);
const merkleRoots = getMerkleRoots("xdcapothem");
console.log(`Merkle Roots: ${merkleRoots}`);

const defaultToken = {
  accountKey: ACCOUNT_KEY,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  owner: ADDRESS_EXAMPLE_1,
  holder: ADDRESS_EXAMPLE_1,
};
console.log(`Default Token: ${JSON.stringify(defaultToken)}`);
merkleRoots.forEach((hash) => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${defaultToken.owner} --holder ${defaultToken.holder} --address ${defaultToken.tokenRegistryAddress} --tokenId ${hash} -n ${OACLINetwork} -k ${defaultToken.accountKey}`,
    { silent: true }
  );
});
