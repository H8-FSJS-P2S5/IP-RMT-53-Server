const { Monster, Image, Sequelize } = require("../models");
const { Op } = Sequelize;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = class MonsterController {
  static async getAllMonster(req, res, next) {
    const { q, filter, page, sort } = req.query;
    const paramQuerySQL = {
      limit: 12,
      offset: 0,
      where: {},
      include: {
        model: Image,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    };

    // Search
    // http://localhost:3000/monster?q=rath
    if (q) {
      paramQuerySQL.where.name = {
        [Op.iLike]: `%${q}%`,
      };
    }

    // Filter
    // http://localhost:3000/monster?filter[species]=herbivore
    if (filter && filter.species) {
      paramQuerySQL.where.species = {
        [Op.iLike]: `%${filter.species}%`,
      };
    }

    // Pagination
    // http://localhost:3000/monster?page[number]=1&page[size]=5
    if (page) {
      if (page.size) {
        paramQuerySQL.limit = page.size;
      }
      if (page.number) {
        paramQuerySQL.offset =
          page.number * paramQuerySQL.limit - paramQuerySQL.limit;
      }
    }

    // Sort
    // http://localhost:3000/monster?sort=name
    if (sort) {
      let columnName = "name";
      let ordering = "ASC";
      if (sort[0] === "-") {
        ordering = "DESC";
      }

      paramQuerySQL.order = [[columnName, ordering]];
    }

    try {
      const { rows, count } = await Monster.findAndCountAll(paramQuerySQL);

      const formattedData = rows.map((monster) => {
        const imageUrl = monster.Image.imageUrl.split("/revision/")[0];

        return {
          id: monster.id,
          type: monster.type,
          species: monster.species,
          name: monster.name,
          description: monster.description,
          imageUrl: imageUrl,
        };
      });

      res.status(200).json({
        data: formattedData,
        totalPages: Math.ceil(count / paramQuerySQL.limit),
        currentPage: Number(page?.number || 1),
        totalData: count,
        dataPerPage: +paramQuerySQL.limit,
      });
    } catch (err) {
      console.log(err, "<<< err getAllMonster");
      next(err);
    }
  }

  static async getPerMonster(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Monster.findByPk(id, {
        include: {
          model: Image,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!data) {
        next({
          name: "NotFound",
          message: `Monster with id:${id} is not found`,
        });
        return;
      }
      const imageUrl = data.Image.imageUrl.split("/revision/")[0];

      const formattedData = {
        id: data.id,
        type: data.type,
        species: data.species,
        name: data.name,
        description: data.description,
        imageUrl: imageUrl,
      };

      res.status(200).json({ data: formattedData, message: "success" });
    } catch (err) {
      console.log(err, "<<< err getPerMonster");
      next(err);
    }
  }

  static async uploadImgById(req, res, next) {
    try {
      console.log(req.file);
      const monsterId = +req.params.id;
      const data = await Image.findByPk(monsterId);
      if (!data) {
        next({
          name: "NotFound",
          message: `Monster with id:${monsterId} is not found`,
        });
        return;
      }
      const mimeType = req.file.mimetype;
      const base64Image = req.file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`,
        {
          folder: "IP-repeat",
          public_id: req.file.originalname,
        }
      );
      await data.update({ imageUrl: result.secure_url });
      res.json({
        message: `Image url on monster with id:${monsterId} has been updated`,
      });
    } catch (err) {
      console.log(err, "<<< err uploadImgById");
      next(err);
    }
  }

  static async coba(req, res, next) {
    try {
      const data = await Image.findAll();
      res.status(200).json({ data: data });
    } catch (err) {
      next(err);
    }
  }
};
