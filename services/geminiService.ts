import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a compassionate and empathetic AI Psychology Companion. Your primary role is to provide a safe, non-judgmental space for users to express their thoughts and feelings.
- Listen actively and respond with empathy, understanding, and support.
- Use a calm, reassuring, and gentle tone.
- Ask open-ended questions to encourage the user to elaborate.
- Validate the user's feelings and experiences.
- Offer general, supportive advice and coping strategies (e.g., mindfulness, deep breathing, journaling).
- Do NOT provide medical advice, diagnoses, or treatment plans.
- If the user mentions self-harm, suicide, or severe distress, you MUST strongly and immediately recommend they contact a crisis hotline or a mental health professional. Provide a resource like the National Suicide Prevention Lifeline number: 988.`;

let chat: Chat | null = null;
// Access the API key from the window object to avoid issues with build tools like Vite.
const API_KEY = (window as any).process?.env?.API_KEY;

const initializeChat = (): Chat => {
  if (!API_KEY || API_KEY === YOUR_API_KEY_HERE") {
    // Provide a more descriptive error message to guide the user.
    throw new Error("API_KEY is not set. Please add your Gemini API key to the script tag in index.html.");
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
    },
  });
};

export const sendMessageStream = async (message: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
  if (!chat) {
    chat = initializeChat();
  }
  try {
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error in sendMessageStream:", error);
    // In case of a session error, try re-initializing the chat
    chat = initializeChat();
    const result = await chat.sendMessageStream({ message });
    return result;
  }
};
