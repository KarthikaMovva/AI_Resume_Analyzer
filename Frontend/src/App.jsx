import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border p-6 rounded">
        <h1 className="text-3xl font-bold mb-4">
          AI Resume Analyzer
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
          Analyze Resume
        </button>
      </div>
    </div>
  );
}

export default App;