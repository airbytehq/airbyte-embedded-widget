"use client";

import { EmbeddedWidgetComponent } from "./components/EmbeddedWidgetComponent";

export default function Home() {
  const handleWidgetEvent = (event: any) => {
    console.log("Widget event handled in Home component:", event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 flex flex-col">
      <header className="w-full py-10 shadow-md mb-12 border-b border-indigo-100">
        <div className="max-w-2xl mx-auto flex flex-col items-center px-6">
          <h1 className="text-5xl font-black text-indigo-700 tracking-tight drop-shadow-sm mb-2 text-center">
            Airbyte Embedded Widget
          </h1>
          <p className="text-lg text-indigo-400 font-medium text-center">
            A beautiful developer playground for your widget
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-2 pb-12">
        <div className=" p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center mb-12 border border-indigo-100 transition-all duration-300">
          <p className="text-base opacity-90 mb-8 text-gray-700">
            Click the button below to open the Airbyte widget.
          </p>
          <div className="flex justify-center mt-2">
            <EmbeddedWidgetComponent onEvent={handleWidgetEvent} />
          </div>
        </div>

        <div className="w-full max-w-lg border border-indigo-100 p-8 rounded-2xl bg-white/90 shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-indigo-400 rounded-full animate-pulse" />
            Environment Variables
          </h2>
          <div className="space-y-3 mb-4">
            <EnvVar
              label="NEXT_PUBLIC_WORKSPACE_ID"
              value={process.env.NEXT_PUBLIC_WORKSPACE_ID}
            />
            <EnvVar label="NEXT_PUBLIC_CLIENT_ID" value={process.env.NEXT_PUBLIC_CLIENT_ID} />
            <EnvVar
              label="NEXT_PUBLIC_CLIENT_SECRET"
              value={process.env.NEXT_PUBLIC_CLIENT_SECRET ? "******" : "Not set"}
            />
            <EnvVar label="NEXT_PUBLIC_BASE_URL" value={process.env.NEXT_PUBLIC_BASE_URL} />
          </div>
          <p className="mt-3 text-xs text-gray-500 text-left">
            <span className="font-semibold text-indigo-500">Note:</span> Environment variables must be prefixed with{" "}
            <code className="bg-indigo-50 px-1 rounded text-indigo-700">NEXT_PUBLIC_</code> to be visible on the client side.
          </p>
        </div>
      </main>
    </div>
  );
}

function EnvVar({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="flex items-center justify-between bg-indigo-50/80 px-4 py-2 rounded-lg text-base border border-indigo-100">
      <span className="font-semibold text-indigo-800 tracking-wide">{label}:</span>
      <span className="ml-3 text-gray-700 font-mono break-all">{value || "Not set"}</span>
    </div>
  );
}
