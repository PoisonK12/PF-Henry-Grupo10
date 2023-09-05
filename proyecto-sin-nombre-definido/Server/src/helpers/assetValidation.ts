const { z } = require("zod");

const dataSchemePost = z.object({
  body: z.object({
    name: z.string({
      message: "String data is required(name)",
    }),
    description: z.string({
      message: "String data is required(description)",
    }),
    address: z.string({
      message: "String data is required(address)",
    }),
    location: z.string({
      message: "String data is required(location)",
    }),
    country: z.string({
      message: "String data is required(country)",
    }),

    images: z
      .array(z.string().url({ message: "Invalid URL format" }))
      .min(1, {
        message: "At least 1 pictures is required",
      })
      .max(3, {
        message: "A maximum of 3 pictures are required",
      }),

    onSale: z.boolean(),

    sellPrice: z.number().positive().int(),

    rentPrice: z.number().positive().int(),

    rooms: z.number().gte(1, {
      message: "At least a room is required",
    }),
    bathrooms: z.number().gte(1, {
      message: "At least a room is required",
    }),
    averageScore: z.arrayz(z.number().positive()),
    coveredArea: z.number().positive(),
    totalArea: z.number().positive(),
    // coordenates: z.array(z.number()),

    amenities: z
      .array(z.num())
      .min(5, {
        message: "Should have at least 5 amenities selected",
      })
      .max(30, { message: "Can't have more than 30 amenities" }),
  }),
});

const dataSchemePut = "";

module.exports = {
  dataSchemePost,
  dataSchemePut,
};
