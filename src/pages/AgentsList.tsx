
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/search-input";
import { AgentCard } from "@/components/agent-card";
import { agents, skills } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { SkillBadge } from "@/components/ui-custom/skill-badge";
import { Skill } from "@/lib/types";

export default function AgentsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  
  const filteredAgents = agents.filter(agent => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
    // Filter by selected skills
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skillId => agent.skills.some(skill => skill.id === skillId));
      
    return matchesSearch && matchesSkills;
  });
  
  const toggleSkill = (skill: Skill) => {
    if (selectedSkills.includes(skill.id)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill.id]);
    }
  };

  return (
    <>
      <PageHeader
        title="AI Agents"
        description="Browse and discover AI agents specialized in various tasks"
      />
      
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput 
            onSearch={setSearchQuery}
            placeholder="Search agents..."
            className="w-full sm:max-w-md"
          />
          
          <div className="flex-1 flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-thin">
            {skills.slice(0, 8).map((skill) => (
              <Button
                key={skill.id}
                variant={selectedSkills.includes(skill.id) ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => toggleSkill(skill)}
              >
                <SkillBadge 
                  name={skill.name}
                  variant={selectedSkills.includes(skill.id) ? "default" : "secondary"}
                />
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-12 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedSkills([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
