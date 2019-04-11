exports.up = function(knex, Promise) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();

    tbl.string("model", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cars");
};
