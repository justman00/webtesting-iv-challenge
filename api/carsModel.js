const db = require("../data/dbConfig");

module.exports = {
  insert,
  remove,
  getAll
};

async function insert(car) {
  const [id] = await db("cars").insert(car);

  return db("cars")
    .where({ id })
    .first();
}

async function remove(id) {
  return db("cars")
    .where({ id })
    .del();
}

async function getAll() {
  return db("cars");
}
