import React, { useState } from "react";

const TutorCharacter = ({ onSelectCharacter }) => {
  const characters = [
    { name: "Python Pete", avatar: "🐍", description: "A friendly Python expert who makes coding fun!" },
    { name: "Code Cat", avatar: "🐱", description: "Loves to teach coding through exciting examples!" },
    { name: "AI Buddy", avatar: "🤖", description: "A super smart AI tutor who helps you learn fast!" },
  ];

  const [selected, setSelected] = useState(null);

  const handleSelect = (character) => {
    setSelected(character);
    onSelectCharacter(character);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-xl text-center border border-gray-200">
      <h2 className="text-4xl font-extrabold mb-8 text-blue-600 drop-shadow-md">
        🎭 Choose Your AI Tutor
      </h2>

      {/* Character Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <button
            key={char.name}
            onClick={() => handleSelect(char)}
            className={`p-8 rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center border-2 ${
              selected?.name === char.name
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-600 shadow-2xl"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }`}
          >
            <span className="text-6xl mb-4">{char.avatar}</span>
            <p className="font-bold text-2xl text-gray-800">{char.name}</p>
            <p className="text-gray-600 mt-2">{char.description}</p>
          </button>
        ))}
      </div>

      {/* Selected Tutor Feedback */}
      {selected && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg text-white">
          <p className="text-2xl font-bold">You selected: {selected.name}</p>
          <p className="text-lg mt-2">{selected.description}</p>
        </div>
      )}
    </div>
  );
};

export default TutorCharacter;