export interface EmbeddedWidgetConfig {
  workspaceId: string;
  organizationId: string;
  token: string;
}

export class EmbeddedWidget {
  private workspaceId: string;
  private organizationId: string;
  private token: string;
  private dialog: HTMLDialogElement = document.createElement("dialog");
  private iframe: HTMLIFrameElement = document.createElement("iframe");

  constructor(config: EmbeddedWidgetConfig) {
    this.workspaceId = config.workspaceId;
    this.organizationId = config.organizationId;
    this.token = config.token;
    this.initialize();
  }

  private initialize(): void {
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
    this.iframe.setAttribute(
      "src",
      `https://embedded.internal.airbyte.dev/embedded-widget?workspaceId=${this.workspaceId}&organizationId=${this.organizationId}&auth=${this.token}`
    );
    this.iframe.setAttribute("frameborder", "0");
    this.iframe.setAttribute("allow", "fullscreen");
    this.iframe.classList.add("airbyte-widget-iframe");
    this.dialog.appendChild(this.iframe);

    // Create button
    const button = document.createElement("button");
    button.textContent = "Open Airbyte";
    button.classList.add("airbyte-widget-button");
    button.addEventListener("click", () => this.dialog.showModal());

    // Add close button to dialog
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("airbyte-widget-button", "airbyte-widget-close");
    closeButton.addEventListener("click", () => this.dialog.close());
    this.dialog.appendChild(closeButton);

    // Add elements to document
    document.body.appendChild(this.dialog);
    document.body.appendChild(button);
  }
}
