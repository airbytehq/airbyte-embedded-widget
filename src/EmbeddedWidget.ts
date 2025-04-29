export interface EmbeddedWidgetConfig {
  token: string;
  hideButton?: boolean;
  onEvent?: (event: WidgetEvent) => void;
}

export interface WidgetEvent {
  type: string;
  data: any;
}

interface EmbeddedToken {
  token: string;
  widgetUrl: string;
}

export class EmbeddedWidget {
  private decodedToken: EmbeddedToken;
  private dialog: HTMLDialogElement = document.createElement("dialog");
  private iframe: HTMLIFrameElement = document.createElement("iframe");
  private onEvent?: (event: WidgetEvent) => void;
  private containerElement?: HTMLElement;
  private button?: HTMLButtonElement;

  constructor(config: EmbeddedWidgetConfig) {
    this.onEvent = config.onEvent;
    this.decodedToken = this.decodeToken(config.token);
    this.containerElement = config.containerElement;

    this.initialize(config.hideButton);
  }

  private decodeToken(token: string | undefined): EmbeddedToken {
    if (!token) {
      return { token: "", widgetUrl: "" };
    }

    try {
      const decoded = this.decodeBase64(token);
      return JSON.parse(decoded);
    } catch (error) {
      return { token: "", widgetUrl: "" };
    }
  }

  private decodeBase64(str: string): string {
    try {
      // Make sure the base64 string is properly padded
      const padded = str.padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");

      // Replace URL-safe characters
      const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");

      return atob(base64);
    } catch (error) {
      console.debug("Error decoding base64 string:", error);
      throw new Error("Failed to decode base64 string");
    }
  }

  private initialize(hideButton = false): void {
    // Add font import for button
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(fontLink);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
    .airbyte-widget-dialog-wrapper {
      padding: 0;
      border: none;
      background: transparent;
      position: relative;
    }
    
    .airbyte-widget-dialog-container {
      padding: 0;
      border: none;
      background: transparent;
      display: flex;
      flex-direction: column;
      // border: green 2px solid;
    }
      
      .airbyte-widget-dialog-content {
        width: 500px;
        height: 722px;
        border-radius: 10px;  
        background: none;
        overflow: hidden;
      }

      .airbyte-widget-dialog-branding {
      //  padding-top: 12px;
      //  padding-bottom: 12px;
      //  background-image: url("./assets/embedded-branding.svg");
      //  border: red 2px solid;
      //  min-height: 60px;
      }

      .airbyte-widget-dialog-wrapper::backdrop {
        background-color: hsl(241, 51%, 20%);
        opacity: 0.6;
      }

      .airbyte-widget-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        line-height: 1.2;
        color: white;
        border-radius: 8px;
        border: 0;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s ease-in;
        white-space: nowrap;
        background-color: hsl(241, 100%, 68%);
        padding: 10px 12px;
        height: 42px;
        box-shadow: none;
        font-family: Inter, Helvetica, Arial, sans-serif;
      }

      .airbyte-widget-button:hover {
        background-color: hsl(243, 96%, 61%);
      }

      .airbyte-widget-button:active {
        background-color: hsl(245, 85%, 56%);
      }

