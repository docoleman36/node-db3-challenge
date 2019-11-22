const db = require('../data/dbconfig');

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db
    .select("*")
    .from("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where({ scheme_id: id })
    .orderBy("steps.step_number");
}

function add(scheme) {
  return db
    .insert(scheme)
    .into("schemes")
    .then(res => {
      const id = res[0];
      return db("schemes").where({ id });
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(res => {
      return db("schemes").where({ id });
    });
}

function remove(id) {
  return db("schemes").where({ id })
    ? db("schemes")
      .where({ id })
      .del()
    : null;
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};