import request from "supertest";
import app from "../src/server";

describe('Testing Item controller', () => {
  it("Should create a item with success", async done => {
    const res = await request(app).get("/items");
  
    expect(res.status).toBe(200);
    
    const item = res.body[0]
    
    expect(item).toHaveProperty('title')

    done()
  });
  
})
