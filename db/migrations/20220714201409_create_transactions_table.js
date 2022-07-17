exports.up = async function(knex) {
  await knex.schema
    .createTable('transactions', (table) => {
      table.increments('id').primary().notNullable();
      table.string('status').notNullable().default('Open');
      table.string('transaction_type', 255).notNullable();
      table.string('notes', 1000).notNullable();
      table.timestamp('start_date').notNullable();
      table.timestamp('end_date');
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade');
      table.string('agent_id').notNullable();
      table.string('organization_id').notNullable();
      table.decimal('transaction_value', 17, 0).notNullable();
      table.decimal('market_value', 17, 0);
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