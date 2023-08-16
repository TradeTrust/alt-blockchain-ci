describe("Setup", () => {
  it("should setup network and accounts", () => {
    // Import Account
    const ACCOUNT_2_PK = Cypress.env("ACCOUNT_2_PK"); // Access Environment Variable CYPRESS_ACCOUNT_2_PK
    cy.importMetamaskAccount(ACCOUNT_2_PK);
    cy.switchMetamaskAccount(1);

    // Add network details
    const networkDetails = {
        networkName: 'Polygon Mumbai', 
        rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/QSv6dciCkBm2dwLyCOsJwqqwM-tJzP3m', 
        chainId: '80001', 
        symbol: 'MATIC', 
        blockExplorer: 'https://mumbai.polygonscan.com', 
        isTestnet: true
      }
    cy.addMetamaskNetwork(networkDetails)
    console.log(process.env)
    cy.log(process.env)
  });
});
