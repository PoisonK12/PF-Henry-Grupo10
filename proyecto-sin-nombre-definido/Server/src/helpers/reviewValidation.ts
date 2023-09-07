const { z } = require("zod");

const dataSchemePost = z.object({
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

const dataSchemePut = "";

module.exports = {
    dataSchemePost,
    dataSchemePut,
};