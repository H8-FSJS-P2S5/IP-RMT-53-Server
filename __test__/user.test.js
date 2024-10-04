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

describe("POST /login", () => {
  test("Berhasil login dan mengirimkan access token", async () => {
    const login = {
      // email dan passwd benar
      email: "admin@mail.com",
      password: "admin1234",
    };
    const response = await request(app).post("/login").send(login);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  test("Email tidak diberikan / tidak diinput", async () => {
    const login = {
      email: "", // email kosong
      password: "admin1234",
    };
    const response = await request(app).post("/login").send(login);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("Password tidak diberikan / tidak diinput", async () => {
    const login = {
      email: "admin@mail.com",
      password: "", // passwd kosong
    };
    const response = await request(app).post("/login").send(login);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("Email diberikan invalid / tidak terdaftar", async () => {
    const login = {
      email: "tralala@mail.com", // email salah
      password: "admin1234",
    };
    const response = await request(app).post("/login").send(login);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });

  test("Password diberikan salah / tidak match", async () => {
    const login = {
      email: "admin@mail.com",
      password: "98765", // passwd salah
    };
    const response = await request(app).post("/login").send(login);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("POST /register", () => {
  test("Berhasil menambahkan user", async () => {
    const response = await request(app).post("/register").send({
      username: "userTest",
      email: "userTest@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username", "userTest");
    expect(response.body).toHaveProperty("email", "userTest@mail.com");
  });

  test("Berhasil mengembalikan error jika email sudah terdaftar", async () => {
    await User.create({
      username: "userTest2",
      email: "userTest2@mail.com",
      password: "123456",
    });

    const response = await request(app).post("/register").send({
      username: "userTest2",
      email: "userTest2@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
