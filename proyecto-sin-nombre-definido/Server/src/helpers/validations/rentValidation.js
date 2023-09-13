const { z } = require("zod");

const rentSchemePost = z.object({
  body: z.object({
    onSale: z.boolean(),

    user: z.string({
      message: "String data is required(user)",
    }),
    asset: z.string({
      message: "String data is required(asset)",
    }),
   
    checkIn:"",

    checkInTime:"",

    checkOut: "",
        
    checkOutTime:"",
      
    price:"",
        
    termCon:"",

    paymentMethod:"",
    
    guest:"",

    guestName: "",
    
    guestPhoneNumber:"",

    sellPrice: z.number().positive().int(),

    rentPrice: z.number().positive().int(),

    rooms: z.number().gte(1, {
      message: "At least a room is required",
    }),
    bathrooms: z.number().gte(1, {
      message: "At least a room is required",
    }),
    averageScore: z.number().positive(),
    coveredArea: z.number().positive(),
    totalArea: z.number().positive(),
    // coordenates: z.array(z.number()),

    amenities: z
      .array(z.number())
      .min(5, {
        message: "Should have at least 5 amenities selected",
      })
      .max(30, { message: "Can't have more than 30 amenities" }),
  }),
});


module.exports = {
  rentSchemePost,
};
