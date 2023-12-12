const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function connect() {
  return open({
    // filename: "./db/bikeShare.sqlite3",
    filename: "./db/project1.db",
    driver: sqlite3.Database,
  });
}

async function getBooks() {
  const db = await connect();
  const books =
    await db.all(`select * from Title
    `);

  console.log("dbConnector got data", books.length);

  return books;
}

async function getCopys() {
  const db = await connect();
  const copys =
    await db.all(`select * from Copy
    `);

  console.log("dbConnector got data", copys.length);

  return copys;
}

async function deleteBook(id) {
  const db = await connect();
  await db.all(`DELETE FROM Title WHERE titleID = ${id}
    `);
  await db.all(`DELETE FROM Copy WHERE titleID = ${id};
    `);
}

module.exports = {
  getBooks,
  getCopys,
  deleteBook
};
