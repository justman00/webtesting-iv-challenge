const request = require("supertest");
const server = require("./server");
const Cars = require("./carsModel");
const db = require("../data/dbConfig");

describe("server", () => {
  it("checking if the / sends back html", async () => {
    const res = await request(server).get("/");

    expect(res.type).toBe("text/html");
  });

  describe("car routes", () => {
    afterEach(async () => {
      await db("cars").truncate();
    });

    it("should return 200 on creating", () => {
      return request(server)
        .post("/cars")
        .send({ model: "BMW" })
        .expect(200);
    });

    it("should return 200 when deleting an instance", async () => {
      const newCar = await Cars.insert({ model: "S Class" });

      const res = await request(server).delete(`/cars/${newCar.id}`);

      expect(res.body).toBe(newCar.id);
      expect(res.status).toBe(200);
    });

    it("should return an empty array when attempting to get all the cars", () => {
      return request(server)
        .get("/cars")
        .expect([])
        .expect(200);
    });

    it("should return an array with one car after creating one", async () => {
      const newCar = await Cars.insert({ model: "S Class" });

      const res = await request(server).get("/cars");

      expect(res.body).toEqual([newCar]);
    });
  });
});
