
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";

const APIKeyConfig = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('chatgpt_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('chatgpt_api_key', apiKey);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Key className="h-5 w-5" />
          Configure ChatGPT API Key
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your ChatGPT API key"
          className="flex-1"
        />
        <Button onClick={handleSaveKey}>Save Key</Button>
      </CardContent>
    </Card>
  );
};

export default APIKeyConfig;
