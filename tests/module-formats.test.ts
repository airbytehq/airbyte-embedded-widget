import { AirbyteEmbeddedWidget } from "../src";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const mockToken = "eyJ0b2tlbiI6ICJtb2NrLXRva2VuIiwgIndpZGdldFVybCI6ICJodHRwczovL2Zvby5haXJieXRlLmNvbS9lbWJlZGRlZC13aWRnZXQifQ==";

// Extend Window interface to include our widget
declare global {
  interface Window {
    AirbyteEmbeddedWidget: typeof AirbyteEmbeddedWidget;
  }
}

describe("Module Format Tests", () => {
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
    expect(AirbyteEmbeddedWidget).toBeDefined();
    const widget = new AirbyteEmbeddedWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(AirbyteEmbeddedWidget);
  });

  // Test CommonJS require
  test("should work as CommonJS module", () => {
    // Clear require cache to ensure fresh load
    Object.keys(require.cache).forEach(key => {
      if (key.includes('airbyte-embedded-widget')) {
        delete require.cache[key];
      }
    });

    // Load the actual CommonJS bundle
    const CJSWidget = require("../dist/index.cjs.js").AirbyteEmbeddedWidget;
    expect(CJSWidget).toBeDefined();
    const widget = new CJSWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(CJSWidget);
  });

  // Test IIFE/global usage
  test("should work as IIFE/global script", () => {
    // Clear require cache
    Object.keys(require.cache).forEach(key => {
      if (key.includes('airbyte-embedded-widget')) {
        delete require.cache[key];
      }
    });

    // Load the actual IIFE bundle
    require("../dist/airbyte-embedded-widget.iife.js");

    expect(window.AirbyteEmbeddedWidget).toBeDefined();
    const widget = new window.AirbyteEmbeddedWidget({ token: mockToken });
    expect(widget).toBeInstanceOf(window.AirbyteEmbeddedWidget);
  });
});
