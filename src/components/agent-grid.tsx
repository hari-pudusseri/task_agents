
import React from 'react';
import { Agent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui-custom/star-rating';
import { MessageSquare, CalendarPlus } from 'lucide-react';
import { SkillBadge } from '@/components/ui-custom/skill-badge';
import { getAgentStatusDetails } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface AgentGridProps {
  agents: Agent[];
  title: string;
}

export function AgentGrid({ agents, title }: AgentGridProps) {
  if (agents.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No agents found.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => {
          const statusDetails = getAgentStatusDetails(agent.status);
          
          return (
            <Card key={agent.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-background"
                    style={{ backgroundImage: `url(${agent.avatar})` }}
                  ></div>
                  <Badge 
                    className={`${statusDetails.bgColor} ${statusDetails.color}`}
                  >
                    {statusDetails.label}
                  </Badge>
                </div>
                
                <h3 className="font-medium mb-1">{agent.name}</h3>
                
                <div className="flex items-center mb-2">
                  <StarRating rating={agent.rating} />
                  <span className="text-xs text-muted-foreground ml-2">
                    ({agent.community.usage} uses)
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {agent.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {agent.skills.slice(0, 3).map((skill) => (
                    <SkillBadge key={skill.id} name={skill.name} />
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground mb-4">
                  {agent.tasksCompleted} tasks completed
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Link to={`/agent/${agent.id}/chat`}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Link to={`/agent/${agent.id}/task`}>
                      <CalendarPlus className="h-4 w-4 mr-1" />
                      Assign
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
