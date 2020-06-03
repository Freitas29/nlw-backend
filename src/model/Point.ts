interface Point{
    id: Number, 
    image: String, 
    name: String, 
    email: String, 
    whatsapp: String, 
    latitude: String,
    longitude: String,
    city: String,
    uf: String
}

class Point{
    constructor(id: Number, image: String, name: String, email: String, whatsapp: String, latitude: String,longitude: String, city: String, uf: String){
        this.id = id
        this.image = image
        this.name = name
        this.email = email
        this.whatsapp = whatsapp
        this.latitude = latitude
        this.longitude = longitude
        this.city = city
        this.uf = uf
    }
}

export default Point