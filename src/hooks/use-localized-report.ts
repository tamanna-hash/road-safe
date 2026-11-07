import { useLanguage } from "@/lib/i18n/language-context";
import type { Report } from "@/types";

/**
 * Returns display-ready localized strings for a report based on the active language.
 *
 * Falls back to English when a Bangla translation is not available
 * (e.g. user-submitted reports that haven't been translated).
 */
export interface LocalizedReport {
  title: string;
  description: string;
  address: string | undefined;
  adminNote: string | undefined;
}

export function useLocalizedReport(report: Report): LocalizedReport {
  const { lang } = useLanguage();
  const bn = lang === "bn";

  return {
    title:       (bn && report.title_bn)       ? report.title_bn       : report.title,
    description: (bn && report.description_bn) ? report.description_bn : report.description,
    address:     (bn && report.location.address_bn)
                   ? report.location.address_bn
                   : report.location.address,
    adminNote:   (bn && report.adminNote_bn)   ? report.adminNote_bn   : report.adminNote,
  };
}
