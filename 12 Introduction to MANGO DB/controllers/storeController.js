const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    }),
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    }),
  );
};
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const favourites = await Favourite.getFavourites();

    const favouriteIds = favourites.map((fav) => fav.houseId.toString());

    const registeredHomes = await Home.fetchAll();

    const favouriteHomes = registeredHomes.filter((home) =>
      favouriteIds.includes(home._id.toString()),
    );

    res.render("store/favourite-list", {
      favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  } catch (err) {
    next(err);
  }
};
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("FAv added", result);
    })
    .catch((err) => {
      console.log("the error is", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.deleteById(homeId)
    .then((result) => {
      console.log("fav removed", result);
      res.redirect("/favourites");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
