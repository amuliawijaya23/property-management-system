exports.up = async function(knex) {
  await knex.schema
    .createTable('messages', (table) => {
      table.increments('id').primary().notNullable();
      table.string('message', 50000).notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade').notNullable();
      table.string('organization_id').notNullable();
      table.string('sender_id').references('id').inTable('users').onDelete('cascade').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'messages'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('messages');
};