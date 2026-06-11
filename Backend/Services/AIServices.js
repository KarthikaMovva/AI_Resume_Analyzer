const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {

    const response =
        await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: `
Analyze the following resume.

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "atsScore": number,
  "skills": [],
  "missingSkills": [],
  "suggestions": []
}
`,
        });

    return response.text;
};

module.exports = analyzeResume;