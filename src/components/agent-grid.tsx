import React, { useState, useEffect } from 'react';
import { Agent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui-custom/star-rating';
import { MessageSquare, CalendarPlus } from 'lucide-react';
import { SkillBadge } from '@/components/ui-custom/skill-badge';
import { getAgentStatusDetails } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { AgentCard } from '@/components/agent-card';

interface AgentGridProps {
  agents: Agent[];
  title: string;
  showFavorites?: boolean;
}

export function AgentGrid({ agents, title, showFavorites = false }: AgentGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteAgents');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const handleToggleFavorite = (agentId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(agentId)) {
        newFavorites.delete(agentId);
      } else {
        newFavorites.add(agentId);
      }
      // Save to localStorage
      localStorage.setItem('favoriteAgents', JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  if (agents.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            {showFavorites ? "No favorite agents yet." : "No agents found."}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isFavorite={showFavorites || favorites.has(agent.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
