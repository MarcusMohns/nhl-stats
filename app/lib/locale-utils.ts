import { headers } from "next/headers";

// Get the user's locale from the Accept-Language header
// Falls back to 'en-US' if no header is present

export async function getLocaleFromHeaders(): Promise<string> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (!acceptLanguage) {
    return "en-US";
  }
  console.log(acceptLanguage);

  // Parse the Accept-Language header
  // Format: "en-US,en;q=0.9,fr;q=0.8"
  // Extract the primary locale (highest priority)
  const locales = acceptLanguage
    .split(",")
    .map((locale) => locale.split(";")[0].trim())
    .filter((locale) => locale.length > 0);

  return locales[0] || "en-US";
}

export function normalizeLocale(locale: string): string {
  // Handle simple cases like "en" -> "en-US"
  if (locale.length === 2) {
    const mapping: Record<string, string> = {
      en: "en-US",
      fr: "fr-CA",
      es: "es-MX",
      de: "de-DE",
      it: "it-IT",
      pt: "pt-BR",
    };
    return mapping[locale] || `${locale}-${locale.toUpperCase()}`;
  }

  // Already in format like "en-US"
  return locale;
}
