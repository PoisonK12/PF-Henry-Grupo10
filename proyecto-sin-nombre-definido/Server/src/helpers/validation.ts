const { z } = require('zod')

const urlRegExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const dataSchemePost = z.object({
  body: z.object({
    name: z.string({
      message: "String data is required(name)"
    }),
    description: z.string({
      message: "String data is required(description)"
    },),
    address: z.string({
      message: "String data is required(address)"
    }),
    location: z.string({
      message: "String data is required(location)"
    }),
    country: z.string({
      message: "String data is required(country)"
    }),
    images: z.array(z.string().refine(url => urlRegExp.test(url), {
        message: "Invalid URL format"})).min(3, {
    message: "At least 3 pictures are required"
  }),

    onSale: z.boolean(),

    sellPrice: z.number().positive().int(),

    rentPrice: z.number().positive().int(),

    rooms: z.number().gte(1, {
      message: "At least a room is required"
    }),
    bathrooms: z.number().gte(1, {
      message: "At least a room is required"
    }),
    coveredArea: z.number().positive(),

    totalArea: z.number().positive(),
    
    // amenities: z.array(z.num()).min(5, {
    //   message: "Should have at least 5 amenities selected"
    // }),
  })
})

const dataSchemePut = ""

module.exports = {
  dataSchemePost,
  dataSchemePut
}