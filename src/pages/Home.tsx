import React, { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { TaskList } from '@/components/task-list';
import { AgentGrid } from '@/components/agent-grid';
import { 
  getTopRatedAgents, 
  getMostUsedAgents, 
  getUserActiveTasks,
  getUserCompletedTasks,
  searchAgents,
  searchTasks
} from '@/data/agents';
import { SectionHeading } from '@/components/ui-custom/section-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTab, setSearchTab] = useState('agents');
  
  const activeTasks = getUserActiveTasks();
  const topAgents = getTopRatedAgents();
  const popularAgents = getMostUsedAgents();
  
  const filteredAgents = searchQuery ? searchAgents(searchQuery) : [];
  const filteredTasks = searchQuery ? searchTasks(searchQuery) : [];
  
  const favoriteAgents = topAgents.filter(agent => 
    localStorage.getItem('favoriteAgents') && 
    JSON.parse(localStorage.getItem('favoriteAgents') || '[]').includes(agent.id)
  );
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <SearchInput 
          placeholder="Search agents or tasks..."
          onSearch={handleSearch}
        />
        
        {searchQuery && (
          <Tabs
            value={searchTab}
            onValueChange={setSearchTab}
            className="mt-4"
          >
            <TabsList>
              <TabsTrigger value="agents">
                Agents ({filteredAgents.length})
              </TabsTrigger>
              <TabsTrigger value="tasks">
                Tasks ({filteredTasks.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="agents">
              <AgentGrid 
                agents={filteredAgents} 
                title="Search Results"
              />
            </TabsContent>
            <TabsContent value="tasks">
              <TaskList 
                tasks={filteredTasks} 
                title="Search Results"
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
      
      {!searchQuery && (
        <>
          <SectionHeading 
            title="Your Active Tasks" 
            description="Track and manage your ongoing AI agent tasks"
          />
          <TaskList tasks={activeTasks} title="Active Tasks" />
          
          <SectionHeading 
            title="Your Favorite Agents" 
            description="Your personally curated collection of AI agents"
          />
          <AgentGrid 
            agents={favoriteAgents} 
            title="Favorite Agents" 
            showFavorites={true} 
          />
          
          <SectionHeading 
            title="Popular Agents" 
            description="Most frequently used AI agents in the community"
          />
          <AgentGrid agents={popularAgents} title="Popular Agents" />
        </>
      )}
    </div>
  );
}
