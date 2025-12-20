"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "model";
    text: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue("");
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            // Prepare history for API (excluding the very last user message which we send separately, 
            // or actually the API expects history + message. We'll simplify and just send context in backend + recent history if needed.
            // For this simple implementation, let's just send the current message and minimal history if we supported it.
            // The backend handles the context initialization. We'll pass `history` as parts mostly.

            const historyForApi = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: historyForApi
                }),
            });

            const data = await response.json();

            if (data.answer) {
                setMessages((prev) => [...prev, { role: "model", text: data.answer }]);

                if (data.section) {
                    const element = document.getElementById(data.section);
                    if (element) {
                        // Wait a bit for user to read then scroll, or scroll immediately? 
                        // Better scroll immediately so they see context.
                        setTimeout(() => {
                            element.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                    }
                }
            } else {
                setMessages((prev) => [...prev, { role: "model", text: "Something went wrong. Please try again." }]);
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [...prev, { role: "model", text: "Error connecting to server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:scale-110 transition-transform z-50"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        <div className="p-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                            <h3 className="font-bold text-lg">Chat with AI</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Ask about my skills, projects, or experience</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-20">
                                    <p>Hi! I'm Shubham's AI assistant.</p>
                                    <p className="text-sm mt-2">Try asking: "What are your skills?" or "Show me your projects".</p>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "flex w-full",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                            msg.role === "user"
                                                ? "bg-black text-white dark:bg-white dark:text-black rounded-br-none"
                                                : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                        )}
                                    >
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none px-4 py-2">
                                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask a question..."
                                    className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black dark:bg-white text-white dark:text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
