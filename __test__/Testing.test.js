const request = require("supertest");
const app = require("../app"); // Assuming app.js is your Express app
const { User } = require("../models");
const { generateToken } = require("../helper/Jwt");
const { compare } = require("../helper/bcrypt");

// Mock Google OAuth2Client
const { OAuth2Client } = require("google-auth-library");
jest.mock("google-auth-library");

describe("User Authentication", () => {
  let mockUser;

  beforeAll(async () => {
    mockUser = await User.create({
      email: "testuser@example.com",
      password: "testpassword123", // Make sure bcrypt hash is used
    });
  });

  afterAll(async () => {
    await User.destroy({ where: { email: "testuser@example.com" } });
  });

  describe("POST /user/register", () => {
    it("should register a new user and return a success message", async () => {
      const res = await request(app)
        .post("/user/register")
        .send({ email: "newuser@example.com", password: "password123" });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("your data has been created");
    });

    it("should throw an error if registration fails", async () => {
      jest.spyOn(User, "create").mockRejectedValueOnce(new Error("Database error"));

      const res = await request(app)
        .post("/user/register")
        .send({ email: "invaliduser@example.com", password: "password123" });

      expect(res.statusCode).toBe(500); // assuming your error handling middleware catches it
      expect(res.body.message).toBe("Internet Server Error");
    });
  });

  describe("POST /login", () => {
    it("should log in with correct credentials and return a token", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "testuser@example.com", password: "testpassword123" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("access_token");
    });

    it("should return 401 for incorrect credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "wrong@example.com", password: "wrongpassword" });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe("Email or Password wrong");
    });

    it("should return 400 if email or password is missing", async () => {
      const res = await request(app).post("/login").send({ email: "", password: "" });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Please input your email correctly");
    });
  });

  describe("POST /login/google", () => {
    beforeEach(() => {
      OAuth2Client.mockClear();
    });

    it("should log in with Google and return a token", async () => {
      const mockGoogleToken = "mockGoogleToken";
      const mockPayload = { email: "testuser@example.com", username: "testuser" };

      OAuth2Client.prototype.verifyIdToken.mockResolvedValueOnce({
        getPayload: () => mockPayload,
      });

      const res = await request(app)
        .post("/login/google")
        .send({ googleToken: mockGoogleToken });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("access_token");
    });

    it("should return 500 if Google login fails", async () => {
      OAuth2Client.prototype.verifyIdToken.mockRejectedValueOnce(new Error("Google auth failed"));

      const res = await request(app).post("/login/google").send({ googleToken: "invalidToken" });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe("Internet Server Error");
    });
  });
});
