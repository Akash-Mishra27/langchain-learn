// index.mjs
import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

async function run() {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not defined in .env");
    }

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",     // or "gemini-1.5-pro"
      temperature: 0.7,
      // apiKey is optional if GOOGLE_API_KEY is set, but we can be explicit:
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const stream = await llm.stream("Explain LangChain in simple words.");
      for await (const chunk of stream) {
        //   const text = extractText(chunk.content);
          process.stdout.write(chunk.toFormattedString());
      }
    // console.log("RAW RESPONSE:", res);
    // console.log("\nText:", res.content?.[0]?.text ?? "(no text)");
  } catch (err) {
    console.error("Model call failed:");

    // LangChain wraps the underlying error – log everything useful:
    console.dir(err, { depth: 5 });

    // Sometimes the useful info is nested:
    if (err?.cause) {
      console.error("\nCause:");
      console.dir(err.cause, { depth: 5 });
    }
  }
}

function extractText(content) {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part?.text) return part.text;
        return "";
      })
      .join("");
  }

  return "";
}

run();
