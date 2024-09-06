import * as z from "zod";

// Import the Genkit core libraries and plugins.
import {generate} from "@genkit-ai/ai";
import {configureGenkit} from "@genkit-ai/core";
import type {Part} from "@genkit-ai/ai/model";
import {firebase} from "@genkit-ai/firebase";
import {defineSecret} from "firebase-functions/params";

const googleAIapiKey = defineSecret("GOOGLE_GENAI_API_KEY");

// Import models from the Google AI plugin. The Google AI API provides access to
// several generative models. Here, we import Gemini 1.5 Flash.
import {googleAI, gemini15Flash} from "@genkit-ai/googleai";

// From the Firebase plugin, import the functions needed to deploy flows using
// Cloud Functions.
import {noAuth, onFlow} from "@genkit-ai/firebase/functions";

configureGenkit({
  plugins: [
    // Load the Firebase plugin, which provides integrations with several
    // Firebase services.
    firebase(),
    // Load the Google AI plugin. You can optionally specify your API key
    // by passing in a config object; if you don't, the Google AI plugin uses
    // the value from the GOOGLE_GENAI_API_KEY environment variable, which is
    // the recommended practice.
    googleAI(),
  ],
  // Log debug output to tbe console.
  logLevel: "debug",
  // Perform OpenTelemetry instrumentation and enable trace collection.
  enableTracingAndMetrics: true,
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
export const imageAnalysisFlow = onFlow(
  {
    name: "imageAnalysisFlow",
    httpsOptions: {
      cors: "*",
      secrets: [googleAIapiKey],
    },
    inputSchema: z.object({
      url: z.string(),
      contentType: z.string(),
    }),
    outputSchema: z.string(),
    authPolicy: noAuth(),
  },
  async ({url, contentType}) => {
    // Construct a request and send it to the model API.
    const parts: Part[] = [
      {
        media: {
          url,
          contentType,
        },
      },
      {
        // eslint-disable-next-line max-len
        text: "Eres un experto en fútbol con un amplio conocimiento del deporte, sus reglas, historia, jugadores famosos y momentos icónicos. Genera una respuesta creativa y relevante relacionada con el fútbol, analizando cuidadosamente la imagen proporcionada, con acento argentino, de manera simpática y amigable.",
      },
    ];

    const llmResponse = await generate({
      model: gemini15Flash,
      prompt: parts,
      config: {
        temperature: 1,
      },
    });

    // Handle the response from the model API. In this sample, we just
    // convert it to a string, but more complicated flows might coerce the
    // response into structured output or chain the response into another
    // LLM call, etc.
    return llmResponse.text();
  },
);
