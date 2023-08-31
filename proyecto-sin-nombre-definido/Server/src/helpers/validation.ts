const { z } = require('zod')

const dataSchemePost = z.object({
  body: z.object({
    name: z.string({
      message: "String data is required"
    }),
    description: z.string({
      message: "String data is required"
    }, ),
    address: z.string({
      message: "String data is required"
    }),
    location: z.string({
      message: "String data is required"
    }),
    country: z.string({
      message: "String data is required"
    }),
    images: z.array(z.url()).min(3, { message: "At least 3 pictures are required" }),
    onSale: z.boolean(),
    sellPrice: z.number().int(),
    rentPrice: z.number().int(),
    rooms: z.number().gte(1, { message: "At least a room is required" }),
    bathrooms: z.number().gte(1, { message: "At least a room is required" }),
    coveredArea: z.number().positive(),
    totalArea: z.number().positive(),
    amenities: z.array(z.string()).min(5, "Should have at least 5 amenities selected"),
  })
})

const dataSchemePut = ""

module.exports = {
  dataSchemePost,
  dataSchemePut
}