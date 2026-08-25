import { Activity } from "@/types/member";
import { Clock } from "lucide-react";

export default function RecentActivity({ activities }: { activities?: Activity[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg bg-white p-6 h-full">
        <h3 className="font-semibold text-slate-900 mb-4">Recent activity</h3>
        <div className="flex flex-col items-center justify-center text-center py-8 text-slate-500">
          <Clock className="h-8 w-8 mb-3 text-slate-300" />
          <p className="text-sm">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg bg-white p-6 h-full flex flex-col">
      <h3 className="font-semibold text-slate-900 mb-6">Recent activity</h3>
      <div className="relative border-l border-slate-200 ml-3 space-y-6 flex-1">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-6">
            <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-brand-500 ring-4 ring-white" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 mb-1">{activity.date}</span>
              <span className="text-sm font-medium text-slate-900">{activity.title}</span>
              {activity.description && (
                <p className="text-xs text-slate-600 mt-1">{activity.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
