exports.up = async function(knex) {
  await knex.schema
    .createTable('listing_watchers', (table) => {
      table.string('user_id').notNullable();
      table.integer('listing_id').unsigned().references('id').inTable('listings').onDelete('cascade').notNullable();
      table.timestamps(false, true);
    });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${'listing_watchers'}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('listing_watchers');
};