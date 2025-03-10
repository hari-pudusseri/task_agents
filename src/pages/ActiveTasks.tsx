
import { PageHeader } from "@/components/layout/page-header";

export default function ActiveTasks() {
  return (
    <>
      <PageHeader
        title="Active Tasks"
        description="Monitor and manage your agents' current tasks"
      />
      
      <div className="py-8">
        <div className="bg-card border rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No active tasks found</h3>
          <p className="text-muted-foreground">
            When you assign tasks to your agents, they will appear here
          </p>
        </div>
      </div>
    </>
  );
}
