require("dotenv").config();
const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require("@jest/globals");
const request = require("supertest");
const { app } = require("../app");
const { Monster, User, UserFavorite, Image, sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

let access_token;

const monsterId = "1";
const monsterEg = {
  _id: "1",
  type: "large",
  species: "elder dragon",
  name: "Safi'jiiva",
  description:
    "The fully-grown form of Xeno'jiiva. It absorbs energy from its environment to heal itself and change the ecosystem.",
  imageUrl:
    "https://static.wikia.nocookie.net/monsterhunterworld_gamepedia_en/images/3/37/MHWI_Brachydios_Icon.png",
};

beforeAll(async () => {
  // console.log("<<< beforeAll");
  try {
    const dataUser = require("../data/user.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      e.password = hashPassword(e.password);
      return e;
    });

    // const dataImage = require("../data/image.json").map((e) => {
    //   e.createdAt = e.updatedAt = new Date();
    //   return e;
    // });

    const dataFavorite = require("../data/userFavorite.json").map((e) => {
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await sequelize.queryInterface.bulkInsert("Users", dataUser, {});
    const user = await User.findOne({
      where: {
        email: "admin@mail.com",
      },
    });
    access_token = signToken({ id: user.id });

    // await sequelize.queryInterface.bulkInsert("Images", dataImage, {});

    await sequelize.queryInterface.bulkInsert(
      "UserFavorites",
      dataFavorite,
      {}
    );
  } catch (err) {
    console.log(err, "<<< err beforeAll");
  }
});

afterAll(async () => {
  // console.log("<<< afterAll");
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  // await Image.destroy({
  //   truncate: true,
  //   restartIdentity: true,
  //   cascade: true,
  // });
  await UserFavorite.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await sequelize.close();
});

describe("GET /monster", () => {
  test("Berhasil mendapatkan list monster", async () => {
    const response = await request(app)
      .get("/monsters")
      .set("Authorization", `Bearer ${access_token}`)
      .expect(200);

    expect(response.body).toHaveProperty("data");
  });
});

// describe("GET /monster/:id", () => {
//   test("Berhasil mendapatkan monster berdasarkan ID", async () => {
//     const response = await request(app)
//       .get(`/monster/${id}`)
//       .set("Authorization", `Bearer ${access_token}`)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.body).toHaveProperty("id", id);
//   });
// });

describe("GET /monster/:id", () => {
  test("Berhasil mendapatkan monster berdasarkan ID", async () => {
    const response = await request(app)
      .get(`/monsters/${monsterId}`)
      .set("Authorization", `Bearer ${access_token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("Status:", response.status);
    console.log("Response Body:", response.body);

    expect(response.body.data).toHaveProperty("id", Number(monsterId));
  });
});
