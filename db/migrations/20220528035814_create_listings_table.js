exports.up = function(knex) {
  return knex.schema
    .createTable('listings', (table) => {
      table.increments('id').primary().notNullable();
      table.string('cover_image_url', 500).notNullable();
      table.string('title', 255).notNullable();
      table.string('description', 500).notNullable();
      table.string('address', 255);
      table.string('property_type', 255).notNullable();
      table.integer('zip_code').notNullable();
      table.integer('size').notNullable();
      table.smallint('number_of_bedrooms').notNullable();
      table.smallint('number_of_bathrooms').notNullable();
      table.smallint('parking_space').notNullable();
      table.integer('price').notNullable();
      table.string('status', 255).notNullable().defaultTo('Open');
      table.string('organization_id').notNullable();
      table.string('seller_id').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('listings');
};
