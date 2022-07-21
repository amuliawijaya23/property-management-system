/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('users').del()
    .then(() => {

      return knex('users').insert([
        {
          id: 'auth0|62a915d40fb854efec56620b',
          name: 'Muliawijaya, Aldino - amuliawijaya@gmail.com',
          picture: 'https://s.gravatar.com/avatar/2e030d3c14001ed89d643de18ffcfe46?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fam.png',
          email: 'amuliawijaya@gmail.com',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
        {
          id: 'auth0|62badd1761165c6696257493',
          name: 'Muliawijaya, Marissa - marissamuliawijaya@gmail.com',
          picture: 'https://s.gravatar.com/avatar/f3fcfdd9c627d6b86ed841c568f640aa?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
          email: 'marissamuliawijaya@gmail.com',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
        {
          id: 'auth0|62b396aef51763734091f988',
          name: 'Juana, Ashley - @ashleyfjuana@gmail.com',
          picture: 'https://s.gravatar.com/avatar/4207e3e64cd56000ccc2ef2ccb24c04e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fas.png',
          email: 'ashleyfjuana@gmail.com',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
        {
          id: 'auth0|62d86407e1e5be5ba1d95832',
          name: 'Alkuin, A - aldinoalkuin@gmail.com',
          picture: 'https://s.gravatar.com/avatar/bdee5b28a833d50619a78ac67d4f1ccb?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fal.png',
          email: 'aldinoalkuin@gmail.com',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
        {
          id: 'auth0|62d8632e37803aae8d5ebfe4',
          name: 'Bly, James - screaming7@gmail.com',
          picture: 'https://s.gravatar.com/avatar/33616050a34ea5a0eba1bed8b2e1d031?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsc.png',
          email: 'screaming7@gmail.com',
          organization_id: 'org_SdeKNTPqOTyZc27v'
        },
      ]);
    });
};