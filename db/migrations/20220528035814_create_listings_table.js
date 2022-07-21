exports.up = async function(knex) {
  await knex.schema
    .createTable('listings', (table) => {
      table.increments('id').primary().notNullable();
      table.string('title', 255).notNullable();
      table.string('description', 1000).notNullable();
      table.string('address', 255);
      table.string('property_type', 255).notNullable();
      table.string('service_type', 255).notNullable();
      table.string('postal_code').notNullable();
      table.integer('size').notNullable();
      table.smallint('number_of_bedrooms').notNullable();
      table.smallint('number_of_bathrooms').notNullable();
      table.smallint('parking_space').notNullable();
      table.decimal('valuation', 17, 0).notNullable();
      table.decimal('market_valuation', 17, 0);
      table.string('status', 255).notNullable().defaultTo('Open');
      table.timestamp('date_closed');
      table.string('organization_id').notNullable();
      table.string('agent_id').references('id').inTable('users').onDelete('cascade').notNullable();
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
