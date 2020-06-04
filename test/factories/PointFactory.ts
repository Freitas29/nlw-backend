import Point from "../../src/model/Point";
import factory from 'factory-girl'

class PointFactory {
  constructor() {
    factory.define("point", Point, {
      image: "fake-image",
      name: "Perus coleta",
      email: "peruscoleta@gmail.com",
      whatsapp: "11123456",
      latitude: -45.6559,
      longitude: -12.4564,
      city: "São Paulo",
      uf: "SP",
    });
  }
}

export default new PointFactory()