
import { PageHeader } from "@/components/layout/page-header";

export default function TaskHistory() {
  return (
    <>
      <PageHeader
        title="Task History"
        description="Review all completed and canceled tasks"
      />
      
      <div className="py-8">
        <div className="bg-card border rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No task history found</h3>
          <p className="text-muted-foreground">
            Your completed and canceled tasks will appear here
          </p>
        </div>
      </div>
    </>
  );
}
