"use client";

import { useEffect, useRef, useState } from "react";

import { EmbeddedWidget, WidgetEvent } from "@/src/EmbeddedWidget";
import styles from "../page.module.css";

// Debug logging to check if EmbeddedWidget is available
console.log("EmbeddedWidget imported:", Boolean(EmbeddedWidget));

interface EmbeddedWidgetComponentProps {
  onEvent?: (event: WidgetEvent) => void;
  className?: string;
}

export function EmbeddedWidgetComponent({ onEvent, className }: EmbeddedWidgetComponentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<EmbeddedWidget | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeWidget = async () => {
      if (!containerRef.current || initialized) {
        return;
      }

      try {
        const response = await fetch("/api/widget_token");
        const data = await response.json();

        // Check if component is still mounted after async operations
        if (!isMounted) {
          return;
        }

        console.log("Token response:", data);

        if (!data.token) {
          console.error("Token response:", data);
          throw new Error("Missing token in response");
        }

        // Check again if containerRef is still valid and component still mounted
        if (!containerRef.current || !isMounted) {
          return;
        }

        try {
          widgetRef.current = new EmbeddedWidget({
            token: data.token,
            onEvent: (event: WidgetEvent) => {
              if (onEvent) {
                onEvent(event);
              }
              fetch("/api/embedded_response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(event),
              }).catch((err) => console.error("Error sending event data:", err));
            },
          });

          // Mount the widget to the container element
          widgetRef.current.mount(containerRef.current);

          if (isMounted) {
            setInitialized(true);
            setLoading(false);
          }
        } catch (widgetError) {
          throw widgetError;
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      }
    };

    // Reset initialized state on each mount to handle StrictMode remounting
    setInitialized(false);

    // Execute initialization
    initializeWidget();

    return () => {
      isMounted = false;
    };
  }, [onEvent]);

  return (
    <div className={styles.widgetComponentWrapper}>
      {loading && <div className={styles.loading}>Loading widget...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      <div ref={containerRef} className={`${styles.widgetMount} ${className || ""}`} />
    </div>
  );
}
