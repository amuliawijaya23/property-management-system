exports.up = async function(knex) {
  await knex.schema
    .createTable('transactions', (table) => {
      table.increments('id').primary().notNullable();
      table.string('status').notNullable().default('Open');
      table.string('transaction_type', 255).notNullable();
      table.string('service_type', 255).notNullable();
      table.string('notes', 1000).notNullable();
      table.timestamp('date_started').notNullable();
      table.timestamp('date_closed');
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade');
      table.string('agent_id').notNullable();
      table.string('organization_id').notNullable();
      table.bigint('amount').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'transactions'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('transactions');
};