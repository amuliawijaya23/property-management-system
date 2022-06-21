exports.up = function(knex) {
  return knex.schema
    .createTable('images', (table) => {
      table.string('id').primary().notNullable();
      table.string('link', 500).notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade').notNullable();
      table.string('organization_id').notNullable();
      table.string('seller_id').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('images');
};