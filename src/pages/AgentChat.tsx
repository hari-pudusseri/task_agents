
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { agents, tasks } from '@/data/agents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDateTime } from '@/lib/utils';
import { AgentAvatar } from '@/components/ui-custom/agent-avatar';
import { Message, ProgressUpdate, Task, TaskStatus } from '@/lib/types';
import { Avatar } from '@/components/ui/avatar';
import { Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AgentChat() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  
  // Find the agent by ID
  const agent = agents.find(a => a.id === Number(id));
  
  // Find all tasks for this agent
  const agentTasks = tasks.filter(t => 
    t.agent.id === Number(id) && 
    t.status !== TaskStatus.COMPLETED && 
    t.status !== TaskStatus.CANCELLED
  );
  
  // Use the first active task if not already set
  React.useEffect(() => {
    if (!activeTask && agentTasks.length > 0) {
      setActiveTask(agentTasks[0]);
    }
  }, [agentTasks]);
  
  if (!agent) {
    return <div className="container mx-auto py-6 px-4">Agent not found</div>;
  }
  
  const handleSendMessage = () => {
    if (!message.trim() || !activeTask) return;
    
    // In a real app, you would send this to an API
    toast({
      title: "Message sent",
      description: "Your message has been sent to the agent",
    });
    
    // Reset the message input
    setMessage('');
  };
  
  const handleSelectTask = (task: Task) => {
    setActiveTask(task);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <Card className="h-[calc(100vh-160px)]">
            <CardHeader className="p-4 border-b">
              <div className="flex items-center">
                <AgentAvatar agent={agent} className="mr-3" />
                <div>
                  <CardTitle>{agent.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {activeTask ? `Working on: ${activeTask.title}` : 'No active task'}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <div className="flex flex-col h-[calc(100%-140px)]">
              <ScrollArea className="flex-1 p-4">
                {activeTask && activeTask.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {msg.sender === 'agent' ? (
                          <AgentAvatar agent={agent} size="sm" className="mr-2" />
                        ) : (
                          <Avatar className="h-6 w-6 mr-2">
                            <User className="h-4 w-4" />
                          </Avatar>
                        )}
                        <span className="text-xs font-medium">
                          {msg.sender === 'agent' ? agent.name : 'You'}
                        </span>
                      </div>
                      <div>{msg.content}</div>
                      <div className="text-xs mt-1 text-right opacity-70">
                        {formatDateTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!activeTask || activeTask.messages.length === 0) && (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No messages yet. Start the conversation with {agent.name}.
                  </div>
                )}
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder={`Message ${agent.name}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    disabled={!activeTask}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!message.trim() || !activeTask}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:w-1/3">
          <Card className="h-[calc(100vh-160px)]">
            <CardHeader className="p-4 border-b">
              <CardTitle>Progress Updates</CardTitle>
            </CardHeader>
            
            <ScrollArea className="h-[calc(100%-76px)] p-4">
              {activeTask ? (
                <>
                  {activeTask.progressUpdates.length > 0 ? (
                    <div className="space-y-4">
                      {activeTask.progressUpdates.map((update: ProgressUpdate) => (
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
                      No progress updates yet.
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Select a task to view progress.
                </div>
              )}
            </ScrollArea>
          </Card>
          
          {agentTasks.length > 1 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Your Tasks with {agent.name}</h3>
              <div className="space-y-2">
                {agentTasks.map(task => (
                  <Button
                    key={task.id}
                    variant={activeTask?.id === task.id ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => handleSelectTask(task)}
                  >
                    {task.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
