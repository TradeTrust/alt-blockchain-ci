// TO CHECK
import { ACCOUNT_1, ACCOUNT_2, ACCOUNT_3 } from "./addresses";

describe("Transfer Owner", () => {
  it("should go to verify page, upload a file, connect to wallet and transfer holder successfully", () => {
    cy.switchMetamaskAccount(1);
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("xdcapothem/wrapped/ebl-nominate-owner.json");
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

  context("Nominate Owner", () => {
    it("should go to verify page, upload a file, connect to wallet and nominate owner successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("xdcapothem/wrapped/ebl-nominate-owner.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
      cy.clickConnectAndManageAssetButton();
      cy.get("[data-testid='nominateBeneficiaryHolderDropdown']").click(); // Nominate Change of Ownership
      cy.get("[data-testid='editable-input-owner']").type(ACCOUNT_3);
      cy.get("[data-testid='nominationBtn']").click();
      cy.wait(10000);
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_1);
      cy.get("[data-testid='overlay-title']").should("have.text", "Nomination Success");
    });
  });

  context("Accept Nominated Owner", () => {
    it("should go to verify page, upload a file, connect a wallet and endorse nominated owner successfully", () => {
      cy.switchMetamaskAccount(2); // switch to account 2 (holder)
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("xdcapothem/wrapped/ebl-nominate-owner.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
      cy.clickConnectAndManageAssetButton();
      cy.get("[data-testid='endorseBeneficiaryDropdown']").click(); // Endorse Change of Ownership
      cy.get("[data-testid='non-editable-input-nominee']").should("have.text", ACCOUNT_3);
      cy.get("[data-testid='endorseBtn']").click();
      cy.wait(10000);
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
      cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_2);
      cy.get("[data-testid='overlay-title']").should("have.text", "Change Owner Success");
    });
  });
});
