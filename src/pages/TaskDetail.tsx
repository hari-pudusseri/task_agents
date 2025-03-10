
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tasks } from '@/data/agents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime, getPriorityDetails, getStatusDetails } from '@/lib/utils';
import { AgentAvatar } from '@/components/ui-custom/agent-avatar';
import { ProgressUpdate, TaskStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Clock, MessageSquare, Calendar, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the task by ID
  const task = tasks.find(t => t.id === Number(id));
  
  if (!task) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Task not found</h1>
        </div>
      </div>
    );
  }
  
  const statusDetails = getStatusDetails(task.status);
  const priorityDetails = getPriorityDetails(task.priority);
  
  const handleCancelTask = () => {
    // In a real app, you would send this to an API
    toast({
      title: "Task cancelled",
      description: `Task "${task.title}" has been cancelled`
    });
    
    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Task Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="p-6 pb-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle className="mb-1">{task.title}</CardTitle>
                  <div className="flex space-x-2 mb-3">
                    <Badge className={`${statusDetails.bgColor} ${statusDetails.color}`}>
                      {statusDetails.label}
                    </Badge>
                    <Badge className={priorityDetails.color}>
                      {priorityDetails.label} Priority
                    </Badge>
                  </div>
                </div>
                
                {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.CANCELLED && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel Task
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel this task?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The task will be marked as cancelled and the agent will stop working on it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Task</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleCancelTask}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Cancel Task
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              
              <div className="flex items-center mb-3">
                <AgentAvatar agent={task.agent} className="mr-2" />
                <div className="text-sm">
                  <div>Assigned to <span className="font-medium">{task.agent.name}</span></div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Assigned: {formatDateTime(task.assignedAt)}</span>
                </div>
                
                {task.dueDate && (
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Due: {formatDateTime(task.dueDate)}</span>
                  </div>
                )}
                
                {task.scheduledFor && (
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Scheduled: {formatDateTime(task.scheduledFor)}</span>
                  </div>
                )}
                
                {task.completedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Completed: {formatDateTime(task.completedAt)}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-6 pt-3">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground mb-6">{task.description}</p>
              
              {task.status !== TaskStatus.SCHEDULED && (
                <>
                  <h3 className="font-medium mb-2">Progress</h3>
                  {task.status !== TaskStatus.COMPLETED ? (
                    <div className="mb-6">
                      <div className="progress-indicator mb-2">
                        <div 
                          className="progress-indicator-value" 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-right text-muted-foreground">
                        {task.progress}% complete
                      </div>
                    </div>
                  ) : (
                    <div className="progress-indicator mb-6">
                      <div className="progress-indicator-value" style={{ width: '100%' }}></div>
                    </div>
                  )}
                </>
              )}
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => navigate(`/agent/${task.agent.id}/chat`)}
                  className="ml-auto"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat with Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-[600px]">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg">Progress Timeline</CardTitle>
            </CardHeader>
            
            <ScrollArea className="h-[calc(100%-56px)]">
              <CardContent className="p-4">
                {task.progressUpdates.length > 0 ? (
                  <div className="space-y-4">
                    {task.progressUpdates.map((update: ProgressUpdate) => (
                      <div key={update.id} className="border-l-2 pl-4 pb-4 relative">
                        <div 
                          className={`w-3 h-3 rounded-full absolute -left-[7px] top-0 ${
                            update.status === 'completed' 
                              ? 'bg-green-500'
                              : update.status === 'blocked'
                              ? 'bg-red-500'
                              : update.status === 'in-progress'
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                        <h4 className="font-medium text-sm">{update.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {update.description}
                        </p>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDateTime(update.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No progress updates available.
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
