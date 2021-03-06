exports.up = async function(knex) {
  await knex.schema
    .createTable('images', (table) => {
      table.string('id').primary().notNullable();
      table.string('link', 500).notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade').notNullable();
      table.string('organization_id').notNullable();
      table.string('agent_id').references('id').inTable('users').onDelete('cascade').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'images'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('images');
};