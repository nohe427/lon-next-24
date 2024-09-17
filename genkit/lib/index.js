"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerAgent = exports.restaurantAgentFlow = void 0;
const z = __importStar(require("zod"));
// Import the Genkit core libraries and plugins.
const ai_1 = require("@genkit-ai/ai");
const core_1 = require("@genkit-ai/core");
const flow_1 = require("@genkit-ai/flow");
const vertexai_1 = require("@genkit-ai/vertexai");
// Import models from the Vertex AI plugin. The Vertex AI API provides access to
// several generative models. Here, we import Gemini 1.5 Flash.
const restaurantTools_1 = require("./tools/restaurantTools");
const grocerTools_1 = require("./tools/grocerTools");
(0, core_1.configureGenkit)({
    plugins: [
        // Load the Vertex AI plugin. You can optionally specify your project ID
        // by passing in a config object; if you don't, the Vertex AI plugin uses
        // the value from the GCLOUD_PROJECT environment variable.
        (0, vertexai_1.vertexAI)({ location: 'us-central1' }),
    ],
    // Log debug output to tbe console.
    logLevel: 'debug',
    // Perform OpenTelemetry instrumentation and enable trace collection.
    enableTracingAndMetrics: true,
});
// Define a simple flow that prompts an LLM to generate menu suggestions.
exports.restaurantAgentFlow = (0, flow_1.defineFlow)({
    name: 'restaurantAgentFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
}, async (request) => {
    // Construct a request and send it to the model API.
    const llmResponse = await (0, ai_1.generate)({
        prompt: `
      You are the operations manager for a restaurant. Help answer the questions that
      the restaurant owner has about the restaurants sales and products.

      PLEASE DON'T HALLUCINATE. YOU MUST ANSWER USING THE TOOL RESULTS

      MANAGER REQUEST : ${request}
      `,
        model: vertexai_1.gemini15Flash,
        config: {
            temperature: 1,
        },
        tools: [restaurantTools_1.listAllProducts, restaurantTools_1.listAllUsers, restaurantTools_1.ordersByDateRange, restaurantTools_1.getAllReviews, restaurantTools_1.getAllOrders, restaurantTools_1.userById, restaurantTools_1.reviewsDateRange]
    });
    // Handle the response from the model API. In this sample, we just convert
    // it to a string, but more complicated flows might coerce the response into
    // structured output or chain the response into another LLM call, etc.
    return llmResponse.text();
});
// Define a simple flow that prompts an LLM to generate menu suggestions.
exports.customerAgent = (0, flow_1.defineFlow)({
    name: 'customerAgent',
    inputSchema: z.string(),
    outputSchema: z.string(),
}, async (request) => {
    // Construct a request and send it to the model API.
    const llmResponse = await (0, ai_1.generate)({
        prompt: `
      You are a helpful customer service representative for a grocery store.
      You can help folks come up with recipies for dinner, help build a shopping list,
      and help them find what they are looking for in store. Please help them with
      their request and include the recipie list and items they requested in your output.
      If you come up with a recipie but do not have the ingredients, try to find a suitable alternative
      or try to find a new recipie and let the user know you needed to pivot from their original
      request due to lack of ingredients.

      Use findStoreItems to check for stock.
      Use findStoreItems to find the aisle that items are located in.
      Use findStoreItems to find where items are located. Return the aisle number, not the category.

      If you are listing ingredients in a recipie help them with the location via the aisle number of the ingredients.

      In your response to a recipie request, make sure you return the full steps to the recipie and the ingredient list with their aisle in the store.

      If a user is looking for a replacement to an item using ingredientReplacement, report where the user can find the suggested item using findStoreItems.

      REQUEST : ${request}
      `,
        model: vertexai_1.gemini15Pro,
        config: {
            temperature: 1,
        },
        tools: [grocerTools_1.generateRecipie, grocerTools_1.findStoreItems, grocerTools_1.ingredientReplacement]
    });
    // Handle the response from the model API. In this sample, we just convert
    // it to a string, but more complicated flows might coerce the response into
    // structured output or chain the response into another LLM call, etc.
    return llmResponse.text();
});
// Start a flow server, which exposes your flows as HTTP endpoints. This call
// must come last, after all of your plug-in configuration and flow definitions.
// You can optionally specify a subset of flows to serve, and configure some
// HTTP server options, but by default, the flow server serves all defined flows.
(0, flow_1.startFlowsServer)();
//# sourceMappingURL=index.js.map