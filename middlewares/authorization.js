// const { User } = require("../models");

async function guardAdmin(req, res, next) {
  try {
    // console.log(guardAdmin, req.params);
    console.log("<<< mulai guardAdmin");
    console.log("role yang lagi akses:", req.user.role);
    console.log("<<< selesai guardAdmin");
    if (req.user.role !== "admin") {
      next({ name: "Forbidden", message: "You are not authorized" });
      return;
    }
    next();
  } catch (err) {
    console.log(err, "<<< from guardAdmin");
    next(err);
  }
}

module.exports = { guardAdmin };
