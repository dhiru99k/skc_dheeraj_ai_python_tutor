import React, { useState } from "react";
import { Link } from "react-router-dom";
import TutorCharacter from "../components/TutorCharacter"; // Fixed spelling

const Home = () => {
  const [selectedTutor, setSelectedTutor] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-center p-6">
      {/* Header Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-pulse">
        AI Python Tutor for Kids
      </h1>
      <p className="text-lg md:text-xl mb-6 font-light">
        Learn Python in a fun, interactive, and exciting way! 💡
      </p>

      {/* Tutor Character Selection */}
      <div className="w-full max-w-4xl mx-auto">
        <TutorCharacter onSelectCharacter={setSelectedTutor} />
      </div>


      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        <Link
          to="/chat"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-110 hover:shadow-xl"
        >
          💬 Start Chatting
        </Link>
        <Link
          to="/assignments"
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-110 hover:shadow-xl"
        >
          📚 Try Assignments
        </Link>
        <Link
          to="/settings"
          className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all transform hover:scale-110 hover:shadow-xl"
        >
          ⚙️ API Settings
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 py-4 w-full bg-gradient-to-r from-purple-700/50 to-pink-700/50 text-sm text-white/80 rounded-lg shadow-inner">
        Made with ❤️ for young coders! ✨
      </footer>
    </div>
  );
};

export default Home;