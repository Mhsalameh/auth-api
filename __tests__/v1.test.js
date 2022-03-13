"use strict";

const supertest = require("supertest");
const server = require("../src/server.js");
const request = supertest(server.app);
const {db} = require('../src/models/index.js')


beforeAll(async()=>{
    await db.sync();
  })
  afterAll(async()=>{
    await db.drop();
  })
describe("testing v1", () => {
    let consoleSpy;


  it("testing 404 on bad path", async () => {
    const response = await request.get("/ai/v1/perso");
    expect(response.status).toEqual(404);
  });

  it("testing 201 on with post", async () => {
    const response = await request
      .post("/api/v1/food")
      .send({ name: "mansaf", type: "main dish" });
    expect(response.status).toEqual(201);
  });
  it("testing 404 on bad method", async () => {
    const response = await request.delete("/api/v1/person");
    expect(response.status).toEqual(404);
  });

  it("testing 200 with GET", async () => {
    const response = await request.get("/api/v1/person");
    expect(response.status).toEqual(200);
  });

  it("testing 200 with GET and param", async () => {
    const response = await request.get("/api/v1/person/1");
    expect(response.status).toEqual(200);
  });
  it("testing 201 with put", async () => {
    const response = await request
      .put("/api/v1/person/1")
      .send({ firstName: "mohammad", lastName: "salameh" });
    expect(response.status).toEqual(201);
  });
  it("testing 201 with Delete", async () => {
    const response = await request.delete("/api/v1/food/1");
    expect(response.status).toEqual(200);
  });
});