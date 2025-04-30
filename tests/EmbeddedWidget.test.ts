import { EmbeddedWidget } from "../src/EmbeddedWidget";
import { JSDOM } from "jsdom";

const defaultConfig = {
  token:
    "eyJ0b2tlbiI6ICJtb2NrLXRva2VuIiwgIndpZGdldFVybCI6ICJodHRwczovL2Zvby5haXJieXRlLmNvbS9lbWJlZGRlZC13aWRnZXQmd29ya3NwYWNlSWQ9Zm9vJmFsbG93ZWRPcmlnaW49aHR0cHMlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMDAzIn0=",
  // decodes to { "token": "mock-token", "widgetUrl": "https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003"}
};

describe("EmbeddedWidget", () => {
  let widget: EmbeddedWidget;
  let dom: JSDOM;
  let window: Window;
  let document: Document;
  let mockPostMessage: jest.Mock;

  beforeEach(() => {
    // Create a new JSDOM instance for each test
    dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
      url: "http://localhost/",
      runScripts: "dangerously",
    });

    window = dom.window as unknown as Window;
    document = window.document;

    // Mock postMessage
    mockPostMessage = jest.fn();
    window.postMessage = mockPostMessage;

    // Create the widget with the test environment
    widget = new EmbeddedWidget(defaultConfig);
  });

  afterEach(() => {
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
    const iframeWindow = iframe?.contentWindow as Window;

    // Simulate receiving the auth_token_request message
    const messageEvent = new MessageEvent("message", {
      data: "auth_token_request",
      origin: "https://foo.airbyte.com",
    });
    window.dispatchEvent(messageEvent);

    // Verify postMessage was called with correct parameters
    expect(mockPostMessage).toHaveBeenCalledWith(
      { scopedAuthToken: "mock-token" },
      new URL("https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003")
        .origin
    );
  });

  test("updateToken passes new token to iframe", () => {
    const newToken = "eyJ0b2tlbiI6Im5ldy10b2tlbiIsIndpZGdldFVybCI6Imh0dHBzOi8vbmV3LndpZGdldC5jb20ifQo=";
    widget.updateToken(newToken);

    // Verify postMessage was called with correct parameters
    expect(mockPostMessage).toHaveBeenCalledWith(
      { scopedAuthToken: "new-token" },
      new URL("https://new.widget.com").origin
    );
  });

  test("creates button with correct attributes", () => {
    const button = document.querySelector("button");
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("Open Airbyte");
    expect(button?.classList.contains("airbyte-widget-button")).toBe(true);
  });

  test("opens dialog when button is clicked", () => {
    const button = document.querySelector("button");
    const dialog = document.querySelector("dialog");

    // Mock showModal since JSDOM doesn't implement it
    const mockShowModal = jest.fn();
    Object.defineProperty(dialog, "showModal", {
      value: mockShowModal,
    });

    button?.click();
    expect(mockShowModal).toHaveBeenCalled();
  });

  test("closes dialog when CLOSE_DIALOG message is received", () => {
    const dialog = document.querySelector("dialog");

    // Mock close since JSDOM doesn't implement it
    const mockClose = jest.fn();
    Object.defineProperty(dialog, "close", {
      value: mockClose,
    });

    // Simulate receiving the CLOSE_DIALOG message
    const messageEvent = new MessageEvent("message", {
      data: "CLOSE_DIALOG",
      origin: "https://foo.airbyte.com",
      source: dialog?.querySelector("iframe")?.contentWindow as Window,
    });
    window.dispatchEvent(messageEvent);

    expect(mockClose).toHaveBeenCalled();
  });

  test("mount() method moves button to a different container", () => {
    const button = document.querySelector("button");
    const originalParent = button?.parentElement;

    // Create a new container
    const newContainer = document.createElement("div");
    newContainer.id = "new-container";
    document.body.appendChild(newContainer);

    // Mount the widget to the new container
    widget.mount(newContainer);

    // Verify the button was moved
    expect(button?.parentElement).toBe(newContainer);
    expect(originalParent?.contains(button)).toBe(false);
  });
});
