import { EmbeddedWidget } from "../../src";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Module Format Tests", () => {
  const mockToken = "eyJ3aWRnZXRVcmwiOiJodHRwczovL2V4YW1wbGUuY29tIn0="; // Base64 encoded {"widgetUrl":"https://example.com"}

  // Test ES Module import
  test("should work as ES Module", () => {
    expect(EmbeddedWidget).toBeDefined();
    const widget = new EmbeddedWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(EmbeddedWidget);
  });

  // Test CommonJS require
  test("should work as CommonJS module", () => {
    // We need to use dynamic import to simulate CommonJS require
    const { EmbeddedWidget: CJSWidget } = require("../../dist/index.cjs.js");
    expect(CJSWidget).toBeDefined();
    const widget = new CJSWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(CJSWidget);
  });

  // Test IIFE/global usage
  test("should work as IIFE/global script", () => {
    // Create a new JSDOM instance
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
      url: "http://localhost/",
      runScripts: "dangerously",
    });

    // Get the global window object
    const { window } = dom;

    // Read the IIFE script content
    const scriptContent = fs.readFileSync(
      path.resolve(__dirname, "../../dist/airbyte-embedded-widget.iife.js"),
      "utf-8"
    );

    // Inject the script content
    const script = window.document.createElement("script");
    script.textContent = scriptContent;
    window.document.body.appendChild(script);

    // Check if the global variable is available
    expect(window.AirbyteEmbeddedWidget).toBeDefined();
    const widget = new window.AirbyteEmbeddedWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(window.AirbyteEmbeddedWidget);
  });
});
