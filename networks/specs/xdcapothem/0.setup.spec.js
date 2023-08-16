describe("Setup", () => {
  it("should setup network and accounts", () => {
    cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
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
