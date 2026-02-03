// Public facing config - what users will see
export interface EmbeddedWidgetConfig {
  token: string;
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

// Airbyte logo SVG
const AIRBYTE_LOGO_SVG = `<svg width="92" height="28" viewBox="0 0 92 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_3119)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.43698 5.03318C11.0928 2.02838 15.491 1.1469 19.1068 2.88133C23.9105 5.186 25.6632 11.0569 23.0477 15.5855L17.1637 25.762C16.835 26.3305 16.294 26.7455 15.6595 26.9155C15.025 27.0855 14.349 26.9968 13.7798 26.669L20.9033 14.3462C22.8008 11.0594 21.5315 6.79905 18.0488 5.12163C15.4353 3.86308 12.2407 4.4918 10.3102 6.6562C9.24525 7.84443 8.6474 9.3785 8.62748 10.974C8.60753 12.5694 9.16675 14.118 10.2017 15.3325C10.3877 15.5503 10.5878 15.7558 10.8008 15.9475L6.64225 23.1543C6.47963 23.436 6.2631 23.6828 6.00503 23.881C5.74698 24.079 5.45243 24.2243 5.13823 24.3085C4.824 24.3928 4.4963 24.4143 4.17377 24.3718C3.85125 24.3293 3.54025 24.2238 3.2585 24.0613L7.77312 16.2373C7.12465 15.3023 6.65895 14.2531 6.4006 13.145L3.6341 17.949C3.30525 18.5178 2.76417 18.9325 2.1297 19.1025C1.4952 19.2728 0.81915 19.184 0.25 18.856L7.40417 6.46415C7.70195 5.95528 8.0478 5.47608 8.43698 5.03318ZM16.6942 8.97753C18.4172 9.9726 19.0123 12.1855 18.0153 13.9077L11.155 25.7605C10.8263 26.329 10.285 26.744 9.6505 26.914C9.016 27.084 8.34005 26.9953 7.7709 26.6675L14.141 15.6325C13.6298 15.525 13.1482 15.3078 12.7292 14.9958C12.3103 14.684 11.964 14.2849 11.7143 13.8261C11.4645 13.3674 11.3172 12.8599 11.2827 12.3388C11.2482 11.8176 11.3272 11.2951 11.5145 10.8075C11.7015 10.3198 11.9923 9.8786 12.3665 9.51425C12.7408 9.1499 13.1895 8.8711 13.682 8.6971C14.1745 8.52313 14.699 8.4581 15.219 8.5065C15.739 8.55493 16.2425 8.71563 16.6942 8.97753ZM14.199 11.2051C14.081 11.2956 13.982 11.4084 13.9077 11.5372C13.7957 11.7311 13.7435 11.9538 13.7582 12.1772C13.773 12.4006 13.8535 12.6146 13.9897 12.7922C14.1263 12.9698 14.312 13.103 14.524 13.175C14.736 13.2469 14.9647 13.2544 15.181 13.1964C15.3973 13.1385 15.5913 13.0177 15.739 12.8494C15.8865 12.681 15.981 12.4727 16.0103 12.2508C16.0393 12.0288 16.002 11.8032 15.903 11.6024C15.804 11.4016 15.6478 11.2347 15.4538 11.1227C15.3253 11.0484 15.183 11.0001 15.0357 10.9807C14.8882 10.9613 14.7385 10.9712 14.595 11.0097C14.4515 11.0482 14.3167 11.1145 14.199 11.2051Z" fill="#615EFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.75 21L33.8915 7.81641H36.9062L42.0477 21H39.1738L38.0665 18.047H32.7315L31.624 21H28.75ZM37.1875 15.6738C36.836 14.6425 36.5225 13.7197 36.247 12.9053C35.9718 12.0908 35.6905 11.25 35.4033 10.3828C35.1163 11.25 34.832 12.0908 34.5508 12.9053C34.2755 13.7197 33.962 14.6425 33.6102 15.6738H37.1875ZM42.918 9.22266C42.918 8.80078 43.047 8.46096 43.3047 8.20313C43.5625 7.94531 43.9022 7.81641 44.3242 7.81641C44.746 7.81641 45.086 7.94531 45.3438 8.20313C45.6015 8.46096 45.7305 8.80078 45.7305 9.22266C45.7305 9.64453 45.6015 9.98438 45.3438 10.2422C45.086 10.5 44.746 10.6289 44.3242 10.6289C43.9022 10.6289 43.5625 10.5 43.3047 10.2422C43.047 9.98438 42.918 9.64453 42.918 9.22266ZM43.0585 21V12.211H45.5897V21H43.0585ZM47.7345 12.211V21H50.2655V17.124C50.2655 16.1983 50.4737 15.4863 50.8897 14.9883C51.3057 14.4844 51.8535 14.2324 52.5332 14.2324C52.8612 14.2324 53.1952 14.2881 53.5352 14.3994L53.8867 12.211C53.4825 12.0938 53.0898 12.0352 52.709 12.0352C51.5898 12.0352 50.711 12.5127 50.0723 13.4678V12.211H47.7345ZM54.8535 21V7.81641H57.3848V13.0811C57.754 12.7529 58.1757 12.4981 58.6505 12.3164C59.125 12.1289 59.6377 12.0352 60.1885 12.0352C61.0147 12.0352 61.75 12.2344 62.3945 12.6328C63.039 13.0254 63.546 13.5674 63.915 14.2588C64.2843 14.9443 64.4688 15.7265 64.4688 16.6055C64.4688 17.4845 64.2843 18.2695 63.915 18.961C63.546 19.6465 63.039 20.1885 62.3945 20.587C61.75 20.9795 61.0147 21.1758 60.1885 21.1758C59.62 21.1758 59.0897 21.079 58.5977 20.8858C58.1055 20.6865 57.6747 20.4083 57.3057 20.0508L57.2442 21H54.8535ZM59.8672 18.9785C60.5117 18.9785 61.045 18.753 61.4668 18.3018C61.8888 17.8505 62.0995 17.2853 62.0995 16.6055C62.0995 15.9258 61.8888 15.3603 61.4668 14.9093C61.045 14.458 60.5117 14.2324 59.8672 14.2324C59.2227 14.2324 58.6895 14.458 58.2675 14.9093C57.8458 15.3603 57.6348 15.9258 57.6348 16.6055C57.6348 17.2853 57.8458 17.8505 58.2675 18.3018C58.6895 18.753 59.2227 18.9785 59.8672 18.9785ZM68.6982 16.5088L66.6415 12.211H63.996L68.0918 20.5605L66.088 25.3945H68.751L74.2178 12.211H71.546L69.1728 17.9415C69.1143 17.6543 69.044 17.3905 68.962 17.1505C68.88 16.9103 68.792 16.6963 68.6982 16.5088ZM74.5605 12.211H76.0107V10.0137H78.542V12.211H80.6777V14.4082H78.542V17.6425C78.542 18.0585 78.6738 18.3868 78.9375 18.627C79.207 18.8613 79.547 18.9785 79.957 18.9785C80.2617 18.9785 80.5752 18.9113 80.8975 18.7763V20.8505C80.3407 21.0675 79.793 21.1758 79.254 21.1758C78.211 21.1758 77.4082 20.8975 76.8457 20.3408C76.289 19.7783 76.0107 18.9755 76.0107 17.9325V14.4082H74.5605V12.211ZM85.4765 18.5478C85.0548 18.2433 84.7647 17.8478 84.6065 17.3613H91.462V16.5968C91.462 15.712 91.2627 14.9268 90.8643 14.2412C90.4658 13.5557 89.921 13.0166 89.2295 12.624C88.544 12.2315 87.7588 12.0352 86.874 12.0352C85.9835 12.0352 85.1865 12.2344 84.4835 12.6328C83.7862 13.0254 83.2353 13.5645 82.831 14.25C82.4268 14.9298 82.2245 15.706 82.2245 16.579C82.2245 17.4638 82.4355 18.255 82.8575 18.9523C83.2792 19.6435 83.8622 20.1885 84.6065 20.587C85.3505 20.9795 86.209 21.1758 87.1817 21.1758C87.791 21.1758 88.4268 21.0763 89.0888 20.877C89.7568 20.6778 90.4308 20.3115 91.1103 19.7783L89.581 17.9503C89.253 18.2608 88.8867 18.5155 88.4825 18.7148C88.084 18.9083 87.58 19.005 86.9707 19.005C86.4022 19.005 85.9043 18.8525 85.4765 18.5478ZM88.7067 15.5C88.5667 15.1888 88.366 14.9243 88.1045 14.707C87.7238 14.3906 87.2665 14.2324 86.7335 14.2324C86.1942 14.2324 85.7255 14.3936 85.3272 14.7158C85.06 14.9353 84.8552 15.1965 84.713 15.5H88.7067Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2_3119">
<rect width="91.5" height="25" fill="white" transform="translate(0 1.5)"/>
</clipPath>
</defs>
</svg>
`;

// URL encode the Airbyte logo for CSS
const encodedAirbyteLogo = encodeURIComponent(AIRBYTE_LOGO_SVG);

// CSS styles for the widget
const WIDGET_STYLES = `
.airbyte-widget-dialog-wrapper {
  padding: 0;
  border: none;
  background: transparent;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  margin: auto;
}

.airbyte-widget-dialog-container {
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}
  
.airbyte-widget-dialog-content {
  width: 500px;
  height: 722px;
  border-radius: 10px;  
  background: none;
  overflow: hidden;
  max-width: 100vw;
  max-height: calc(100vh - 60px);
}

.airbyte-widget-dialog-branding {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/svg+xml;charset=utf-8,${encodedAirbyteLogo}");
  background-repeat: no-repeat;
  background-position: center;
}

@media (max-height: 782px) {
  .airbyte-widget-dialog-branding {
    display: none;
  }
  .airbyte-widget-dialog-content {
    max-height: 100vh;
  }
}

.airbyte-widget-dialog-wrapper::backdrop {
  background-color: hsl(241, 51%, 20%);
  opacity: 0.6;
}
`;

export class AirbyteEmbeddedWidget {
  private decodedToken: EmbeddedToken;
  private dialog: HTMLDialogElement = document.createElement("dialog");
  private iframe: HTMLIFrameElement = document.createElement("iframe");
  private onEvent?: (event: WidgetEvent) => void;

