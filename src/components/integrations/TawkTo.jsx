// /**
//  * Tawk.to live chat widget.
//  *
//  * Renders nothing unless:
//  *   - settings are loaded successfully (not loading, not errored)
//  *   - settings.tawk_to_status is truthy
//  *   - both settings.tawk_to_property_id and settings.tawk_to_widget_id are present
//  *
//  * Mount this once near the root (inside ReduxStoreProvider so useBasicSettings
//  * has access to the RTK Query cache). Calling useBasicSettings() here piggybacks
//  * on the existing cached query — no extra network request.
//  *
//  * The `key` is derived from the property + widget IDs so React cleanly remounts
//  * the script if either id changes at runtime (e.g. admin updates settings).
//  */

"use client";
import useBasicSettings from "@/hooks/useBasicSettings";
import Script from "next/script";

export function TawkTo() {
  const { settings, isLoading, isError } = useBasicSettings();

  if (isLoading || isError || !settings) return null;
  if (!settings.tawk_to_status) return null;

  const propertyId = settings.tawk_to_property_id;
  const widgetId = settings.tawk_to_widget_id;
  if (!propertyId || !widgetId) return null;

  const scriptId = `tawk-to-${propertyId}-${widgetId}`;

  return (
    <>
      <Script id={`${scriptId}-init`} strategy="afterInteractive">
        {`window.Tawk_API = window.Tawk_API || {}; window.Tawk_LoadStart = new Date();`}
      </Script>
      <Script
        key={scriptId}
        id={scriptId}
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onError={() => {
          // Likely blocked by an ad blocker — fail silently.
        }}
      />
    </>
  );
}
