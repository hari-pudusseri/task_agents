
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { agents } from '@/data/agents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentAvatar } from '@/components/ui-custom/agent-avatar';
import { SkillBadge } from '@/components/ui-custom/skill-badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function TaskAssignment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [description, setDescription] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Find the agent by ID
  const agent = agents.find(a => a.id === Number(id));
  
  if (!agent) {
    return <div className="container mx-auto py-6 px-4">Agent not found</div>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a task description",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this to an API
    toast({
      title: "Task assigned",
      description: `Task has been assigned to ${agent.name}${isScheduled ? ' and scheduled' : ''}`
    });
    
    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="p-6">
            <div className="flex items-center mb-4">
              <AgentAvatar agent={agent} className="mr-3" />
              <div>
                <CardTitle>Assign Task to {agent.name}</CardTitle>
                <CardDescription>
                  Specialized in: {agent.skills.map(s => s.name).join(', ')}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {agent.skills.map((skill) => (
                <SkillBadge key={skill.id} name={skill.name} />
              ))}
            </div>
            
            <CardDescription className="mt-2">
              {agent.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="description" className="mb-2 block">
                  Task Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the task you want to assign..."
                  className="min-h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="flex items-center mb-6">
                <Switch
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                  className="mr-2"
                />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>
              
              {isScheduled && (
                <div className="mb-6">
                  <Label className="mb-2 block">Schedule Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isScheduled ? 'Schedule Task' : 'Assign Task'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
