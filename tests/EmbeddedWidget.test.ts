import { EmbeddedWidget } from "../src/EmbeddedWidget";

const defaultConfig = {
  token:
    "eyJ0b2tlbiI6ICJtb2NrLXRva2VuIiwgIndpZGdldFVybCI6ICJodHRwczovL2Zvby5haXJieXRlLmNvbS9lbWJlZGRlZC13aWRnZXQmd29ya3NwYWNlSWQ9Zm9vJmFsbG93ZWRPcmlnaW49aHR0cHMlM0ElMkYlMkZsb2NhbGhvc3QlM0EzMDAzIn0=",
  // decodes to { "token": "mock-token", "widgetUrl": "https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003"}
};

describe("EmbeddedWidget", () => {
  let widget: EmbeddedWidget;
  let mockDialog: HTMLDialogElement;
  let mockShowModal: jest.Mock;
  let mockClose: jest.Mock;
  let mockButton: HTMLButtonElement;
  let mockIframe: HTMLIFrameElement;
  let mockDialogContent: HTMLDivElement;
  let mockDialogContainer: HTMLDivElement;
  let mockDialogBranding: HTMLDivElement;
  let originalCreateElement: typeof document.createElement;

  /**
   * The tests below are minimal due to limitations in jsdom's implementation of:
   * - HTMLDialogElement (showModal, close)
   * - iframe cross-origin communication
   * - postMessage handling
   */

  beforeEach(() => {
    // Store original createElement
    originalCreateElement = document.createElement;

    // Create mock elements
    mockShowModal = jest.fn();
    mockClose = jest.fn();

    // Create mock dialog elements
    mockDialogContent = document.createElement("div") as HTMLDivElement;
    mockDialogContent.classList.add("airbyte-widget-dialog-content");

    mockDialogBranding = document.createElement("div") as HTMLDivElement;
    mockDialogBranding.classList.add("airbyte-widget-dialog-branding");

    mockDialogContainer = document.createElement("div") as HTMLDivElement;
    mockDialogContainer.classList.add("airbyte-widget-dialog-container");
    mockDialogContainer.appendChild(mockDialogContent);
    mockDialogContainer.appendChild(mockDialogBranding);

    mockDialog = {
      showModal: mockShowModal,
      close: mockClose,
      setAttribute: jest.fn(),
      classList: {
        add: jest.fn(),
      },
      appendChild: jest.fn((element) => {
        if (element === mockDialogContainer) {
          (mockDialog as any).firstChild = element;
        }
        return element;
      }),
      querySelector: jest.fn((selector) => {
        if (selector === ".airbyte-widget-dialog-content") return mockDialogContent;
        return null;
      }),
    } as unknown as HTMLDialogElement;

    mockButton = originalCreateElement.call(document, "button");
    mockButton.textContent = "Open Airbyte";
    mockButton.classList.add("airbyte-widget-button");
    mockButton.addEventListener = jest.fn((event, handler: EventListener) => {
      if (event === "click") {
        mockButton.onclick = handler as (ev: MouseEvent) => any;
      }
    });

    mockIframe = {
      ...originalCreateElement.call(document, "iframe"),
      addEventListener: jest.fn((event, handler: EventListener) => {
        if (event === "load") {
          mockIframe.onload = handler as (ev: Event) => any;
        }
      }),
      contentWindow: {
        postMessage: jest.fn(),
      },
      setAttribute: jest.fn((name, value) => {
        if (name === "src") mockIframe.src = value;
        if (name === "frameborder") mockIframe.frameBorder = value;
        if (name === "allow") mockIframe.allow = value;
      }),
      getAttribute: jest.fn((name) => {
        if (name === "frameborder") return "0";
        if (name === "allow") return "fullscreen";
        return null;
      }),
      src: "https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003",
      frameBorder: "0",
      allow: "fullscreen",
      style: {
        width: "",
        height: "",
        border: "",
      },
    } as unknown as HTMLIFrameElement;

    // Mock document.createElement
    document.createElement = jest.fn((tagName: string) => {
      if (tagName === "dialog") return mockDialog;
      if (tagName === "button") return mockButton;
      if (tagName === "iframe") return mockIframe;
      if (tagName === "div" && !mockDialogContainer.parentElement) {
        mockDialogContainer.appendChild = jest.fn((child) => child);
        return mockDialogContainer;
      }
      if (tagName === "div" && mockDialogContainer.parentElement && !mockDialogContent.parentElement) {
        mockDialogContent.appendChild = jest.fn((child) => child);
        return mockDialogContent;
      }
      if (tagName === "div") {
        mockDialogBranding.appendChild = jest.fn((child) => child);
        return mockDialogBranding;
      }
      return originalCreateElement.call(document, tagName);
    });

    // Mock document.head.appendChild
    jest.spyOn(document.head, "appendChild").mockImplementation((element) => element);

    // Mock document.body.appendChild
    jest.spyOn(document.body, "appendChild").mockImplementation((element) => element);

    // Mock querySelector
    jest.spyOn(document, "querySelector").mockImplementation((selector: string) => {
      if (selector === "button") return mockButton;
      if (selector === "iframe") return mockIframe;
      if (selector === ".airbyte-widget-dialog-content") return mockDialogContent;
      return null;
    });

    // Mock mockDialogContent.appendChild to track the iframe
    mockDialogContent.appendChild = jest.fn() as jest.Mock & typeof mockDialogContent.appendChild;
    // Set up the mock to store reference to iframe for testing
    (mockDialogContent.appendChild as jest.Mock).mockImplementation((child: Node) => {
      if (child === mockIframe) {
        (mockDialogContent as any).child = child;
      }
      return child;
    });

    widget = new EmbeddedWidget(defaultConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.createElement = originalCreateElement;
  });

  test("creates widget with required configuration", () => {
    expect(widget).toBeDefined();
  });

  test("creates dialog with correct attributes", () => {
    expect(mockDialog.setAttribute).toHaveBeenCalledWith("aria-label", "Airbyte Widget");
    expect(mockDialog.classList.add).toHaveBeenCalledWith("airbyte-widget-dialog-wrapper");
  });

  test("creates iframe with correct attributes", () => {
    expect(mockIframe.setAttribute).toHaveBeenCalledWith(
      "src",
      "https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003"
    );
    expect(mockIframe.setAttribute).toHaveBeenCalledWith("frameborder", "0");
    expect(mockIframe.setAttribute).toHaveBeenCalledWith("allow", "fullscreen");
  });

  test("posts token to iframe when request received", () => {
    // Simulate receiving the auth_token_request message
    const messageEvent = new MessageEvent("message", {
      data: "auth_token_request",
      origin: "https://foo.airbyte.com",
    });
    window.dispatchEvent(messageEvent);

    // Verify postMessage was called with correct parameters
    expect(mockIframe.contentWindow?.postMessage).toHaveBeenCalledWith(
      { scopedAuthToken: "mock-token" },
      new URL("https://foo.airbyte.com/embedded-widget&workspaceId=foo&allowedOrigin=https%3A%2F%2Flocalhost%3A3003")
        .origin
    );
  });

  test("updateToken passes new token to iframe", () => {
    const newToken = "eyJ0b2tlbiI6Im5ldy10b2tlbiIsIndpZGdldFVybCI6Imh0dHBzOi8vbmV3LndpZGdldC5jb20ifQo=";
    widget.updateToken(newToken);

    // Verify postMessage was called with correct parameters
    expect(mockIframe.contentWindow?.postMessage).toHaveBeenCalledWith(
      { scopedAuthToken: "new-token" },
      new URL("https://new.widget.com").origin
    );
  });

  test("creates button with correct attributes", () => {
    expect(mockButton.textContent).toBe("Open Airbyte");
    expect(mockButton.classList.contains("airbyte-widget-button")).toBe(true);
  });

  test("opens dialog when button is clicked", () => {
    mockButton.onclick?.({} as MouseEvent);
    expect(mockShowModal).toHaveBeenCalled();
  });

  test("closes dialog when CLOSE_DIALOG message is received", () => {
    // Simulate receiving the CLOSE_DIALOG message
    const messageEvent = new MessageEvent("message", {
      data: "CLOSE_DIALOG",
      origin: "https://foo.airbyte.com",
      source: mockIframe.contentWindow as Window,
    });
    window.dispatchEvent(messageEvent);

    // Verify that the dialog's close method was called
    expect(mockClose).toHaveBeenCalled();
  });
});
