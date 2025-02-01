import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaBars, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeMessage = {
      role: "assistant",
      content: "Welcome to the AI Python Tutor! Feel free to ask your Python questions here.",
      isCode: false,
    };
    setMessages([welcomeMessage]);
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    const apiKey = localStorage.getItem("geminiApiKey");

    if (!apiKey) {
      alert("API key not found. Please set your API key.");
      setIsTyping(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiText = response.data.candidates[0]?.content?.parts[0]?.text || "⚠️ No response from AI";
      const isCodeResponse = aiText.includes("```");

      const finalMessages = [
        ...newMessages,
        { role: "assistant", content: aiText, isCode: isCodeResponse },
      ];
      setMessages(finalMessages);
      setPreviousChats([...previousChats, finalMessages]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("⚠️ Error fetching AI response. Check your API key.");
    } finally {
      setIsTyping(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
  };

  const deleteChat = (index) => {
    setPreviousChats(previousChats.filter((_, i) => i !== index));
  };

  const selectChat = (index) => {
    setMessages(previousChats[index]);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white font-sans">
      {/* Sidebar for Previous Chats */}
      <div
        className={`fixed top-0 left-0 z-20 w-64 bg-gray-800 p-4 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Previous Chats</h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4 overflow-y-auto">
          {previousChats.map((chat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              <button
                onClick={() => selectChat(idx)}
                className="text-gray-300 hover:text-white w-full text-left"
              >
                Chat {idx + 1}
              </button>
              <button
                onClick={() => deleteChat(idx)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-500/10 transition"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
          <h2 className="text-2xl font-bold">💬 AI Python Tutor</h2>
          <div className="flex gap-4">
            <button onClick={startNewChat} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              🔄 New Chat
            </button>
            <button onClick={() => navigate("/")} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              ⬅️ Home
            </button>
            <button onClick={() => setIsSidebarOpen(true)} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              <FaBars />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-4 rounded-xl max-w-3xl ${msg.role === "user" ? "ml-auto text-right" : "text-left"}`}>
              <div className={`p-4 rounded-lg shadow-md ${msg.role === "user" ? "bg-blue-600" : "bg-green-600"}`}>
                {msg.isCode ? (
                  <div className="bg-black rounded-lg p-4">
                    <SyntaxHighlighter
                      language="python"
                      style={dracula}
                      customStyle={{
                        background: "#1E1E1E",
                        padding: "1rem",
                        borderRadius: "5px",
                        overflowX: "auto",
                        fontSize: "14px",
                        lineHeight: "1.5",
                      }}
                      wrapLines={true}
                    >
                      {msg.content.replace(/```python|```/g, "").trim()}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="text-gray-400 italic text-left bg-gray-700 p-3 rounded-lg w-fit animate-pulse">
              AI is typing...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="flex justify-center items-center p-4 bg-blue-200 border-t border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a Python question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="w-3/4 p-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
