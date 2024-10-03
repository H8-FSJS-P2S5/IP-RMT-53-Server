const request = require("supertest");
const app = require("../app"); // Adjust the path to your Express app
const { User, Anime, AnimeList } = require("../models");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

// Mocking OAuth2Client
jest.mock("google-auth-library")


let userToken;
let user;
let anime;

beforeEach(async () => {
  // Create a mock user for testing before each test
  const user = await User.create({
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  });

  

  userToken = createToken({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  // Create a mock anime
  anime = await Anime.create({
    malId: 123,
    title: "Naruto",
    synopsis: "A story about ninjas...",
    episodes: 24,
    imageUrl: "http://example.com/naruto.jpg",
    score: 8.2,
  });

  // Create a mock anime list entry for the user
  await AnimeList.create({
    userId: user.id,
    animeId: anime.id,
  });
});

afterEach(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await Anime.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await AnimeList.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});


describe("User Routes", () => {
  describe("POST /api/register", () => {
    it("should register a new user and return user details", async () => {
      const userData = {
        username: "newuser",
        email: "new@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/register").send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email", userData.email);
    });

    it("should return validation error if email is missing", async () => {
      const response = await request(app).post("/api/register").send({
        username: "testuser",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Validation Error");
      expect(response.body.messages[0]).toContain("Email cannot be null");
    });

    it("should return validation error if password is missing", async () => {
      const response = await request(app).post("/api/register").send({
        username: "testuser",
        email: "test@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Validation Error");
      expect(response.body.messages[0]).toContain("Password cannot be null");
    });
  });

  describe("POST /api/login", () => {
    it("should login user and return access token", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/login").send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("email");
    });

    it("should return error for invalid credentials", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const response = await request(app).post("/api/login").send(loginData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid credentials");
      expect(response.body.message).toContain("Invalid Email/Password");
    });

    it("should return error if email is missing", async () => {
      const response = await request(app).post("/api/login").send({
        email: "",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Validation Error");
      expect(response.body.messages[0]).toContain("Email is required");
    });

    it("should return error if password is missing", async () => {
      const response = await request(app).post("/api/login").send({
        email: "test@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Validation Error");
      expect(response.body.messages[0]).toContain("Password is required");
    });
  });
});

describe("GET /api/user/me/anime-list", () => {
    test("should get a user's anime list successfully", async () => {
      const response = await request(app)
        .get("/api/user/me/anime-list")
        .set("Authorization", `Bearer ${userToken}`);
  
        const userData = {
            id: 1,
            username: "newuser",
            email: "new@example.com",
            password: "password123",
        };

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            userId: userData.id,
            Anime: expect.objectContaining({
              malId: anime.malId,
              title: anime.title,
              synopsis: anime.synopsis,
              imageUrl: anime.imageUrl,
              score: anime.score,
            }),
          }),
        ])
      );
    });

    

  });

