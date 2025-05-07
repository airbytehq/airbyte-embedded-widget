import { EmbeddedWidget } from "../src";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

describe("Module Format Tests", () => {
  const mockToken = "eyJ3aWRnZXRVcmwiOiJodHRwczovL2V4YW1wbGUuY29tIn0="; // Base64 encoded {"widgetUrl":"https://example.com"}
  let dom: JSDOM;

  beforeEach(() => {
    // Create a fresh JSDOM instance for each test
    dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
      url: "http://localhost/",
      runScripts: "dangerously",
      pretendToBeVisual: true,
    });

    // Set up global window for the widget
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
  });

  afterEach(() => {
    // Cleanup JSDOM
    delete (global as any).window;
    delete (global as any).document;
    if (dom?.window) {
      dom.window.close();
    }
  });

  // Test ES Module import
  test("should work as ES Module", () => {
    expect(EmbeddedWidget).toBeDefined();
    const widget = new EmbeddedWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(EmbeddedWidget);
  });

  // Test CommonJS require
  test("should work as CommonJS module", async () => {
    const distPath = path.resolve(__dirname, "../dist/index.cjs.js");
    expect(fs.existsSync(distPath)).toBe(true); // Ensure the file exists
    
    // Use dynamic import instead of require
    const module = await import(distPath);
    const CJSWidget = module.EmbeddedWidget;
    expect(CJSWidget).toBeDefined();
    const widget = new CJSWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(CJSWidget);
  });

  // Test IIFE/global usage
  test("should work as IIFE/global script", () => {
    const { window } = dom;
    const iifePath = path.resolve(__dirname, "../dist/airbyte-embedded-widget.iife.js");
    expect(fs.existsSync(iifePath)).toBe(true); // Ensure the file exists

    // Read the IIFE script content
    const scriptContent = fs.readFileSync(iifePath, "utf-8");

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
