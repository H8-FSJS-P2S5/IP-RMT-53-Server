const gemini = require('../helper/geminiAi');

exports.gemini = async (req, res, next) => {
  const { post1, post2 } = req.body;
  try {
    let data = await gemini( post1, post2 );

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
