import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <div className="flex min-h-full flex-1 flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
