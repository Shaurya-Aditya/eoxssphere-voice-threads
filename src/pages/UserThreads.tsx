
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, User } from 'lucide-react';
import APIKeyConfig from '@/components/APIKeyConfig';

interface Thread {
  id: string;
  userId: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface UserData {
  id: string;
  name: string;
  threads: Thread[];
}

const UserThreads = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users] = useState<UserData[]>([
    {
      id: '1',
      name: 'John Doe',
      threads: [
        {
          id: '1',
          userId: '1',
          title: 'Support Question',
          lastMessage: 'How can I help you today?',
          timestamp: new Date()
        }
      ]
    }
    // Add more mock users here
  ]);

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
        <APIKeyConfig />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Users List */}
          <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Users
            </h2>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-2">
                {users.map(user => (
                  <Button
                    key={user.id}
                    variant={selectedUser === user.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedUser(user.id)}
                  >
                    {user.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Threads List */}
          <div className="md:col-span-9 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Threads
            </h2>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-4">
                {selectedUser && users
                  .find(u => u.id === selectedUser)
                  ?.threads.map(thread => (
                    <div
                      key={thread.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
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
                {!selectedUser && (
                  <div className="text-center text-gray-500">
                    Select a user to view their threads
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserThreads;
