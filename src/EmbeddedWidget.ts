export interface EmbeddedWidgetConfig {
  token: string;
  hideButton?: boolean;
  onEvent?: (event: WidgetEvent) => void;
}

export type WidgetEvent = {
  type: string;
  data: any;
};

export class EmbeddedWidget {
  private decodedToken: any;
  private dialog: HTMLDialogElement = document.createElement("dialog");
  private iframe: HTMLIFrameElement = document.createElement("iframe");
  private onEvent?: (event: WidgetEvent) => void;

  constructor(config: EmbeddedWidgetConfig) {
    this.onEvent = config.onEvent;
    this.decodedToken = this.decodeToken(config.token);

    this.initialize(config.hideButton);
  }

  private decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    try {
      const decoded = this.decodeBase64(token);
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }

  private decodeBase64(str: string): string {
    // Make sure the base64 string is properly padded
    const padded = str.padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");

    // Replace URL-safe characters
    const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");

    try {
      return atob(base64);
    } catch (error) {
      throw error;
    }
  }

  private initialize(hideButton = false): void {
    // Add font import
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(fontLink);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .airbyte-widget-dialog {
        padding: 0;
        border: none;
        border-radius: 10px;
        box-shadow: 0 10px 19px hsla(241, 51%, 20%, 16%);
        max-width: 90vw;
        max-height: 90vh;
        width: 1200px;
        height: 800px;
        background: white;
        font-family: Inter, Helvetica, Arial, sans-serif;
      }

      .airbyte-widget-dialog::backdrop {
        background: hsla(241, 51%, 20%, 50%);
        backdrop-filter: blur(4px);
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

      .airbyte-widget-iframe {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
      }

      .airbyte-widget-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background-color: transparent;
        color: hsl(240, 13%, 72%);
        box-shadow: none;
        padding: 0;
        height: 32px;
      }

      .airbyte-widget-close:hover {
        color: hsl(240, 10%, 59%);
        background-color: transparent;
      }

      .airbyte-widget-close:active {
        color: hsl(240, 10%, 59%);
      }
    `;
    document.head.appendChild(style);

    // Create dialog element
    this.dialog.setAttribute("aria-label", "Airbyte Widget");
    this.dialog.classList.add("airbyte-widget-dialog");

    // Create iframe

    this.iframe.setAttribute("src", this.decodedToken.widgetUrl);
    this.iframe.setAttribute("frameborder", "0");
    this.iframe.setAttribute("allow", "fullscreen");
    this.iframe.classList.add("airbyte-widget-iframe");
    this.dialog.appendChild(this.iframe);

    // Listen for messages from the iframe
    const iframeOrigin = new URL(this.decodedToken.widgetUrl).origin;

    window.addEventListener("message", (event) => {
      // Ensure the message is coming from the iframe we created
      // Either match the origin or check the source is our iframe window
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

      // Pass the event to the callback if provided
      if (this.onEvent && event.data && event.data.type) {
        this.onEvent(event.data as WidgetEvent);
      }
    });

    // Create button if not hidden
    if (!hideButton) {
      const button = document.createElement("button");
      button.textContent = "Open Airbyte";
      button.classList.add("airbyte-widget-button");
      button.addEventListener("click", () => this.open());
      document.body.appendChild(button);
    }

    // Add close button to dialog
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("airbyte-widget-button", "airbyte-widget-close");
    closeButton.addEventListener("click", () => this.dialog.close());
    this.dialog.appendChild(closeButton);

    // Add dialog to document
    document.body.appendChild(this.dialog);
  }

  public open(): void {
    this.dialog.showModal();
  }
}
