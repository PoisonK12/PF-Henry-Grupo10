const { Review } = require("../db");
const { Op, Sequelize } = require("sequelize");
const {
  updateUser,
  getUserByIdController,
} = require("../controllers/userController");
const { response } = require("express");

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

//!---------------------------------evaluador-texto--puntos-evaluado---------------------------------
const reviewUserController = async (userName, comment, score, id) => {
  try {
    const response = await getUserByIdController(id);
    res, startus(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
  console.log(response);
  const { averageScore, numberOfReviews } = response;
  try {
    await updateUser(id, averageScore, numberOfReviews);
    res, startus(200).json(response);
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
  try {
    //! validacion
    //! hash
    // password = hash(password);

    const createdReview = await Review.create({
      userName,
      comment,
      score,
    });

    const findUser = await User.findOne({
      where: { id: id },
    });

    if (findUser) {
      await createdReview.addUser(findUser);
    }

    res.status(200).json(`Exito al crear la review ${userName}`);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "La review de ese usuario ya existe." });
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
