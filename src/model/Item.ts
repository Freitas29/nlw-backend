interface Item {
  id: Number;
  image: String;
  title: String;
}

class Item {
  constructor(id: Number, title: String, image: String) {
    this.id = id;
    this.image = image;
    this.title = title;
  }
}

export default Item;
