const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url =
  "mongodb+srv://nachhiring70:gaurab123456@cluster0.r73dpbb.mongodb.net/?appName=Cluster0";
//const url =
//"mongodb+srv://root:gaurab123456@cluster0.r73dpbb.mongodb.net/shop?////retryWrites=true&w=majority";
let _db;
const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect(url);

    console.log("connect to mango DB");
    _db = client.db("MongoDatabase");
    return client;
  } catch (error) {
    console.log(error);
  }
};
const getDb = () => {
  if (!_db) {
    throw new Error("Mango DB has not created database!!!!");
  } else {
    return _db;
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
