"use client";
import { useEffect, useState } from "react";
import { type Message, getChatCompletion } from "./actions";
import { ChatWindow } from "@app/chat-window";
import { ask } from "@app/ask/actions";

export const TestOpenAiPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  const getAiResponse = async (messages: Message[]) => {
    setLoading(true);
    // const aiResponse = await getChatCompletion(messages);
    const aiResponse = await ask(userPrompt);
    console.log({ aiResponse });
    setAiResponse(aiResponse);
    setLoading(false);
  };

  const handleSubmit = async (userPrompt: string) => {
    if (!userPrompt) return;
    setUserPrompt(userPrompt);
    const newMessages: Message[] = [
      ...messages,
      { message: userPrompt, author: "human", id: 1 },
    ];
    setMessages(newMessages);
  };

  useEffect(() => {
    console.log({ userPrompt });
    if (!userPrompt) return;
    const newMessages: Message[] = [
      ...messages,
      { message: userPrompt, author: "human", id: Math.random() },
    ];

    getAiResponse(newMessages);
  }, [userPrompt]);

  useEffect(() => {
    const newMessages: Message[] = [
      ...messages,
      { message: aiResponse, author: "ai", id: Math.random() },
    ];
    setMessages(newMessages);
  }, [aiResponse]);

  return (
    <ChatWindow onSubmit={handleSubmit} messages={messages} loading={loading} />
  );
};