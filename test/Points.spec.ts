import request from "supertest";
import app from "../src/server";

describe("Testing Point controller", () => {
  it("Should not create a item and return with error", async (done) => {
    const res = await request(app).post("/points");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");

    done();
  });

  it("Should create a item and return with success", async (done) => {
    const res = await request(app)
      .post("/points")
      .send({
        name: "Perus coleta",
        email: "peruscoleta@gmail.com",
        whatsapp: "11123456",
        latitude: -45.6559,
        longitude: -12.4564,
        city: "São Paulo",
        uf: "SP",
        items: [1, 2],
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name");

    done();
  });
});
