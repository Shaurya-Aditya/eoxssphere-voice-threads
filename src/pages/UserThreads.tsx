
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface Thread {
  id: string;
  userId: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const UserThreads = () => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<Thread[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" onClick={() => navigate('/admin-chat')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Chat
          </Button>
          <h1 className="ml-4 text-xl font-semibold text-purple-600">User Threads</h1>
        </div>
      </nav>

      <div className="container mx-auto py-6">
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="grid gap-4">
            {threads.map(thread => (
              <div
                key={thread.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/admin-chat?thread=${thread.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{thread.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{thread.lastMessage}</p>
                  </div>
                  <MessageSquare className="text-purple-500 h-5 w-5" />
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(thread.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserThreads;
