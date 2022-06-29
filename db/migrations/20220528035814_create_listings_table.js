exports.up = async function(knex) {
  await knex.schema
    .createTable('listings', (table) => {
      table.increments('id').primary().notNullable();
      table.string('cover_image_url', 500).notNullable();
      table.string('title', 255).notNullable();
      table.string('description', 1000).notNullable();
      table.string('address', 255);
      table.string('property_type', 255).notNullable();
      table.string('service_type', 255).notNullable();
      table.integer('zip_code').notNullable();
      table.integer('size').notNullable();
      table.smallint('number_of_bedrooms').notNullable();
      table.smallint('number_of_bathrooms').notNullable();
      table.smallint('parking_space').notNullable();
      table.integer('price').notNullable();
      table.string('status', 255).notNullable().defaultTo('Open');
      table.string('organization_id').notNullable();
      table.string('seller_id').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'listings'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('listings');
};
