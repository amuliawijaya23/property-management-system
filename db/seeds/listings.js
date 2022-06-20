/* eslint-disable camelcase */
exports.seed = async function(knex) {
  return knex('listings').del()
    .then(() => {

      return knex('listings').insert([
        {
          cover_image_url: 'https://i.imgur.com/fk1t6MA.jpg',
          title: 'Pakuan Indah Apartment',
          description: 'Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
          address: 'Jln. Pakuan B/239, Bogor, Jawa Barat, Indonesia',
          property_type: 'Apartment',
          zip_code: 17204,
          size: 725,
          number_of_bedrooms: 2,
          number_of_bathrooms: 2,
          parking_space: 1,
          price: 780000,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          cover_image_url: 'https://i.imgur.com/NIbBhpf.jpg',
          title: 'Moderate Size Home in Bandung',
          description: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.',
          address: 'Jln. Pasir Putih D/210, Bandung, Jawa Barat, Indonesia',
          property_type: 'House',
          zip_code: 41812,
          size: 3670,
          number_of_bedrooms: 4,
          number_of_bathrooms: 3,
          parking_space: 2,
          price: 3211000,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          cover_image_url: 'https://i.imgur.com/TY0iLXj.jpg',
          title: 'Modern Townhouse in Jakarta',
          description: 'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.',
          address: 'Jln. Gajah Mada C/102, Jakarta, DKI Jakarta, Indonesia',
          property_type: 'Townhouse',
          zip_code: 12849,
          size: 1320,
          number_of_bedrooms: 2,
          number_of_bathrooms: 2,
          parking_space: 1,
          price: 1375000,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          cover_image_url: 'https://i.imgur.com/bZkFQbP.jpg',
          title: 'Beautiful Townhose Located in the Heart Of The City',
          description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
          address: 'Jln. Surya Kencana no. 242, Bogor, Jawa Barat, Indonesia',
          property_type: 'Townhouse',
          zip_code: 75232,
          size: 1620,
          number_of_bedrooms: 3,
          number_of_bathrooms: 2,
          parking_space: 2,
          price: 1583000,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
        {
          cover_image_url: 'https://i.imgur.com/GwbjRxT.jpg',
          title: 'Luxurious House in Bogor',
          description: 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
          address: 'Jln. Pajajaran Indah C/21, Bogor, Jawa Barat, Indonesia',
          property_type: 'House',
          zip_code: 18924,
          size: 5257,
          number_of_bedrooms: 5,
          number_of_bathrooms: 3,
          parking_space: 4,
          price: 6200000,
          organization_id: 'org_SdeKNTPqOTyZc27v',
          seller_id: 'auth0|62a915d40fb854efec56620b'
        },
      ]);
    });
};
