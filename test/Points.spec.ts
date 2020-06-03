import request from "supertest";
import app from "../src/server";
import factory from 'factory-girl'
import Point from '../src/model/Point'

describe("Testing Point controller", () => {
  it("Should not create a item and return with error", async (done) => {
    const res = await request(app).post("/points");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");

    done();
  });

  it("Should create a item and return with success", async (done) => {
    // factory.define('point', Point, 
        
    // )

    // factory.build('point').then(point => {
    //     console.log("ponto", point); // => User { username: 'Bob', expired: true });
    //   });

     const res = await request(app).post("/points").send({
        name: "Perus coleta",
        email: "peruscoleta@gmail.com",
        whatsapp: "11123456",
        latitude: -45.6559,
        longitude: -12.4564,
        city: "São Paulo",
        uf: "SP",
        items: [1,2]
     });

     console.log(res.body)

     expect(res.status).toBe(200);
     expect(res.body).toHaveProperty("name");

    done();
  });
});
