import fs from 'fs';

const fixturesDirectory = "networks/fixtures/"
const referenceDirectory = `${fixturesDirectory}reference/`
const templateFiles = ["ebl-endorse-owner.json", "ebl-nominate-owner.json", "ebl-surrender.json", "ebl-transfer-holder.json"];

export const fillTemplate = (network, data) => {
    for (const templateFile of templateFiles) {
        let jsonString = fs.readFileSync(`${referenceDirectory}${templateFile}`, 'utf8');
        for(const dataKey in data) {
            jsonString = jsonString.split(`"${dataKey}"`).join(`"${data[dataKey]}"`); // TODO: RIP Perf 
        }
        fs.writeFileSync(`${fixturesDirectory}${network}/unwrapped/${templateFile}`, jsonString, 'utf8');
    }
}

export const getMerkleRoots = (network) => {
    const merkleRoots = [];
    for (const templateFile of templateFiles) {
        let jsonString = fs.readFileSync(`${fixturesDirectory}${network}/wrapped/${templateFile}`, 'utf8');
        const wrappedJSON = JSON.parse(jsonString);
        merkleRoots.push(wrappedJSON.proof.merkleRoot);
    }
    return merkleRoots;
}

export const extractTokenRegistryFactoryAddress = (result) => 
    extractText(result, [["✔  success   Title escrow factory deployed at ",""], ["",""]]);

export const extractDomainName = (result) => {
    const content = extractText(result, [["✔  success   Record created at ", ""], [" and will stay valid until ",";"]]);
    const domainName = content.split(";")[0];
    return domainName;
}
    

export const extractTokenRegistryAddress = (result) => 
    extractText(result, [["✔  success   Token registry deployed at ",""], ["",""]]);

export const extractText = (result, query) => {
    const front = query[0];
    const back = query[1];

    const splitResults = result.trim().split("\n");
    for (let count = 0; count < splitResults.length; count++) {
      const line = splitResults[count].trim();
      const containsQueriedString = line.includes(front[0]) && line.includes(back[0]);
      if (containsQueriedString) {
        const address = line.replace(front[0], front[1]).replace(back[0], back[1]);
        return address.trim();
      }
    }
    throw new Error("Could not find address");
};