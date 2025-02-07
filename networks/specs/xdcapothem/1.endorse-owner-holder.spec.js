import { ACCOUNT_3 } from "./addresses";

describe("Endorse Transfer of Ownership/Holdership", () => {
  it("should endorse transfer of both owner and holder successfully", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("xdcapothem/wrapped/ebl-endorse-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.clickConnectAndManageAssetButton(true); // approve all accounts to application once after connect to wallet, subsequent tests no longer need `true`
    cy.get("[data-testid='endorseTransferDropdown']").click(); // Endorse Transfer of Ownership/Holdership
    cy.get("[data-testid='editable-input-owner']").clear();
    cy.get("[data-testid='editable-input-holder']").clear();
    cy.get("[data-testid='editable-input-owner']").type(ACCOUNT_3);
    cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_3);
    cy.get("[data-testid='endorseTransferBtn']").click();
    cy.wait(10000)
    cy.confirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
  });
});
