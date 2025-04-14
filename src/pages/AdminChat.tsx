import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, LogOut, UploadCloud, Users } from "lucide-react";
import APIKeyConfig from '@/components/APIKeyConfig';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  file?: string;
}

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const AdminChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('chatgpt_api_key');
    setApiKey(savedKey);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: input
            }
          ]
        })
      });

      const data = await response.json();
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0].message.content,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition logic will be implemented here
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, implement file upload logic here
      const newMessage: Message = {
        id: Date.now().toString(),
        text: `File uploaded: ${file.name}`,
        isUser: true,
        timestamp: new Date(),
        file: URL.createObjectURL(file),
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Threads Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-purple-600">Admin Threads</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/user-threads')}
            className="ml-2"
          >
            <Users className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-60px)]">
          {threads.map(thread => (
            <div key={thread.id} className="p-3 hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-gray-900 truncate">{thread.title}</h3>
              <p className="text-sm text-gray-500 truncate">{thread.lastMessage}</p>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h1 className="text-xl font-semibold text-purple-600">Eoxssphere Admin</h1>
          <Button variant="outline" onClick={() => navigate('/')} className="text-gray-600">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* API Key Config */}
        <div className="p-4">
          <APIKeyConfig />
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.isUser 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.text}
                  {message.file && (
                    <div className="mt-2">
                      <a 
                        href={message.file} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-200 underline"
                      >
                        View Uploaded File
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area with File Upload */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleVoice}
              className={`${isListening ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <UploadCloud className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} disabled={!apiKey}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
