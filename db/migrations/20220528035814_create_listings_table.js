exports.up = function(knex) {
  return knex.schema
    .createTable('listings', (table) => {
      table.increments('id').primary().notNullable();
      table.string('cover_image_url', 500).notNullable();
      table.string('title', 255).notNullable();
      table.string('description', 500).notNullable();
      table.string('street_address', 255);
      table.string('city', 255);
      table.string('province', 255).notNullable();
      table.integer('postal_code').notNullable();
      table.string('country', 255).notNullable();
      table.string('property_type', 255).notNullable();
      table.integer('size').notNullable();
      table.smallint('number_of_bedrooms').notNullable();
      table.smallint('number_of_bathrooms').notNullable();
      table.smallint('parking_space').notNullable();
      table.string('status', 255).notNullable();
      table.uuid('seller_id').references('id').inTable('users').onDelete('cascade').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('listings');
};
