exports.up = async function(knex) {
  await knex.schema
    .createTable('tasks', (table) => {
      table.increments('id').primary().notNullable();
      table.string('summary', 255).notNullable();
      table.string('notes', 1000);
      table.string('category', 255).notNullable();
      table.timestamp('due_date').notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade');
      table.string('status').notNullable().defaultTo('Open');
      table.string('agent_id').references('id').inTable('users').onDelete('cascade').notNullable();
      table.string('organization_id').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'tasks'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('tasks');
};