  constructor(config: EmbeddedWidgetConfig) {
    if (!config.token) {
      throw new Error("Token is required to initialize AirbyteEmbeddedWidget");
    }

    this.onEvent = config.onEvent;
    this.decodedToken = this.decodeToken(config.token);

    this.initialize();
  }

  private decodeToken(token: string): EmbeddedToken {
    try {
      // Decode base64
      // Make sure the base64 string is properly padded
      const padded = token.padEnd(token.length + ((4 - (token.length % 4)) % 4), "=");
      // Replace URL-safe characters
      const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");

      let decoded;
      try {
        decoded = atob(base64);
      } catch (error) {
        console.debug("Error decoding base64 string:", error);
        throw new Error("Invalid token format: could not decode base64");
      }

      // Parse JSON
      const parsed = JSON.parse(decoded);
      if (!parsed.widgetUrl) {
        throw new Error("Invalid token: missing widgetUrl");
      }
      return parsed;
    } catch (error: any) {
      throw new Error(`Failed to decode token: ${error.message || "Unknown error"}`);
    }
  }

  private initialize(): void {
    this.setupStyles();
    this.createDialogStructure();
    this.setupIframe();

    // Add dialog to document
    document.body.appendChild(this.dialog);
  }

  private setupStyles(): void {
    // Add styles
    const style = document.createElement("style");
    style.textContent = WIDGET_STYLES;
    document.head.appendChild(style);
  }

