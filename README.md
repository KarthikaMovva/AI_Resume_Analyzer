# AI Resume Analyzer

An AI-powered Resume Analyzer built using the MERN ecosystem, GraphQL, and Google's Gemini API.

Users can upload their resumes in PDF format and receive:

- ATS Score
- Extracted Skills
- Missing Skills
- Resume Improvement Suggestions

---

## Features

- Resume PDF Upload
- PDF Text Extraction
- AI-powered Resume Analysis using Gemini
- ATS Score Calculation
- Skill Detection
- Missing Skill Recommendations
- Resume Improvement Suggestions
- MongoDB Data Storage
- GraphQL Backend
- Responsive React UI

---

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- GraphQL (Apollo Server)

### Database

- MongoDB Atlas
- Mongoose

### AI

- Gemini 2.5 Flash
- Google GenAI SDK

### File Processing

- Multer
- pdf-parse

---

# Prerequisites

Install:

- Node.js v22.22.3
- npm v10.9.8
- MongoDB Atlas Account
- Gemini API Key

---

# Clone Repository

```bash
git clone <repository-url>

cd AI-Resume-Analyzer
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

Run server:

```bash
npx nodemon server.js
```

or

```bash
node server.js
```

Backend runs at:

```text
http://localhost:5000
```

---

---

# API Endpoints

## Upload Resume

```http
POST /api/resume/upload
```

Request:

```form-data
resume : PDF File
```

