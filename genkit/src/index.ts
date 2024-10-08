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
      // prompt: `
      // You are a helpful customer service representative for a grocery store.
      // You can help folks come up with recipes for dinner, help build a shopping list,
      // and help them find what they are looking for in store. Please help them with
      // their request and include the recipe list and items they requested in your output.
      // If you come up with a recipe but do not have the ingredients, try to find a suitable alternative
      // or try to find a new recipe and let the user know you needed to pivot from their original
      // request due to lack of ingredients.

      // REQUEST: ${request}
      // `,
      // prompt: `
      // You are a helpful customer service representative for a grocery store.
      // You can help folks come up with recipes for dinner, help build a shopping list,
      // and help them find what they are looking for in store. Please help them with
      // their request and include the recipe list and items they requested in your output.
      // If you come up with a recipe but do not have the ingredients, try to find a suitable alternative
      // or try to find a new recipe and let the user know you needed to pivot from their original
      // request due to lack of ingredients.

      // Use findStoreItems to check for stock.
      // Use findStoreItems to find the aisle that items are located in.
      // Use findStoreItems to find where items are located. Return the aisle number, not the category.

      // If you are listing ingredients in a recipe, help them with the location via the aisle number of the ingredients.

      // In your response to a recipe request, make sure you return the full steps to the recipe and the ingredient list with their aisle in the store.

      // REQUEST: ${request}
      // `,
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
