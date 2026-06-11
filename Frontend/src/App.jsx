import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      const cleaned = data.analysis
        .replace(/```json/g, "")
        .replace(/```/g, "");

      const parsedData = JSON.parse(cleaned);

      setAnalysis(parsedData);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-slate-800">
            AI Resume Analyzer
          </h1>
          <p className="text-gray-500 mt-2">
            Upload your resume and get ATS insights powered by Gemini AI
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="border rounded-lg p-2 w-full"
            />

            <button
              onClick={uploadResume}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              {loading ? "Analyzing..." : "Upload Resume"}
            </button>
          </div>
        </div>

        {/* Results */}
        {analysis && (
          <div className="mt-10 space-y-6">
            {/* ATS Score */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">
                ATS Score
              </h2>

              <div className="text-5xl font-bold text-blue-600">
                {analysis.atsScore}/100
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mt-5">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{
                    width: `${analysis.atsScore}%`,
                  }}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Skills Found
              </h2>

              <div className="flex flex-wrap gap-2">
                {analysis.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-xl font-bold mb-4">
                Improvement Suggestions
              </h2>

              <ul className="list-disc pl-6 space-y-2">
                {analysis.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;