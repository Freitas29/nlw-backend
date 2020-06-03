import request from "supertest";
import app from "../src/server";

describe('Testing Point controller', () => {
    it("Should not create a item and return error", async done => {
    const res = await request(app).post("/points");
  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error")
    
    done()
  });
  
})
