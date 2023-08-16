describe("Setup", () => {
  it("should setup network and accounts", () => {
    // Import Account
    const ACCOUNT_2_PK = Cypress.env("ACCOUNT_2_PK"); // Access Environment Variable CYPRESS_ACCOUNT_2_PK
    cy.importMetamaskAccount(ACCOUNT_2_PK);
    cy.switchMetamaskAccount(1);
    cy.addMetamaskNetwork({
      networkName: "XDC Apothem",
      rpcUrl: "https://apothem.xdcrpc.com",
      chainId: "51",
      symbol: "XDC",
      blockExplorer: "https://apothem.xdcscan.io",
      isTestnet: true,
    });
  });
});
