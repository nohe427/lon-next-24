import * as z from 'zod';

// Import the Genkit core libraries and plugins.
import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { gemini15Flash, gemini15Pro, vertexAI } from '@genkit-ai/vertexai';

// Import models from the Vertex AI plugin. The Vertex AI API provides access to
// several generative models. Here, we import Gemini 1.5 Flash.
import {} from './tools/grocerTools'

configureGenkit({
  plugins: [
    // Load the Vertex AI plugin. You can optionally specify your project ID
    // by passing in a config object; if you don't, the Vertex AI plugin uses
    // the value from the GCLOUD_PROJECT environment variable.
    vertexAI({ location: 'us-central1' }),
  ],
  // Log debug output to tbe console.
  logLevel: 'debug',
  // Perform OpenTelemetry instrumentation and enable trace collection.
  enableTracingAndMetrics: true,
});

// A simple flow.
export const customerAgent = defineFlow(
  {
    name: 'customerAgent',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (request) => {
		// Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `
      You are a customer service representative at a grocery store
      `,
      model: gemini15Pro,
      config: {
        temperature: 1,
      },
      tools: []
    });

		// Handle the response from the model API. In this sample, we just convert
    // it to a string, but more complicated flows might coerce the response into
    // structured output or chain the response into another LLM call, etc.
    return llmResponse.text();
  }
);

// Start a flow server, which exposes your flows as HTTP endpoints. This call
// must come last, after all of your plug-in configuration and flow definitions.
// You can optionally specify a subset of flows to serve, and configure some
// HTTP server options, but by default, the flow server serves all defined flows.
startFlowsServer();
