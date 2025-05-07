import { EmbeddedWidget } from "./EmbeddedWidget";

// Export for ES modules and CommonJS
export { EmbeddedWidget };

// Export for IIFE/UMD bundles
export default EmbeddedWidget;

// Also assign to window for direct script tag usage
if (typeof window !== "undefined") {
  (window as any).AirbyteEmbeddedWidget = EmbeddedWidget;
}
