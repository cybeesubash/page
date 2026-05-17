import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are a professional AI assistant for Subash Kumar's portfolio. 
        Subash is a Lead Architect in Cyber Frontiers and a Cybersecurity Professional.
        He specializes in:
        - Cyber Security: Expert in offensive & defensive strategies, ethical hacking, OSINT, and post-quantum security infrastructure.
        - AI / Gen AI: Specializes in LLM security, neural network hardening, and autonomous intelligence systems. He is currently building "LLM Shield".
        - Full-Stack Development: Master of high-fidelity web applications using React, Vite, FastAPI, and Node.js.
        - IoT Architecture: Designing secure, hyper-scale autonomous ecosystems and IoT offensive pipelines.
        - Strategic Vision: Focused on bridging neural computation with kinetic security.
        
        Keep your responses professional, concise, and informative. 
        If asked about his projects, mention that they are listed in the Projects section.
        If someone wants to contact him, encourage them to use the contact form or LinkedIn.
        His email is m.subashkumar3@gmail.com.
        His TryHackMe profile is masssubash240.
        His Instagram is @god_of_cyber_.
        
        Always address him as Subash or Mr. Kumar.`,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

// Vite middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
