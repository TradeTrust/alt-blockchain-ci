import shell from "shelljs";
import { getHDNode } from "../../keys.mjs";
import { fillTemplate, extractTokenRegistryAddress, extractDomainName, getMerkleRoots } from "../../template.mjs";

const oaCLI_PATH = "open-attestation";

// Network Specific
const standalone = false ? "--standalone" : "";
const OACLINetwork = "maticmum"
const ChainInfo = {
    $CHAIN: "MATIC",
    $CHAINID: "80001",
}

// Keys && Address
const mnemonic = process.env.POLYGON_MNEMONIC;
if (!mnemonic) {
  throw new Error(`MNEMONIC not found: ${mnemonic}`);
}
const wallets = getHDNode(mnemonic);
const ACCOUNT_KEY = wallets[0].privateKey;
const ADDRESS_EXAMPLE_1 = wallets[0].address;

// const tokenRegistryFactoryOutput = shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n ${OACLINetwork} -k ${ACCOUNT_KEY}`, {
//   silent: true,
// });
// const TITLE_ESCROW_FACTORY_ADDRESS = extractTokenRegistryFactoryAddress(tokenRegistryFactoryOutput);

const tokenRegistryOutput = shell.exec(
  // `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n ${OACLINetwork} -k ${ACCOUNT_KEY} ${standalone} --factoryAddress ${TITLE_ESCROW_FACTORY_ADDRESS}`,
  `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n ${OACLINetwork} -k ${ACCOUNT_KEY} ${standalone}`,
  { silent: true }
);
const TOKEN_REGISTRY_ADDRESS = extractTokenRegistryAddress(tokenRegistryOutput);
const dnsCreateOutput = shell.exec(`${oaCLI_PATH} dns txt-record create -a ${TOKEN_REGISTRY_ADDRESS} --networkId ${ChainInfo['$CHAINID']}`,
{ silent: true });
const DOMAIN_NAME = extractDomainName(dnsCreateOutput);
fillTemplate("polygon", { $TOKENREGISTRYADDRESS: TOKEN_REGISTRY_ADDRESS, $DOMAINNAME: DOMAIN_NAME, ...ChainInfo });
shell.exec(`${oaCLI_PATH} wrap ${"networks/fixtures/polygon/unwrapped/"} --oav3 --output-dir ${"networks/fixtures/polygon/wrapped/"} --batched false`,
{ silent: true })
const merkleRoots = getMerkleRoots("polygon")

const defaultToken = {
  accountKey: ACCOUNT_KEY,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  owner: ADDRESS_EXAMPLE_1,
  holder: ADDRESS_EXAMPLE_1,
};

merkleRoots.forEach((hash) => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${defaultToken.owner} --holder ${defaultToken.holder} --address ${defaultToken.tokenRegistryAddress} --tokenId ${hash} -n ${OACLINetwork} -k ${defaultToken.accountKey}`,
    { silent: true }
  );
});
