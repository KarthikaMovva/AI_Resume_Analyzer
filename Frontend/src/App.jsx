import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      console.log(data);

      setResponse(data);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        AI Resume Analyzer
      </h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadResume}
        className="bg-blue-500 text-white px-4 py-2 ml-3 rounded"
      >
        Upload Resume
      </button>

      {response && (
        <pre className="mt-5">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;