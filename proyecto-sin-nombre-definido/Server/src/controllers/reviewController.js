const { Review, User } = require("../db");
const { Op, Sequelize } = require("sequelize");
const { getAssetById, updateAsset } = require("../controllers/assetController");
const {
  updateReviewUser,
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
const reviewUserController = async (userName, score, comment, id) => {
  try {
    const response = await getUserByIdController(id);
    let { averageScore, numberOfReviews } = response;

    const suma = averageScore * numberOfReviews + score;
    averageScore = suma / (numberOfReviews + 1);
    numberOfReviews = numberOfReviews + 1;

    await updateReviewUser(id, averageScore, numberOfReviews);
    // return response;
  } catch (error) {
    console.log(error);
  }
  try {
    const findUser = await User.findByPk(id);

    if (findUser) {
      const createdReview = await Review.create({
        userName,
        score,
        comment,
      });
      // console.log(90000000000000000000);
      // console.log(findUser);
      await findUser.addReview(createdReview);
      return `Exito al crear la review de ${findUser.userName}, ${userName}`;
    }

    res.status(500).json(`Mala mia`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//!---------------------------------evaluador-texto--puntos-evaluada---------------------------------
const reviewAssetController = async (userName, comment, score, id) => {
  try {
    const response = await getAssetById(id);
    res.status(200).json(response);
    console.log(response);

    console.log(response);
    const { averageScore, numberOfReviews } = response;

    await updateAsset(id, averageScore, numberOfReviews);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: message.error });
  }
  try {
    const findAsset = await Asset.findOne({
      where: { id: id },
    });

    if (findAsset) {
      const createdReview = await Review.create({
        userName,
        comment,
        score,
      });

      await createdReview.addAsset(findAsset);
      res
        .status(200)
        .json(`Exito al crear la review de ${findAsset.name}, ${userName}`);
    }

    res.status(500).json(`Mala mia`);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: message.error });
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
  updateReview,
  reviewUserController,
  reviewAssetController,
};
