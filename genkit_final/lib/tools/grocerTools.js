"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientReplacement = exports.findStoreItems = exports.generateRecipie = void 0;
const ai_1 = require("@genkit-ai/ai");
const vertexai_1 = require("@genkit-ai/vertexai");
const dc_1 = require("@restaurants/dc");
const zod_1 = require("zod");
const dataconnect_1 = require("../config/dataconnect");
const dc = (0, dataconnect_1.getDataconnectClient)();
exports.generateRecipie = (0, ai_1.defineTool)({
    name: 'generateRecipie',
    description: 'Used to generate a recipie and a list of grocery items that need to be purchased to make the item. If no input is provided, come up with an american themed dish',
    // Define input and output schema so the model knows how to use the tool
    inputSchema: zod_1.z.object({ recipieRequest: zod_1.z.string().optional() }),
    outputSchema: zod_1.z.object({
        recipie: zod_1.z.string().describe('The step by step recipie to make'),
        ingredients: zod_1.z.object({ ingredient: zod_1.z.string().describe("the name of the ingredient"), quantity: zod_1.z.string() }).array(),
    }).optional().describe('a recipie for a meal item'),
}, async (input) => {
    const result = await (0, ai_1.generate)({
        model: vertexai_1.gemini15Flash,
        prompt: `
    Generate a recipie that most people could make at home with ingredients they would find in a local grocery store.
    The recipie must try to match the users request.
    
    USER REQUEST: ${input.recipieRequest ? input.recipieRequest : "traditional american dinner"}
    `,
        output: {
            format: "json",
            schema: zod_1.z.object({
                recipie: zod_1.z.string().describe('The step by step recipie to make'),
                ingredients: zod_1.z.object({ ingredient: zod_1.z.string().describe("the name of the ingredient"), quantity: zod_1.z.string() }).array(),
            }).describe('a recipie for a meal item'),
        },
    });
    if (result.output() == null) {
        return { recipie: "", ingredients: [] };
    }
    return { recipie: result.output().recipie, ingredients: result.output().ingredients };
});
exports.findStoreItems = (0, ai_1.defineTool)({
    name: 'findStoreItems',
    description: 'used to locate the aisle of items in the store that need to be purchased for a recipie or as part of a shopppers trip to a store. name is the item name and category is the likely category that item would reside in wihtin a supermarket',
    inputSchema: zod_1.z.object({ itemName: zod_1.z.string().describe('the name of the item'), itemCategory: zod_1.z.string().describe('the likely category this item lives in') }),
    outputSchema: zod_1.z.object({
        name: zod_1.z.string(),
        aisle: zod_1.z.number(),
        msrp: zod_1.z.number(),
    }).array()
}, async (input) => {
    const result = await (0, dc_1.listStoreItems)(dc, { query: `NAME: ${input.itemName} CATEGORY: ${input.itemCategory}` });
    return result.data.storeItems_descEmbedding_similarity;
});
exports.ingredientReplacement = (0, ai_1.defineTool)({
    name: 'ingredientReplacement',
    description: 'used to generate a replacement or alternative ingredient',
    inputSchema: zod_1.z.object({ outOfStockIngredient: zod_1.z.string() }),
    outputSchema: zod_1.z.object({
        alternatives: zod_1.z.string().array().describe('a list of ingredients that are suitable to replace the outOfStockIngredient'),
    })
}, async (input) => {
    const result = await (0, ai_1.generate)({
        model: vertexai_1.gemini15Pro,
        prompt: `
    Fetch a list of possible alternatives for ${input.outOfStockIngredient}
    `,
        output: {
            format: "json",
            schema: zod_1.z.object({
                alternatives: zod_1.z.string().array().describe('a list of ingredients that are suitable to replace the outOfStockIngredient'),
            }),
        },
    });
    if (result.output() == null) {
        return { alternatives: [], };
    }
    return { alternatives: result.output().alternatives };
});
//# sourceMappingURL=grocerTools.js.map