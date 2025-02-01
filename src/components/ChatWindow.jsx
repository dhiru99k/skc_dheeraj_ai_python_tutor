import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);  // Stores chat messages
  const [input, setInput] = useState("");        // Stores user input
  const [isTyping, setIsTyping] = useState(false);  // Loading state for AI response
  const chatEndRef = useRef(null);               // Reference for auto-scrolling
  const navigate = useNavigate();

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Function to send message to Vercel API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Send user input to Vercel API
      const response = await axios.post(
        "https://ai-python-tutor-api.vercel.app/",
        { input },
        { headers: { "Content-Type": "application/json" } }
      );

      // Extract AI response
      const aiText = response.data.response || "⚠️ No response from AI";
      const isCodeResponse = aiText.includes("```");

      // Append AI response to chat messages
      setMessages([...newMessages, { role: "assistant", content: aiText, isCode: isCodeResponse }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("⚠️ Error fetching AI response. Check your API setup.");
    } finally {
      setIsTyping(false);
    }
  };

  // Function to start a new chat session
  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      {/* Chat Window */}
      <div className="flex flex-col flex-grow">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
          <h2 className="text-2xl font-bold">💬 AI Python Tutor</h2>
          <div className="flex gap-4">
            <button
              onClick={startNewChat}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              🔄 New Chat
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              ⬅️ Home
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl max-w-3xl ${
                msg.role === "user"
                  ? "bg-blue-500 text-white ml-auto text-right"
                  : "bg-gray-700 text-left"
              }`}
            >
              {msg.isCode ? (
                <SyntaxHighlighter language="python" style={materialLight} className="rounded-lg">
                  {msg.content.replace(/```python|```/g, "").trim()}
                </SyntaxHighlighter>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          ))}

          {/* AI Typing Animation */}
          {isTyping && (
            <div className="text-gray-400 italic text-left bg-gray-700 p-3 rounded-lg w-fit animate-pulse">
              AI is typing...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="flex p-4 bg-blue-100 border-t border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a Python question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow p-3 rounded-lg text-black"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
