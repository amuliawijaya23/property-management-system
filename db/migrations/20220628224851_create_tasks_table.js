exports.up = async function(knex) {
  await knex.schema
    .createTable('tasks', (table) => {
      table.increments('id').primary().notNullable();
      table.string('summary', 255).notNullable();
      table.string('notes', 1000).notNullable();
      table.string('category', 255).notNullable();
      table.timestamp('due_date').notNullable();
      table.string('agent_id').notNullable();
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