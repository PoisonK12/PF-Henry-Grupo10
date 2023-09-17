const { Review, User, Asset } = require("../db");
const { Op, Sequelize } = require("sequelize");
const {
  getAssetById,
  updateAsset,
  updateReviewAsset,
} = require("../controllers/assetController");
const {
  updateReviewUser,
  getUserByIdController,
} = require("../controllers/userController");

const getReviewByIdController = async (req) => {
  const { id } = req.params;
  if (id.length !== 36) {
    try {
      const response = await Review.findAll({
        where: { userName: id },
        attributes: ["score", "comment", "userName", "createdAt"],
      });

      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
  try {
    const response = await Review.findAll({
      include: [
        {
          model: Asset,
          through: {
            where: {
              AssetId: id,
            },
          },
          attributes: [],
        },
      ],
      where: {
        "$Assets.id$": {
          [Op.eq]: id,
        },
      },
      attributes: ["id", "score", "comment", "userName", "createdAt"],
    });

    if (response.length > 0) return response;
    else {
      const response = await Review.findAll({
        include: [
          {
            model: User,
            through: { where: { UserId: id } },
            attributes: [],
          },
        ],
        where: { "$Users.id$": { [Op.eq]: id } },
        attributes: ["id", "score", "comment", "userName", "createdAt"],
      });
      if (response.length > 0) return response;
      return "No hay reviews relacionadas a los datos proporcionados";
    }
  } catch (error) {
    console.error(error.message);
    // throw error;
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
const reviewUserController = async (Pk, userName, score, comment, id) => {
  try {
    const response = await getUserByIdController(id);
    let { averageScore, numberOfReviews } = response;

    const suma = averageScore * numberOfReviews + score;
    averageScore = suma / (numberOfReviews + 1);
    numberOfReviews = numberOfReviews + 1;

    await updateReviewUser(id, averageScore, numberOfReviews);
  } catch (error) {
    console.log(error);
  }
  try {
    const findUser = await User.findByPk(id);
    if (findUser) {
      const toUpdate = await Review.findByPk(Pk);
      await toUpdate.update({
        userName,
        comment,
        score,
      });

      // await findUser.addReview(createdReview);
      return `Exito al crear la review de ${findUser.userName}, ${userName}`;
    }
    res.status(500).json(`Mala mia`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//!---------------------------------evaluador-texto--puntos-evaluada---------------------------------
const reviewAssetController = async (Pk, userName, score, comment, id) => {
  try {
    const response = await getAssetById(id);
    let { averageScore, numberOfReviews } = response;

    const suma = averageScore * numberOfReviews + score;
    averageScore = suma / (numberOfReviews + 1);
    numberOfReviews = numberOfReviews + 1;

    await updateReviewAsset(id, averageScore, numberOfReviews);
  } catch (error) {
    console.log(error);
  }
  try {
    const findAsset = await Asset.findByPk(id);

    if (findAsset) {
      const toUpdate = await Review.findByPk(Pk);
      await toUpdate.update({
        userName,
        score,
        comment,
      });

      // await findAsset.addReview(createdReview);
      return `Exito al crear la review de ${findAsset.name}, ${userName}`;
    }

    return `Mala mia`;
  } catch (error) {
    console.log(error);
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

const emptyAssetReviewCreater = async (userName, id) => {
  try {
    const findAsset = await Asset.findByPk(id);
    console.log(findAsset);

    if (findAsset) {
      const createdReview = await Review.create({
        userName: userName,
        score: 0,
        comment: "",
      });
      await findAsset.addReview(createdReview);
    }
  } catch (error) {
    console.error(error.message);
  }
};
const emptyUserReviewCreater = async (userName, id) => {
  try {
    const findUser = await User.findByPk(id);

    if (findUser) {
      const createdReview = await Review.create({
        userName: userName,
        score: 0,
        comment: "",
      });
      await findUser.addReview(createdReview);
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getReviewByIdController,
  getAllReviewController,
  deleteReviewById,
  updateReview,
  reviewUserController,
  reviewAssetController,
  emptyAssetReviewCreater,
  emptyUserReviewCreater,
};