  private createDialogStructure(): void {
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
  }

  private setupIframe(): void {
    // Get the dialog content area
    const dialogContent = this.dialog.querySelector(".airbyte-widget-dialog-content");
    if (!dialogContent) return;

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
        console.debug("Error initializing widget. Please check your token configuration.");
      }
    } else {
      console.debug("Error: Missing widget URL. Please check your token configuration.");
    }
  }

  public updateToken(token: string): void {
    if (!token) {
      throw new Error("Token is required");
    }

    this.decodedToken = this.decodeToken(token);

    // Only proceed if we have a valid widget URL (should always be true after decodeToken validation)
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
   * Clean up resources used by the widget
   * Call this when the widget is no longer needed
   */
  public destroy(): void {
    // Remove the dialog from the DOM
    if (this.dialog.parentElement) {
      this.dialog.parentElement.removeChild(this.dialog);
    }

    // Remove event listeners
    window.removeEventListener("message", this.handleMessage);
  }

  // Bound message handler to allow for removal
  private handleMessage = (event: MessageEvent): void => {
    if (!this.decodedToken.widgetUrl) return;

    try {
      const iframeOrigin = new URL(this.decodedToken.widgetUrl).origin;

      // Skip if not from our iframe
      if (!this.isFromOurIframe(event, iframeOrigin)) {
        return;
      }

      this.processMessage(event, iframeOrigin);
    } catch (error) {
      console.error("Error handling message event:", error);
    }
  };

  // Check if the message is from our iframe
  private isFromOurIframe(event: MessageEvent, iframeOrigin: string): boolean {
    // Ensure the message is coming from the iframe we created
    const isFromIframe = event.origin === iframeOrigin || event.source === this.iframe.contentWindow;
    if (!isFromIframe) {
      return false;
    }

    // Skip if the message is from ourselves (localhost)
    if (event.origin === window.location.origin && event.source === window) {
      return false;
    }

    return true;
  }

  // Process the message content
  private processMessage(event: MessageEvent, iframeOrigin: string): void {
    // Handle auth token request
    if (event.data === "auth_token_request") {
      this.sendAuthToken(iframeOrigin);
      return;
    }

    // Handle close dialog message
    if (event.data && event.data === "CLOSE_DIALOG") {
      this.dialog.close();
      return;
    }

    // Handle custom events
    this.handleCustomEvent(event.data);
  }

  // Send auth token to iframe
  private sendAuthToken(iframeOrigin: string): void {
    const message = { scopedAuthToken: this.decodedToken.token };
    try {
      this.iframe.contentWindow?.postMessage(message, iframeOrigin);
    } catch (error) {
      console.debug("Error posting message to iframe:", error);
    }
  }

  // Handle custom event if it matches our expected format
  private handleCustomEvent(data: any): void {
    if (!this.onEvent || !data || typeof data !== "object" || !data.type) {
      return;
    }

    this.onEvent(data as WidgetEvent);
  }
}
