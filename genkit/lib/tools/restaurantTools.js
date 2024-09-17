"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllProducts = exports.listAllUsers = exports.ordersByDateRange = exports.reviewsDateRange = exports.userById = exports.getAllOrders = exports.getAllReviews = void 0;
const tool_1 = require("@genkit-ai/ai/tool");
const dc_1 = require("@restaurants/dc");
const zod_1 = require("zod");
const dataconnect_1 = require("../config/dataconnect");
const dc = (0, dataconnect_1.getDataconnectClient)();
exports.getAllReviews = (0, tool_1.defineTool)({
    name: "listReviews",
    description: "Get all reviews for the restaurant, review text includes information about ambiance, wait staff, service, and may contain information about the food items. Used to analyze review text for information",
    // Define input and output schema so the model knows how to use the tool
    inputSchema: zod_1.z.object({}),
    outputSchema: zod_1.z
        .object({
        rid: zod_1.z.string().describe("review id"),
        user: zod_1.z.object({ uid: zod_1.z.string().describe("user id of the reviewer") }),
        text: zod_1.z
            .string()
            .describe("review text, includes information about ambiance, wait staff, service, and may contain information about the food items"),
        date: zod_1.z.string().describe("date of the review"),
    })
        .array(),
}, async () => {
    return (await (0, dc_1.listReviews)(dc)).data.reviews;
});
exports.getAllOrders = (0, tool_1.defineTool)({
    name: "listOrders",
    description: "Get all orders / sales for the restaurant that include which items were sold and in what quantity and at what price",
    // Define input and output schema so the model knows how to use the tool
    inputSchema: zod_1.z.object({}),
    outputSchema: zod_1.z
        .object({
        sid: zod_1.z.string().describe("sale id"),
        product: zod_1.z.object({
            name: zod_1.z.string().describe("name of the item sold"),
        }),
        date: zod_1.z.string().describe("date of the sale / order"),
        quantity: zod_1.z.number().describe("how many of the specific item was sold in this sale"),
    })
        .array(),
}, async () => {
    return (await (0, dc_1.listOrders)(dc)).data.orders;
});
exports.userById = (0, tool_1.defineTool)({
    name: "getUserById",
    description: "get a specific user by their ID",
    inputSchema: zod_1.z.object({ userId: zod_1.z.string() }),
    outputSchema: zod_1.z.unknown(),
}, async (input) => {
    return await (0, dc_1.getUserById)(dc, { uid: input.userId });
});
exports.reviewsDateRange = (0, tool_1.defineTool)({
    name: "listReviewsByDateRange",
    description: "get a list of all reviews that fall within a specific date range. the input dates must be in the format YYYY-MM-DD",
    inputSchema: zod_1.z.object({ startDate: zod_1.z.string(), endDate: zod_1.z.string() }),
    outputSchema: zod_1.z
        .object({
        rid: zod_1.z.string().describe("review id"),
        user: zod_1.z.object({ uid: zod_1.z.string().describe("user id of the reviewer") }),
        text: zod_1.z
            .string()
            .describe("review text, includes information about ambiance, wait staff, service, and may contain information about the food items"),
        date: zod_1.z.string().describe("date of the review"),
    })
        .array(),
}, async (input) => {
    return (await (0, dc_1.listReviewsByDateRange)(dc, { startDate: input.startDate, endDate: input.endDate })).data.reviews;
});
exports.ordersByDateRange = (0, tool_1.defineTool)({
    name: "listOrdersByDateRange",
    description: "get a list of all orders (also known as sales) that fall within a specific date range. the input dates must be in the format YYYY-MM-DD, output includes which items were sold and in what quantity and at what price",
    inputSchema: zod_1.z.object({ startDate: zod_1.z.string(), endDate: zod_1.z.string() }),
    outputSchema: zod_1.z
        .object({
        sid: zod_1.z.string().describe("sale id"),
        product: zod_1.z.object({
            name: zod_1.z.string().describe("name of the item sold"),
            price: zod_1.z.number().describe("price of the item sold"),
        }),
        date: zod_1.z.string().describe("date of the sale / order"),
        quantity: zod_1.z.number().describe("how many of the specific item was sold in this sale"),
    })
        .array(),
}, async (input) => {
    return (await (0, dc_1.listOrdersByDateRange)(dc, { startDate: input.startDate, endDate: input.endDate }))
        .data.orders;
});
exports.listAllUsers = (0, tool_1.defineTool)({
    name: "listAllUsers",
    description: "get a list of all users",
    inputSchema: zod_1.z.object({}),
    outputSchema: zod_1.z.unknown(),
}, async () => {
    return await (0, dc_1.listUsers)(dc);
});
exports.listAllProducts = (0, tool_1.defineTool)({
    name: "listAllProducts",
    description: "get a list of all products",
    inputSchema: zod_1.z.object({}),
    outputSchema: zod_1.z.unknown(),
}, async () => {
    return await (0, dc_1.listProducts)(dc);
});
//# sourceMappingURL=restaurantTools.js.map