import { defineTool } from "@genkit-ai/ai/tool";
import {
  getUserById,
  listOrders,
  listOrdersByDateRange,
  listProducts,
  listReviews,
  listReviewsByDateRange,
  listUsers,
} from "@restaurants/dc";
import { z } from "zod";
import { getDataconnectClient } from "../config/dataconnect";

const dc = getDataconnectClient();

export const getAllReviews = defineTool(
  {
    name: "listReviews",
    description:
      "Get all reviews for the restaurant, review text includes information about ambiance, wait staff, service, and may contain information about the food items. Used to analyze review text for information",
    // Define input and output schema so the model knows how to use the tool
    inputSchema: z.object({}),
    outputSchema: z
      .object({
        rid: z.string().describe("review id"),
        user: z.object({ uid: z.string().describe("user id of the reviewer") }),
        text: z
          .string()
          .describe(
            "review text, includes information about ambiance, wait staff, service, and may contain information about the food items"
          ),
        date: z.string().describe("date of the review"),
      })
      .array(),
  },
  async () => {
    return (await listReviews(dc)).data.reviews;
  }
);

export const getAllOrders = defineTool(
  {
    name: "listOrders",
    description:
      "Get all orders / sales for the restaurant that include which items were sold and in what quantity and at what price",
    // Define input and output schema so the model knows how to use the tool
    inputSchema: z.object({}),
    outputSchema: z
      .object({
        sid: z.string().describe("sale id"),
        product: z.object({
          name: z.string().describe("name of the item sold"),
        }),
        date: z.string().describe("date of the sale / order"),
        quantity: z.number().describe("how many of the specific item was sold in this sale"),
      })
      .array(),
  },
  async () => {
    return (await listOrders(dc)).data.orders;
  }
);

export const userById = defineTool(
  {
    name: "getUserById",
    description: "get a specific user by their ID",
    inputSchema: z.object({ userId: z.string() }),
    outputSchema: z.unknown(),
  },
  async (input) => {
    return await getUserById(dc, { uid: input.userId });
  }
);

export const reviewsDateRange = defineTool(
  {
    name: "listReviewsByDateRange",
    description:
      "get a list of all reviews that fall within a specific date range. the input dates must be in the format YYYY-MM-DD",
    inputSchema: z.object({ startDate: z.string(), endDate: z.string() }),
    outputSchema: z
      .object({
        rid: z.string().describe("review id"),
        user: z.object({ uid: z.string().describe("user id of the reviewer") }),
        text: z
          .string()
          .describe(
            "review text, includes information about ambiance, wait staff, service, and may contain information about the food items"
          ),
        date: z.string().describe("date of the review"),
      })
      .array(),
  },
  async (input) => {
    return (
      await listReviewsByDateRange(dc, { startDate: input.startDate, endDate: input.endDate })
    ).data.reviews;
  }
);

export const ordersByDateRange = defineTool(
  {
    name: "listOrdersByDateRange",
    description:
      "get a list of all orders (also known as sales) that fall within a specific date range. the input dates must be in the format YYYY-MM-DD, output includes which items were sold and in what quantity and at what price",
    inputSchema: z.object({ startDate: z.string(), endDate: z.string() }),
    outputSchema: z
      .object({
        sid: z.string().describe("sale id"),
        product: z.object({
          name: z.string().describe("name of the item sold"),
          price: z.number().describe("price of the item sold"),
        }),
        date: z.string().describe("date of the sale / order"),
        quantity: z.number().describe("how many of the specific item was sold in this sale"),
      })
      .array(),
  },
  async (input) => {
    return (await listOrdersByDateRange(dc, { startDate: input.startDate, endDate: input.endDate }))
      .data.orders;
  }
);

export const listAllUsers = defineTool(
  {
    name: "listAllUsers",
    description: "get a list of all users",
    inputSchema: z.object({}),
    outputSchema: z.unknown(),
  },
  async () => {
    return await listUsers(dc);
  }
);

export const listAllProducts = defineTool(
  {
    name: "listAllProducts",
    description: "get a list of all products",
    inputSchema: z.object({}),
    outputSchema: z.unknown(),
  },
  async () => {
    return await listProducts(dc);
  }
);
