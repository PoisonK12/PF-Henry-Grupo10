const { z } = require("zod");

const userSchemePost = z.object({
  body: z.object({
    userName: z.string({
      message: "String data is required(userName)",
    }),
    fullName: z.string({
      message: "String data is required(fullName)",
    }),
    birthDate: z
      .string()
      .datetime({ message: "Invalid datetime string! Must be UTC." }),
    phoneNumber: z.string({
      message: "String data is required(phoneNumber)",
    }),
    verificationNumber: z.string({
      message: "String data is required(verificationNumber)",
    }),

    profilePic: z.string().url({ message: "Invalid URL format" }),

    gender: z.enum(["Male", "Female", "agender", "No aNo binary"]),

    address: z.string({
      message: "String data is required(address)",
    }),
    nationality: z.enum(["Argentina", "Mexico", "Colombia", "Venezuela"]),

    email: z.string().email({
      message: "String data is required(email)",
    }),

    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),

    landLord: z.boolean(),

    admin: z.boolean(),

    averageScore: z.number().positive(),
    numberOfReviews: z.number().positive(),

    favorites: z.array(z.string()),

    history: z.array(z.string()),
  }),
});

const userSchemePut = "";

module.exports = {
  userSchemePost,
  userSchemePut,
};
