import { ACCOUNT_1, ACCOUNT_2, ACCOUNT_3, ORIGIN_ACCOUNT } from "./addresses";

describe("Reading of Mumbai Network", () => {
  it("should be able to view escrow information", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("polygon/ebl-mumbai.json");
    cy.get("[data-testid=issue-status]").should("have.text", `Document has been issued`);
    cy.get("[data-testid=identity-status]").should("have.text", `Document issuer has been identified`);
    cy.get("[data-testid=hash-status]").should("have.text", `Document has not been tampered with`);
    cy.get("[data-testid='asset-title-owner']").should("have.text", `Owner:${ORIGIN_ACCOUNT}`);
    cy.get("[data-testid='asset-title-holder']").should("have.text", `Holder:${ORIGIN_ACCOUNT}`);
  });

  it("should be able to view surrendered escrow information", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("polygon/ebl-mumbai-surrendered.json");
    cy.get("[id=surrendered-sign]").should("be.visible");
    cy.get("[id=endorsement-chain-button]").click();
    cy.wait(60000);

    cy.get("[data-testid='row-event-0'] [data-testid='action-title']").should("have.text", "Document has been issued");
    cy.get("[data-testid='row-event-0'] [data-testid='row-event-Owner']").should("have.text", `Owner${ORIGIN_ACCOUNT}`);
    cy.get("[data-testid='row-event-0'] [data-testid='row-event-Holder']").should("have.text", `Holder${ORIGIN_ACCOUNT}`);

    cy.get("[data-testid='row-event-1'] [data-testid='action-title']").should("have.text", "Change Owners");
    cy.get("[data-testid='row-event-1'] [data-testid='row-event-Owner']").should("have.text", `Owner${ACCOUNT_1}`);
    cy.get("[data-testid='row-event-1'] [data-testid='row-event-Holder']").should("have.text", `Holder${ACCOUNT_1}`);

    cy.get("[data-testid='row-event-2'] [data-testid='action-title']").should("have.text", "Transfer holdership");
    cy.get("[data-testid='row-event-2'] [data-testid='row-event-Holder']").should("have.text", `Holder${ACCOUNT_2}`);

    cy.get("[data-testid='row-event-3'] [data-testid='action-title']").should("have.text", "Endorse change of ownership");
    cy.get("[data-testid='row-event-3'] [data-testid='row-event-Owner']").should("have.text", `Owner${ACCOUNT_3}`);

    cy.get("[data-testid='row-event-4'] [data-testid='action-title']").should("have.text", "Transfer holdership");
    cy.get("[data-testid='row-event-4'] [data-testid='row-event-Holder']").should("have.text", `Holder${ACCOUNT_3}`);

    cy.get("[data-testid='row-event-5'] [data-testid='action-title']").should("have.text", "Document surrendered to issuer");
    
    cy.get("[data-testid='row-event-6'] [data-testid='action-title']").should("have.text", "Surrender of document rejected");
    cy.get("[data-testid='row-event-6'] [data-testid='row-event-Owner']").should("have.text", `Owner${ACCOUNT_3}`);
    cy.get("[data-testid='row-event-6'] [data-testid='row-event-Holder']").should("have.text", `Holder${ACCOUNT_3}`);

    cy.get("[data-testid='row-event-7'] [data-testid='action-title']").should("have.text", "Document surrendered to issuer");

    cy.get("[data-testid='row-event-8'] [data-testid='action-title']").should("have.text", "Surrender of document accepted");
  });
});