
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import Home from '@/pages/Home';
import AgentsList from '@/pages/AgentsList';
import TaskDetail from '@/pages/TaskDetail';
import AgentChat from '@/pages/AgentChat';
import TaskAssignment from '@/pages/TaskAssignment';
import NotFound from '@/pages/NotFound';
import ActiveTasks from '@/pages/ActiveTasks';
import TaskHistory from '@/pages/TaskHistory';
import Settings from '@/pages/Settings';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agents" element={<AgentsList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/agent/:id/chat" element={<AgentChat />} />
            <Route path="/agent/:id/task" element={<TaskAssignment />} />
            <Route path="/tasks/active" element={<ActiveTasks />} />
            <Route path="/tasks/history" element={<TaskHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
