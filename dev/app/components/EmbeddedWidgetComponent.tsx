"use client";

import { useEffect, useRef, useState } from "react";
import { AirbyteEmbeddedWidget, WidgetEvent } from "@/src/EmbeddedWidget";

interface EmbeddedWidgetComponentProps {
  onEvent?: (event: WidgetEvent) => void;
  className?: string;
}

export function EmbeddedWidgetComponent({ onEvent, className }: EmbeddedWidgetComponentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const widgetRef = useRef<AirbyteEmbeddedWidget | null>(null);

  useEffect(() => {
    let isMounted = true;
    const initializeWidget = async () => {
      if (initialized) return;
      try {
        const response = await fetch("/api/widget_token");
        const data = await response.json();
        if (!isMounted) return;
        if (!data.token) throw new Error("Missing token in response");
        try {
          widgetRef.current = new AirbyteEmbeddedWidget({
            token: data.token,
            onEvent: (event: WidgetEvent) => {
              onEvent?.(event);
              fetch("/api/embedded_response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(event),
              }).catch((err) => console.error("Error sending event data:", err));
            },
          });
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
    setInitialized(false);
    initializeWidget();
    return () => {
      isMounted = false;
    };
  }, [onEvent]);

  const handleOpenWidget = () => {
    widgetRef.current?.open();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {loading && <div className="text-gray-600 text-base">Loading widget...</div>}
      {error && <div className="text-red-600 text-base p-4 bg-red-100 rounded border border-red-200">Error: {error}</div>}
      {initialized && (
        <button
          onClick={handleOpenWidget}
          className={`px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-200 ${className || ""}`}
        >
          Open Airbyte
        </button>
      )}
    </div>
  );
}
