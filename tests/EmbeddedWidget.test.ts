import { AirbyteEmbeddedWidget } from "../src/EmbeddedWidget";
import { JSDOM } from "jsdom";

const defaultConfig = {
  token:
    "eyJ0b2tlbiI6ICJtb2NrLXRva2VuIiwgIndpZGdldFVybCI6ICJodHRwczovL2Zvby5haXJieXRlLmNvbS9lbWJlZGRlZC13aWRnZXQmd29ya3NwYWNlSWQ9Zm9vJmFsbG93ZWRPcmlnaW49aHR0cHMlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMDAzIn0=",
  // decodes to { "token": "mock-token", "widgetUrl": "https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003"}
};

describe("AirbyteEmbeddedWidget", () => {
  let widget: AirbyteEmbeddedWidget;
  let dom: JSDOM;
  let window: Window;
  let document: Document;
  let mockPostMessage: jest.Mock;

  beforeEach(() => {
    // Create a new JSDOM instance for each test
    dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
      url: "http://localhost/",
      runScripts: "dangerously",
      pretendToBeVisual: true,
    });

    window = dom.window as unknown as Window;
    document = window.document;

    // Mock postMessage
    mockPostMessage = jest.fn();

    // Set up global window for the widget
    (global as any).window = window;
    (global as any).document = document;

    // Create the widget with the test environment
    widget = new AirbyteEmbeddedWidget(defaultConfig);

    // Get the iframe and mock its contentWindow.postMessage
    const iframe = document.querySelector("iframe");
    if (iframe?.contentWindow) {
      (iframe.contentWindow as any).postMessage = mockPostMessage;
    }
  });

  afterEach(() => {
    // Clean up global window
    delete (global as any).window;
    delete (global as any).document;
    dom.window.close();
  });

  test("creates widget with required configuration", () => {
    expect(widget).toBeDefined();
  });

  test("creates dialog with correct attributes", () => {
    const dialog = document.querySelector("dialog");
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-label")).toBe("Airbyte Widget");
    expect(dialog?.classList.contains("airbyte-widget-dialog-wrapper")).toBe(true);
  });

  test("creates iframe with correct attributes", () => {
    const iframe = document.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe?.getAttribute("src")).toBe(
      "https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003"
    );
    expect(iframe?.getAttribute("frameborder")).toBe("0");
    expect(iframe?.getAttribute("allow")).toBe("fullscreen");
  });

  test("posts token to iframe when request received", () => {
    const iframe = document.querySelector("iframe");
    const iframeWindow = iframe?.contentWindow;

    // Create a proper MessageEvent using the JSDOM window
    const event = new dom.window.Event("message", {
      bubbles: true,
      cancelable: true,
    });

    // Add required properties manually since JSDOM's Event doesn't support MessageEvent properties
    Object.defineProperties(event, {
      data: { value: "auth_token_request" },
      origin: { value: "https://foo.airbyte.com" },
      source: { value: iframeWindow },
    });

    // Dispatch the event on the window
    window.dispatchEvent(event);

    // Verify postMessage was called with correct parameters
    expect(mockPostMessage).toHaveBeenCalledWith(
      { scopedAuthToken: "mock-token" },
      "https://foo.airbyte.com"
    );
  });

  test("updateToken passes new token to iframe", () => {
    const iframe = document.querySelector("iframe");
    const iframeWindow = iframe?.contentWindow;
    const newToken = "eyJ0b2tlbiI6Im5ldy10b2tlbiIsIndpZGdldFVybCI6Imh0dHBzOi8vbmV3LndpZGdldC5jb20ifQo=";
    
    widget.updateToken(newToken);

    // Create a proper MessageEvent using the JSDOM window
    const event = new dom.window.Event("message", {
      bubbles: true,
      cancelable: true,
    });

    // Add required properties manually since JSDOM's Event doesn't support MessageEvent properties
    Object.defineProperties(event, {
      data: { value: "auth_token_request" },
      origin: { value: "https://new.widget.com" },
      source: { value: iframeWindow },
    });

    window.dispatchEvent(event);

    // Verify postMessage was called with correct parameters
    expect(mockPostMessage).toHaveBeenCalledWith(
      { scopedAuthToken: "new-token" },
      "https://new.widget.com"
    );
  });

  test("opens dialog when open() is called", () => {
    const dialog = document.querySelector("dialog");

    if (!dialog) {
      throw new Error("Dialog element not found");
    }

    // Mock showModal since JSDOM doesn't implement it
    const mockShowModal = jest.fn();
    dialog.showModal = mockShowModal;

    widget.open();
    expect(mockShowModal).toHaveBeenCalled();
  });

  test("closes dialog when CLOSE_DIALOG message is received", () => {
    const dialog = document.querySelector("dialog");
    const iframe = document.querySelector("iframe");

    if (!dialog) {
      throw new Error("Dialog element not found");
    }

    // Mock close since JSDOM doesn't implement it
    const mockClose = jest.fn();
    dialog.close = mockClose;

    // Create a proper MessageEvent using the JSDOM window
    const event = new dom.window.Event("message", {
      bubbles: true,
      cancelable: true,
    });

    // Add required properties manually since JSDOM's Event doesn't support MessageEvent properties
    Object.defineProperties(event, {
      data: { value: "CLOSE_DIALOG" },
      origin: { value: "https://foo.airbyte.com" },
      source: { value: iframe?.contentWindow },
    });

    window.dispatchEvent(event);
    expect(mockClose).toHaveBeenCalled();
  });
});
