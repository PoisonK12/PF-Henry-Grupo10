const { z } = require("zod");

const reviewSchemePost = z.object({
  body: z.object({
      comment: z.string({
        message: "String data is required(comment)",
      }),
      userName: z.string({
        message: "String data is required(userName)",
      }),
  
      score: z.number().positive().int({
        message: "Integer data is required(score)",
      })
   
  }),
});

const reviewSchemePut = "";

module.exports = {
    reviewSchemePost,
    reviewSchemePut,
};