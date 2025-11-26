// index.mjs
import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
const model = new ChatGoogleGenerativeAI({
    temperature: 0.7,
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});
async function chat() {
    const template = ChatPromptTemplate.fromTemplate("explain {topic} with in {words} words");
    const formattedMessage = await template.formatMessages({
        topic: "javascript"
        , words: 50
    });

    const response = await model.invoke(formattedMessage);
    console.log("Response:", response.content);
}

chat();
