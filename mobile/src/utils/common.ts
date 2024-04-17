import type { periodType } from "@ucr-template/db-client/schema";

export const toSpanishPeriod = (
  period: (typeof periodType.enumValues)[number] | null
) => {
  if (period === "first") {
    return "Ciclo I";
  }
  if (period === "second") {
    return "Ciclo II";
  }

  if (period === "summer") {
    return "Verano";
  }

  return "";
};
