import React, { useState } from "react";
import { questionsData } from "../questions/questions"; // Importing questions data from a separate file

const HomeworkAssignments = () => {
  // State to manage current section, user answers, etc.
  const [userAnswers, setUserAnswers] = useState({});
  const [currentLevel, setCurrentLevel] = useState("beginner"); // Tracks current level
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions = questionsData[currentLevel];

  // Handle user input change
  const handleChange = (id, value) => {
    setUserAnswers({ ...userAnswers, [id]: value });
  };

  // Check if all questions in the current level are answered
  const allAnswered = questions.every(
    (item) => userAnswers[item.id] !== undefined
  );

  // Move to the next section if all questions are answered
  const handleNextSection = () => {
    if (currentLevel === "beginner" && allAnswered) {
      setCurrentLevel("medium");
    } else if (currentLevel === "medium" && allAnswered) {
      setCurrentLevel("advanced");
    }
  };

  // Reset all answers
  const clearAnswers = () => {
    setUserAnswers({});
    setShowResults(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-700 min-h-screen flex flex-col items-center justify-center py-10 px-5">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-2xl p-10 space-y-8">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-6">
          Python Homework Assignments
        </h2>

        {/* Categories Section */}
        <div className="text-3xl font-bold text-blue-800 mb-6 text-center">
          {currentLevel === "beginner" && "Beginner Level"}
          {currentLevel === "medium" && "Intermediate Level"}
          {currentLevel === "advanced" && "Advanced Level"}
        </div>

        {/* Questions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {questions.map((item) => (
            <div
              key={item.id}
              className="bg-blue-50 p-6 border-2 border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-xl text-blue-900 mb-4 font-medium">
                {item.question}
              </p>

              {/* Question Types */}
              {item.type === "coding" ? (
                <textarea
                  className="w-full p-4 border-2 border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Write your code here..."
                  value={userAnswers[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                />
              ) : (
                <select
                  className="w-full p-4 border-2 border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={userAnswers[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                >
                  <option value="">Select an answer</option>
                  {item.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {/* Show feedback */}
              {showResults && (
                <p
                  className={`mt-3 text-sm font-medium ${
                    userAnswers[item.id] === item.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {userAnswers[item.id] === item.answer
                    ? "✅ Correct!"
                    : `❌ Incorrect! Correct answer: ${item.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center mt-8 space-x-6">
          <button
            onClick={clearAnswers}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Clear Answers
          </button>

          <button
            onClick={handleNextSection}
            disabled={!allAnswered}
            className="w-full sm:w-auto bg-yellow-400 text-blue-900 px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 disabled:bg-gray-400"
          >
            Next Section
          </button>
        </div>

        {/* Check Answers Button */}
        <button
          onClick={() => setShowResults(true)}
          className="w-full sm:w-auto bg-blue-800 text-white px-8 py-3 rounded-md hover:bg-blue-900 transition-all duration-300 mt-6"
        >
          Check Answers
        </button>

        {/* Results Popup */}
        {isCompleted && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10"
            onClick={() => setIsCompleted(false)}
          >
            <div
              className="bg-white p-8 rounded-lg w-3/4 max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-bold mb-6 text-center text-blue-800">
                Well Done!
              </h3>
              <p className="text-xl mb-6 text-center text-gray-700">
                You've completed the assignments! Check your answers, keep
                learning, and improve!
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeworkAssignments;