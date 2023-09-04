const { User} = require("../db");
const { Op, Sequelize } = require("sequelize");



const getUserByIdController = async (req) => {
   const { id } = req.query;
try {
  const assets = await Asset.findOne({where: {id : id}});
  
  return assets;

} catch (error) {
  console.log(error)
 throw new Error ("Error en el getUserByIdController")
}
  
};
//!------------------------------------------------------------------------
const getAllUserController = async () => {
 try {
  const users = await User.findAll()

  if (users.length === 0) {
    throw new Error("No hay usuarios registrados!");
  }
  return users;

 } catch (error) {
  console.log(error)
 throw new Error ("Error en el getAllUserController")
 }
}

//!------------------------------------------------------------------------
const updateAsset = async (
  id,
  name,
  description,
  images,
  onSale,
  sellPrice,
  rentPrice,
  rooms,
  bathrooms,
  coveredArea,
  amenities
) => {
  const updateAsset = await Asset.findOne({
    where: { id: id },
    include: Amenity,
  });
  await updateAsset.update({
    name,
    description,
    images,
    onSale,
    sellPrice,
    rentPrice,
    rooms,
    bathrooms,
    coveredArea,
    amenities,
  });
  if (amenities) {
    const amenitiesToUpdate = await Amenity.findAll({
      where: { id: amenities },
    });
    await updateAsset.setAmenities(amenitiesToUpdate);
  }
  return updateAsset;
};

//!------------------------------------------------------------------------
const createUserController = async (
  userName,
      fullName,
      profilePic,
      birthDate,
      phoneNumber,
      verificationNumber,
      gender,
      address,
      nationality,
      email,
      password,
      landlord
) => {
  try {
    if (
      !userName ||
      !fullName ||
      !birthDate ||
      !phoneNumber ||
      !gender ||
      !address ||
      !nationality ||
      !email ||
      !password ||
      !landlord
    ) {}
    
    
    
    return createdAsset;
  } catch (error) {
    console.log(error);
    throw new Error("Error al registrar la propiedad");
  }
};

const deleteAssetById = async (id) => {
  //TODO agregar borrado logico
  const asset = await Asset.findOne({
    where: {
      id: id,
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }
  await asset.destroy();

  return "Asset deleted successfully";
};

const getAllLocations = async () => {
  try {
    const allAssets = await Asset.findAll();
    // console.log(allAssets)
    const response = filterLocation(allAssets);
    // console.log(response)
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las locaciones");
  }
};

const getAllAmenities = async () => {
  try {
    const allAmenities = await Amenity.findAll();

    return allAmenities;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las amenities");
  }
};

module.exports = {
  getUserByIdController,
  getAllUserController,

};
