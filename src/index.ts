import { AirbyteEmbeddedWidget } from "./EmbeddedWidget";

// Export for ES modules and CommonJS
export { AirbyteEmbeddedWidget };

// Export for IIFE/UMD bundles
export default AirbyteEmbeddedWidget;

// Also assign to window for direct script tag usage
if (typeof window !== "undefined") {
  (window as any).AirbyteEmbeddedWidget = AirbyteEmbeddedWidget;
}

export type { EmbeddedWidgetConfig, WidgetEvent } from "./EmbeddedWidget";
