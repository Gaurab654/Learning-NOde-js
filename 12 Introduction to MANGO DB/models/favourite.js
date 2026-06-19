const { getDb } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(homeId) {
    this.houseId = homeId;
  }

  save() {
    const db = getDb();

    return db
      .collection("favourites")
      .findOne({ houseId: this.houseId })
      .then((existingFav) => {
        if (existingFav) {
          return Promise.resolve(existingFav);
        }

        return db.collection("favourites").insertOne({
          houseId: this.houseId.toString(),
        });
      });
  }

  static getFavourites() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(homeId) {
    const db = getDb();

    return db.collection("favourites").deleteOne({
      houseId: homeId.toString(),
    });
  }
};
