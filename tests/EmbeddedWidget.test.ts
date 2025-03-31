import { EmbeddedWidget } from "../src/EmbeddedWidget";

const defaultConfig = {
  workspaceId: "test-workspace",
  organizationId: "test-org",
  token: "test-token",
  baseUrl: "https://test.airbyte.com",
};

describe("EmbeddedWidget", () => {
  let widget: EmbeddedWidget;
  let mockDialog: HTMLDialogElement;
  let mockShowModal: jest.Mock;
  let mockClose: jest.Mock;
  let mockButton: HTMLButtonElement;
  let mockCloseButton: HTMLButtonElement;
  let mockIframe: HTMLIFrameElement;
  let originalCreateElement: typeof document.createElement;
  let buttonCount = 0;

  beforeEach(() => {
    // Reset button count
    buttonCount = 0;

    // Store original createElement
    originalCreateElement = document.createElement;

    // Create mock elements
    mockShowModal = jest.fn();
    mockClose = jest.fn();
    mockDialog = {
      showModal: mockShowModal,
      close: mockClose,
      setAttribute: jest.fn(),
      classList: {
        add: jest.fn(),
      },
      appendChild: jest.fn(),
    } as unknown as HTMLDialogElement;

    mockButton = originalCreateElement.call(document, "button");
    mockButton.textContent = "Open Airbyte";
    mockButton.classList.add("airbyte-widget-button");
    mockButton.addEventListener = jest.fn((event, handler: EventListener) => {
      if (event === "click") {
        mockButton.onclick = handler as (ev: MouseEvent) => any;
      }
    });

    mockCloseButton = originalCreateElement.call(document, "button");
    mockCloseButton.textContent = "Close";
    mockCloseButton.classList.add("airbyte-widget-button", "airbyte-widget-close");
    mockCloseButton.addEventListener = jest.fn((event, handler: EventListener) => {
      if (event === "click") {
        mockCloseButton.onclick = handler as (ev: MouseEvent) => any;
      }
    });

    mockIframe = originalCreateElement.call(document, "iframe");

    // Mock document.createElement
    document.createElement = jest.fn((tagName: string) => {
      if (tagName === "dialog") return mockDialog;
      if (tagName === "button") {
        buttonCount++;
        return buttonCount === 1 ? mockButton : mockCloseButton;
      }
      if (tagName === "iframe") return mockIframe;
      return originalCreateElement.call(document, tagName);
    });

    // Mock document.head.appendChild
    jest.spyOn(document.head, "appendChild").mockImplementation((element) => element);

    // Mock document.body.appendChild
    jest.spyOn(document.body, "appendChild").mockImplementation((element) => element);

    // Mock querySelector
    jest.spyOn(document, "querySelector").mockImplementation((selector: string) => {
      if (selector === "button") return mockButton;
      if (selector === "button.airbyte-widget-close") return mockCloseButton;
      if (selector === "iframe") return mockIframe;
      return null;
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
    expect(mockDialog.classList.add).toHaveBeenCalledWith("airbyte-widget-dialog");
  });

  test("creates iframe with correct attributes", () => {
    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).toBeDefined();
    expect(iframe.src).toContain(`workspaceId=${defaultConfig.workspaceId}`);
    expect(iframe.src).toContain(`organizationId=${defaultConfig.organizationId}`);
    expect(iframe.src).toContain(`auth=${defaultConfig.token}`);
    expect(iframe.getAttribute("frameborder")).toBe("0");
    expect(iframe.getAttribute("allow")).toBe("fullscreen");
    expect(iframe.classList.contains("airbyte-widget-iframe")).toBe(true);
  });

  test("creates button with correct attributes", () => {
    const button = document.querySelector("button") as HTMLButtonElement;
    expect(button).toBeDefined();
    expect(button.textContent).toBe("Open Airbyte");
    expect(button.classList.contains("airbyte-widget-button")).toBe(true);
  });

  test("opens dialog when button is clicked", () => {
    const button = document.querySelector("button") as HTMLButtonElement;
    button.onclick?.({} as MouseEvent);
    expect(mockShowModal).toHaveBeenCalled();
  });

  test("closes dialog when close button is clicked", () => {
    const closeButton = document.querySelector("button.airbyte-widget-close") as HTMLButtonElement;
    closeButton.onclick?.({} as MouseEvent);
    expect(mockClose).toHaveBeenCalled();
  });
});
