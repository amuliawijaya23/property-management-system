exports.up = function(knex) {

  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary().notNullable();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password_hash', 255).notNullable();
      table.string('address', 255)
      table.string('city', 255)
      table.smallint('postal_code')
      table.string('country', 255)
      table.boolean('admin').notNullable().defaultTo(false);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};
