AI-Powered Python Tutor
🚀 An interactive AI-powered Python tutor designed for children to learn basic Python coding. It features a chatbot interface that uses Gemini AI for generating responses. Users can set their own API key for communication with the AI.

🛠️ Tech Stack
Frontend (React - Hosted on GitHub Pages)
React (with Vite)
Tailwind CSS (for styling)
React Router (for navigation)
Axios (for API requests)
Syntax Highlighter (for displaying Python code)
LocalStorage (for storing API keys)
Backend (Node.js - Hosted on Vercel)
Express.js (server framework)
CORS (for cross-origin requests)
🌟 Features
✅ AI Chatbot: Ask Python-related questions and get responses in text or code.
✅ API Key Configuration: Users can enter and save their Gemini AI API key.
✅ Syntax Highlighting: Python code responses are properly formatted.
✅ New Chat Option: Start a fresh conversation anytime.
✅ Responsive UI: Works on all devices with a smooth user experience.

📂 Project Structure
scss
Copy
Edit
📁 ai-python-tutor
 ├── 📁 frontend (React app - Hosted on GitHub Pages)
 │    ├── src
 │    │    ├── components
 │    │    │    ├── ChatWindow.jsx (Main chat interface)
 │    │    │    ├── ApiSettings.jsx (API key configuration)
 │    │    ├── pages
 │    │    │    ├── Home.jsx (Landing page)
 │    │    │    ├── Chat.jsx (Chatbot page)
 │    ├── public
 │    ├── package.json
 │    ├── vite.config.js
 ├── 📁 backend (Node.js server - Hosted on Vercel)
 │    ├── index.js (Main backend API)
 │    ├── package.json
 ├── README.md (Project Documentation)
🔧 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/ai-python-tutor.git
cd ai-python-tutor
2️⃣ Install Dependencies
Frontend
sh
Copy
Edit
cd frontend
npm install
Backend
sh
Copy
Edit
cd backend
npm install
3️⃣ Run Locally
Start Frontend
sh
Copy
Edit
cd frontend
npm run dev
Start Backend
sh
Copy
Edit
cd backend
node index.js
🚀 Deployment
Frontend (GitHub Pages)
Update vite.config.js for GitHub Pages deployment:
js
Copy
Edit
export default defineConfig({
  base: "/skc_dheeraj_ai_python_tutor/", // Change this based on your GitHub repo name
  plugins: [react()],
});
Deploy frontend:
sh
Copy
Edit
npm run build
npm run deploy
Backend (Vercel)
Login to Vercel:
sh
Copy
Edit
vercel login
Deploy backend:
sh
Copy
Edit
vercel --prod
🔗 Live Demo
Frontend: skc_dheeraj_ai_python_tutor
Backend: Deployed on Vercel
📸 Screenshots
Home Page	Chat Window
💡 Usage Guide
1️⃣ Go to the API Key Settings page and enter your Gemini AI API key.
2️⃣ Start chatting with the AI tutor.
3️⃣ If you ask Python-related questions, responses will include formatted code.
4️⃣ Click New Chat to reset the conversation.

👨‍💻 Author
Dheeraj Chauhan
📧 Email: your-email@example.com
🔗 GitHub: your-github-profile
🎥 YouTube: The Hungry Chauhan

📜 License
This project is open-source and available under the MIT License.
