import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts, validateTextContent, CloseWindow } from "./helper";

fixture("Nested documents").page`http://localhost:3000`;

const CertificateDropzone = Selector("[id='certificate-dropzone']");
const NavLogoHome = Selector("[data-testid='nav-logo-home']");
const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentOpen0 = Selector("[data-testid='attachment-tile-0']").find("[data-testid='attachment-open-link']");
const AttachmentOpen1 = Selector("[data-testid='attachment-tile-1']").find("[data-testid='attachment-open-link']");

test("Document with nested documents in attachments should open in new tab correctly", async (t) => {
  await uploadDocument("./fixture/nested-documents.json");
  await validateIframeTexts(["Root level nested"]);

  await t.click(AttachmentNumber);
  await t.click(AttachmentOpen1);
  await validateIframeTexts(["Normal"]);
  await t.click(NavLogoHome);

  // should not re-render nested document
  await validateTextContent(t, CertificateDropzone, ["Drag and drop your tradetrust file"]);
  await CloseWindow();

  await t.click(AttachmentOpen0);
  await validateIframeTexts(["1st level nested"]);

  await t.click(AttachmentNumber);
  await t.click(AttachmentOpen0);
  await validateIframeTexts(["2nd level nested"]);
});
