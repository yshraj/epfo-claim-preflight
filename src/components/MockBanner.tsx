// Required labeling per docs/EPFO_Hackathon_Build_Plan.md section 3.3
// and the hackathon FAQ's rule against implying official endorsement.
export default function MockBanner() {
  return (
    <div className="w-full bg-amber-100 border-b border-amber-300 text-amber-900 text-xs sm:text-sm px-4 py-2 text-center">
      Independent hackathon prototype — not affiliated with or endorsed by EPFO.
      All data on this site is simulated.
    </div>
  );
}
