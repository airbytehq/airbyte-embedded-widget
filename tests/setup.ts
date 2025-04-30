import { TextEncoder, TextDecoder } from "util";

// Add TextEncoder and TextDecoder to global scope
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

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
