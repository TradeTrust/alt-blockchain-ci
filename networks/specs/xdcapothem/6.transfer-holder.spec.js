import { ACCOUNT_2 } from "./addresses";

describe("Transfer Holder", () => {
  it("should go to verify page, upload a file, connect to wallet and transfer holder successfully", () => {
    cy.switchMetamaskAccount(1);
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("xdcapothem/wrapped/ebl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.clickConnectAndManageAssetButton();
    cy.get("[data-testid='transferHolderDropdown']").click(); // Transfer Holdership
    cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_2);
    cy.get("[data-testid='transferBtn']").click();
    cy.wait(10000);
    cy.confirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_2);
    cy.get("[data-testid='overlay-title']").should("have.text", "Transfer Holder Success");
  });
});