      .airbyte-widget-button:focus-visible {
        outline: 3px solid hsl(240, 100%, 98%);
      }
    `;
    document.head.appendChild(style);

    // Create dialog element
    this.dialog.setAttribute("aria-label", "Airbyte Widget");
    this.dialog.classList.add("airbyte-widget-dialog-wrapper");

    // Create container for content and branding
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("airbyte-widget-dialog-container");

    // Create content and branding elements
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("airbyte-widget-dialog-content");

    const dialogBranding = document.createElement("div");
    dialogBranding.classList.add("airbyte-widget-dialog-branding");

    // Assemble the dialog structure
    this.dialog.appendChild(dialogContainer);
    dialogContainer.appendChild(dialogContent);
    dialogContainer.appendChild(dialogBranding);

    // Create iframe only if we have a valid URL
    if (this.decodedToken.widgetUrl) {
      this.iframe.setAttribute("src", this.decodedToken.widgetUrl);
      this.iframe.setAttribute("frameborder", "0");
      this.iframe.setAttribute("allow", "fullscreen");
      this.iframe.style.width = "100%";
      this.iframe.style.height = "100%";
      this.iframe.style.border = "none";
      dialogContent.appendChild(this.iframe);

      // Listen for messages from the iframe
      try {
        // Add event listener using the bound handler method
        window.addEventListener("message", this.handleMessage);
      } catch (error) {
        console.error("Error setting up iframe communication:", error);
        // Add an error message to the dialog
        const errorElement = document.createElement("div");
        errorElement.textContent = "Error initializing widget. Please check your token configuration.";
        errorElement.style.color = "red";
        errorElement.style.padding = "20px";
        dialogContent.appendChild(errorElement);
      }
    } else {
      // Display an error in the dialog if we don't have a valid URL
      const errorElement = document.createElement("div");
      errorElement.textContent = "Error: Missing widget URL. Please check your token configuration.";
      errorElement.style.color = "red";
      errorElement.style.padding = "20px";
      dialogContent.appendChild(errorElement);
    }

    // Create button if not hidden
    if (!hideButton) {
      this.button = document.createElement("button");
      this.button.textContent = "Open Airbyte";
      this.button.classList.add("airbyte-widget-button");
      this.button.addEventListener("click", () => this.open());

      // Append button to containerElement if provided, otherwise to document.body
      if (this.containerElement) {
        this.containerElement.appendChild(this.button);
      } else {
        document.body.appendChild(this.button);
      }
    }

    // Add dialog to document
    document.body.appendChild(this.dialog);
  }

  public updateToken(token: string | undefined): void {
    this.decodedToken = this.decodeToken(token);

    // Only proceed if we have a valid widget URL
    if (!this.decodedToken.widgetUrl) {
      console.warn("Cannot update token: Missing widget URL");
      return;
    }

    try {
      const iframeOrigin = new URL(this.decodedToken.widgetUrl).origin;
      const message = { scopedAuthToken: this.decodedToken.token };
      this.iframe.contentWindow?.postMessage(message, iframeOrigin);
    } catch (error) {
      console.debug("Error sending updated token to iframe:", error);
    }
  }

  public open(): void {
    this.dialog.showModal();
  }

  /**
   * Mount the widget button to a specific element
   * @param element The HTML element to mount the button to
   */
  public mount(element: HTMLElement): void {
    if (!this.button) {
      console.warn("No button to mount - widget may have been initialized with hideButton=true");
      return;
    }

    // If button was already mounted somewhere, remove it first
    if (this.button.parentElement) {
      this.button.parentElement.removeChild(this.button);
    }

    // Update container element reference and append button
    this.containerElement = element;
    element.appendChild(this.button);
  }

  /**
   * Clean up resources used by the widget
   * Call this when the widget is no longer needed
   */
  public destroy(): void {
    // Remove the dialog from the DOM
    if (this.dialog.parentElement) {
      this.dialog.parentElement.removeChild(this.dialog);
    }

    // Remove the button from the DOM if it exists
    if (this.button && this.button.parentElement) {
      this.button.parentElement.removeChild(this.button);
    }

    // Remove event listeners
    window.removeEventListener("message", this.handleMessage);
  }

  // Bound message handler to allow for removal
  private handleMessage = (event: MessageEvent): void => {
    if (!this.decodedToken.widgetUrl) return;

    try {
      const iframeOrigin = new URL(this.decodedToken.widgetUrl).origin;

      // Ensure the message is coming from the iframe we created
      const isFromIframe = event.origin === iframeOrigin || event.source === this.iframe.contentWindow;

      if (!isFromIframe) {
        return;
      }

      // Check if the message is from ourselves (localhost)
      if (event.origin === window.location.origin && event.source === window) {
        return;
      }

      if (event.data === "auth_token_request") {
        const message = { scopedAuthToken: this.decodedToken.token };

        try {
          this.iframe.contentWindow?.postMessage(message, iframeOrigin);
        } catch (error) {
          console.debug("Error posting message to iframe:", error);
        }
      }

      // Handle close dialog message from the webapp
      if (event.data && event.data === "CLOSE_DIALOG") {
        this.dialog.close();
      }

      // Pass the event to the callback if provided
      if (this.onEvent && event.data && typeof event.data === "object" && event.data.type) {
        const eventType = event.data.type;
        // Validate the event type
        if (eventType === "close" || eventType === "sync-complete") {
          this.onEvent(event.data as WidgetEvent);
        } else {
          console.warn(`Unknown event type received: ${eventType}`);
        }
      }
    } catch (error) {
      console.error("Error handling message event:", error);
    }
  };
}

/**
 * Mounts a widget to a DOM element matching the provided selector
 * @param selector - CSS selector for the container element
 * @param config - Widget configuration options
 * @returns An instance of the EmbeddedWidget
 */
export function mount(selector: string, config: Omit<EmbeddedWidgetConfig, "containerElement"> = {}): EmbeddedWidget {
  const container = document.querySelector(selector);
  if (!container) {
    throw new Error(`Container element not found for selector: ${selector}`);
  }

  const widget = new EmbeddedWidget({
    ...config,
    containerElement: container as HTMLElement,
  });

  return widget;
}
