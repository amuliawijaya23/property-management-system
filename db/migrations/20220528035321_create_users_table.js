exports.up = async function(knex) {
  await knex.schema
    .createTable('users', (table) => {
      table.string('id').primary().notNullable();
      table.string('name', 255).notNullable();
      table.string('picture', 255).notNullable();
      table.string('email', 1000).notNullable();
      table.string('organization_id').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'users'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};
