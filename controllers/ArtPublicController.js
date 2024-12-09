const { Art } = require("../models");

exports.HomePublic = async (req, res, next) => {
  try {
    let seni = await Art.findAll();
    if (!seni) {
      throw { name: "Not Found", message: "Data Not Found" };
    }
    res.status(200).json({ message: "Here your data", data: seni });
  } catch (err) {
    next(err);
  }
};

exports.details = async (req, res, next) => {
  let { id } = req.params;
  console.log(req.params);
  
  try {
    let seni = await Art.findByPk(id);
    if (!seni) {
      throw { name: "Not Found", message: "Data Not Found" };
    }
    res.status(200).json({ message: "More Details", data: seni });
  } catch (err) {
    next(err);
  }
};
