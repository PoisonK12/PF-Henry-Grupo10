const { userSchemePost } = require("../helpers/reviewValidation.ts");

const {
  getReviewByIdController,
  getAllReviewController,
  deleteReviewById,
  reviewUserController,
  reviewAssetController,
  updateReview,
} = require("../controllers/reviewController.js");

const getReviewByIdHandler = async (req, res) => {
  try {
    const response = await getReviewByIdController(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
};

const reviewAssetHandler = async (req, res) => {
  const { userName, score, comment, id } = req.body;

  try {
    const response = await reviewAssetController(userName, score, comment, id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
};

const reviewUserHandler = async (req, res) => {
  const { userName, score, comment, id } = req.body;
  try {
    const review = await reviewUserController(userName, score, comment, id);
    res.status(200).json(`Review ${userName} creado con exito!`);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: message.error });
  }
};

const getReviewHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const review = id
      ? await getReviewByIdController(id)
      : getAllReviewController();
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(404).json("Error encontrando el review!");
  }
};

const updateReviewHandler = async (req, res) => {
  const {
    userName,
    //edicion por usuario
    comment,
    //edicion por sistema
    score,
  } = req.body;

  try {
    await updateReview(
      userName,
      //edicion por usuario
      comment,
      //edicion por sistema
      score
    );
    res.status(200).json("Review editado con exito!");
  } catch (error) {
    console.log(error);
    res.status(404).json("Error editando el review!");
  }
};

const reviewDeleteOrBanHandler = async (req, res) => {
  const { id } = req.params;
  //por seguridad hay que modificarlo para recibirlo por body
  try {
    await deleteReviewById(id);

    res.status(200).json(`La review fue eliminada`);
  } catch (error) {
    console.log(error);
    res.status(404).json("Error eliminando la review!");
  }
};

module.exports = {
  getReviewHandler,
  updateReviewHandler,
  reviewDeleteOrBanHandler,
  getReviewByIdHandler,
  reviewUserHandler,
  reviewAssetHandler,
};
