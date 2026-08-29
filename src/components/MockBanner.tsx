// Required labeling per docs/EPFO_Hackathon_Build_Plan.md section 3.3
// and the hackathon FAQ's rule against implying official endorsement.
import { getT } from "@/i18n/server";

export default function MockBanner() {
  const t = getT();
  return (
    <div className="w-full bg-amber-100 border-b border-amber-300 text-amber-900 text-xs sm:text-sm px-4 py-2 text-center">
      {t("banner.disclaimer")}
    </div>
  );
}
