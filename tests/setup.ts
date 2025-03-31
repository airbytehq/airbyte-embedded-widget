// Mock document.createElement to handle dialog element
const originalCreateElement = document.createElement;
document.createElement = function (tagName: string): HTMLElement {
  if (tagName === "dialog") {
    const dialog = originalCreateElement.call(document, "div");
    dialog.showModal = jest.fn();
    dialog.close = jest.fn();
    return dialog;
  }
  return originalCreateElement.call(document, tagName);
};
