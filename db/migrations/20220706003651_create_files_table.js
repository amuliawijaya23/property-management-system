exports.up = async function(knex) {
  await knex.schema
    .createTable('files', (table) => {
      table.string('id').primary().notNullable();
      table.string('link', 500).notNullable();
      table.string('name').notNullable();
      table.string('file_type', 500).notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade').notNullable();
      table.string('organization_id').notNullable();
      table.string('agent_id').references('id').inTable('users').onDelete('cascade').notNullable();
      table.boolean('is_offer').notNullable().default(false);
      table.boolean('is_archived').notNullable().default(false);
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'files'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('files');
};