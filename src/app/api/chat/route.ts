import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumeData } from "@/data/resume";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        // Context preparation
        const context = `
    You are an AI assistant for Shubham Pasricha's portfolio website. 
    Your goal is to answer questions about Shubham based STRICTLY on the provided context.
    
    Context (Resume Data):
    ${JSON.stringify(resumeData, null, 2)}
    
    Capabilities:
    1. Answer questions about Shubham's skills, experience, projects, education, etc.
    2. If the user asks to see a specific section (e.g., "Show me his projects", "Go to contact", "scrool to experience"), 
       you MUST return a JSON object with a "section" key.
       
    Sections available to scroll to: "hero" (top), "about", "experience", "projects", "skills", "contact".
    
    Response Format:
    If the user wants to navigate or seeing a section is highly relevant to the answer, return a JSON object:
    {
      "answer": "Your text answer here...",
      "section": "section_id_here"
    }
    
    If no navigation is needed, just return the text answer as a string, or a JSON with section: null.
    Prefer returning JSON consistently if possible, but handle plain text gracefull on frontend.
    ACTUALLY, ALWAYS RETURN JSON: { "answer": "...", "section": "..." | null }
    
    Keep answers concise, professional, and friendly.
    `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: context }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions about Shubham and help navigate the portfolio." }],
                },
                ...history,
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON from the response
        let jsonResponse;
        try {
            // Find JSON pattern in case model adds extra text
            const match = text.match(/\{[\s\S]*\}/);
            if (match) {
                jsonResponse = JSON.parse(match[0]);
            } else {
                jsonResponse = { answer: text, section: null };
            }
        } catch (e) {
            jsonResponse = { answer: text, section: null };
        }

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json(
            { answer: "Sorry, I encountered an error. Please try again.", section: null },
            { status: 500 }
        );
    }
}
