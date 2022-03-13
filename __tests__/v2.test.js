"use strict";

process.env.SECRET = "toes";

const supertest = require("supertest");
const server = require("../src/server.js").app;
const { db } = require("../src/models/index.js");

const mockRequest = supertest(server);

let users = {
  admin: { username: "admin", password: "password", role: "admin" },
  editor: { username: "editor", password: "password", role: "editor" },
  user: { username: "user", password: "password", role: "user" },
};

// describe("Auth Router", () => {
  beforeAll(async () => {
    await db.sync();
  });
  afterAll(async () => {
    await db.drop();
  });

  Object.keys(users).forEach((userType) => {
    describe(`v2 path ${userType} users`, () => {
      console.log("iiiiiiiiiiiiiiii", userType);

      it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeUndefined();
        expect(userObject.id).toBeDefined();
        expect(userObject.username).toEqual(users[userType].username)
        
      });

      if (userType == "admin") {
        it("can access all actions", async () => {
          const response = await mockRequest
            .post("/signin")
            .auth(users[userType].username, users[userType].password);
            console.log("iiiiiiiiiiiiiiii",response.body)

          const token = response.body.token;
          console.log("iiiiiiiiiiiiiiii", token);

          // First, use basic to login to get a token
          let bearerResponse = await mockRequest
            .post("/api/v2/person")
            .set("Authorization", `Bearer ${token}`).send({ firstName:"mohammad", lastName:"Salameh", age:"25"});
          expect(bearerResponse.status).toBe(201);

          bearerResponse = await mockRequest
            .put("/api/v2/person/1")
            .set("Authorization", `Bearer ${token}`).send({ firstName:"mohammad", lastName:"Salameh", age:"24"});
          expect(bearerResponse.status).toBe(201);

          bearerResponse = await mockRequest
          .get("/api/v2/person")
          .set("Authorization", `Bearer ${token}`);
          expect(bearerResponse.status).toBe(200);

          bearerResponse = await mockRequest
          .get("/api/v2/person/1")
          .set("Authorization", `Bearer ${token}`);
          expect(bearerResponse.status).toBe(200);

          
          bearerResponse = await mockRequest
          .delete("/api/v2/person/1")
          .set("Authorization", `Bearer ${token}`);
          expect(bearerResponse.status).toBe(200);
        });
      }
    });

    // describe("bad logins", () => {
      it("basic fails with known user and wrong password ", async () => {
        const response = await mockRequest.post("/signin").auth("admin", "xyz");
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
      });

      it("basic fails with unknown user", async () => {
        const response = await mockRequest
          .post("/signin")
          .auth("nobody", "xyz");
        const userObject = response.body;

        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
      });

      it("bearer fails with an invalid token", async () => {
        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get("/user")
          .set("Authorization", `Bearer foobar`);

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(403);
      });
    // });
  });
// });
