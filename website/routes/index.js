let express = require("express");
let router = express.Router();
const app = express();
const { getBooks } = require("../db/dbConnector_Sqlite.js");
const { getCopys } = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
router.get("/", async function (req, res) {
  const books = await getBooks();
  const copys = await getCopys();
  // console.log("route / called  -  trips.length", trips.length);
  res.render("index", { title: "SF BikeShare Rides", books,copys });
});

module.exports = router;



