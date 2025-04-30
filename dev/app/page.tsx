"use client";

import { EmbeddedWidgetComponent } from "./components/EmbeddedWidgetComponent";
import styles from "./page.module.css";

export default function Home() {
  const handleWidgetEvent = (event: any) => {
    console.log("Widget event handled in Home component:", event);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Airbyte Embedded Widget</h1>
      </header>

      <div className={styles.widgetContainer}>
        <p className={styles.note}>The widget button will appear below after loading.</p>
        <div className={styles.buttonContainer}>
          <EmbeddedWidgetComponent onEvent={handleWidgetEvent} />
        </div>
      </div>

      <div className={styles.envContainer}>
        <h2 className={styles.headingSmall}>Environment Variables:</h2>
        <EnvVar label="NEXT_PUBLIC_WORKSPACE_ID" value={process.env.NEXT_PUBLIC_WORKSPACE_ID} />
        <EnvVar label="NEXT_PUBLIC_CLIENT_ID" value={process.env.NEXT_PUBLIC_CLIENT_ID} />
        <EnvVar
          label="NEXT_PUBLIC_CLIENT_SECRET"
          value={process.env.NEXT_PUBLIC_CLIENT_SECRET ? "******" : "Not set"}
        />
        <EnvVar label="NEXT_PUBLIC_BASE_URL" value={process.env.NEXT_PUBLIC_BASE_URL} />
        <p className={styles.envNote}>
          Note: Environment variables must be prefixed with <code>NEXT_PUBLIC_</code> to be visible on the client side.
        </p>
      </div>
    </div>
  );
}

function EnvVar({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div>
      <b>{label}:</b> {value || "Not set"}
    </div>
  );
}
