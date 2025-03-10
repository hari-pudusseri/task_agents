import { PageHeader } from "@/components/layout/page-header";
import { TaskList } from "@/components/task-list";
import { getUserCompletedTasks } from "@/data/agents";

export default function TaskHistory() {
  const completedTasks = getUserCompletedTasks();

  return (
    <>
      <PageHeader
        title="Task History"
        description="Review all completed and canceled tasks"
      />
      
      <div className="py-8">
        {completedTasks.length > 0 ? (
          <TaskList tasks={completedTasks} title="Completed Tasks" />
        ) : (
          <div className="bg-card border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No task history found</h3>
            <p className="text-muted-foreground">
              Your completed and canceled tasks will appear here
            </p>
          </div>
        )}
      </div>
    </>
  );
}
