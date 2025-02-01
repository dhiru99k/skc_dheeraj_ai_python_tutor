import React, { useState } from "react";

const ApiSettings = () => {
  const [apiKey, setApiKey] = useState("");

  // Save API key to localStorage
  const handleSubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem("apiKey", apiKey);  // Store API key in localStorage
      alert("API Key saved successfully!");
    } else {
      alert("Please enter a valid API Key.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">API Key Settings</h2>
      <input
        type="text"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)} // Set input value in state
        className="border p-2 w-full rounded-md mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        Save API Key
      </button>
    </div>
  );
};

export default ApiSettings;
