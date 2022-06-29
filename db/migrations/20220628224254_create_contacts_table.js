exports.up = async function(knex) {
  await knex.schema
    .createTable('contacts', (table) => {
      table.increments('id').primary().notNullable();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.bigint('mobile').default(null);
      table.bigint('home').default(null);
      table.bigint('office').default(null);
      table.string('address').default(null);
      table.string('agent_id').notNullable();
      table.string('organization_id').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'contacts'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('contacts');
};