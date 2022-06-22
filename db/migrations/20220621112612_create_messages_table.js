exports.up = function(knex) {
  return knex.schema
    .createTable('messages', (table) => {
      table.increments('id').primary().notNullable();
      table.string('message', 50000).notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade').notNullable();
      table.string('organization_id').notNullable();
      table.string('sender_id').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('messages');
};