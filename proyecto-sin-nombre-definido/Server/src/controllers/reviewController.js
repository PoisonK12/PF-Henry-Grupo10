const { Review } = require("../db");
const { Op, Sequelize } = require("sequelize");

const getReviewByIdController = async (req) => {
  const { id } = req.query;
  try {
    const response = await Review.findOne({ where: { id: id } });

    return response;
  } catch (error) {
    console.error(error.message);
  }
};
//!------------------------------------------------------------------------
const getAllReviewController = async () => {
  try {
    const response = await Review.findAll();

    if (response.length === 0) {
      throw new Error("No hay reviews registrados!");
    }
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

//!------------------------------------------------------------------------
const updateReview = async (
  userName,
  //edicion por usuario
  comment,
  //edicion por sistema
  score
) => {
  const updateReview = await User.findOne({
    where: { userName: userName },
  });
  await updateReview.update({
    //edicion por usuario
    comment,
    //edicion por sistema
    score,
  });

  return updateReview;
};

//!------------------------------------------------------------------------
const reviewUserController = async (userName, comment, score, id) => {
  try {
  } catch (error) {}

  try {
    if (!userName || !comment || !score) {
      return res.status(400).json({ error: "Falta informacion obligatoria" });
    }

    //! validacion
    //! hash
    // password = hash(password);

    const [createdReview, created] = await Review.findOrCreate({
      where: { userName },
      defaults: {
        comment,
        score,
      },
    });
    if (!created) {
      return res
        .status(400)
        .json({ error: "La review de ese usuario ya existe." });
    }

    return res.status(200).json(`Exito al crear la review ${userName}`);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteReviewById = async (id) => {
  //TODO agregar borrado logico
  const review = await Review.findOne({
    where: {
      id: id,
    },
  });

  if (!review) {
    throw new Error("Review no encontrada");
  }
  await review.destroy();

  return "Review eliminado con exito";
};

module.exports = {
  getReviewByIdController,
  getAllReviewController,
  deleteReviewById,
  reviewUserController,
  updateReview,
};
