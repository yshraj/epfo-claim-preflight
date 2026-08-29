import { AlertCircle } from "lucide-react";
import { getT } from "@/i18n/server";

export default function PrototypeDisclaimer() {
  const t = getT();

  return (
    <div className="bg-slate-900 text-slate-100 py-3 px-6 text-sm flex justify-center border-b border-slate-800">
      <div className="max-w-6xl w-full flex items-start sm:items-center gap-3">
        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="leading-snug">
          <span className="font-semibold text-amber-400">{t("marketing.disclaimer.label")}</span>{" "}
          {t("marketing.disclaimer.body")}
        </p>
      </div>
    </div>
  );
}
