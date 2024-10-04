const { gemini } = require("../helpers/gemini");

module.exports = class GeminiController {
  static async generate(req, res, next) {
    console.log("Request received");
    console.log(req.headers, "<<< headers dari request");
    console.log(req.body, "<<< body dari request");
    try {
      const { monsterName } = req.body;
      console.log(monsterName, "<<< monsterName from request");

      const description = await gemini(monsterName);
      console.log(description, "<<< deskripsi dari AI");
      res.status(200).json({ description });
    } catch (err) {
      console.log(err, "<<< err gemini");
      next(err);
    }
  }
};
