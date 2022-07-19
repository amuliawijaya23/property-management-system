# ProperTee

A customer relationship management (CRM) web application for real estate agents that enables them to keep track of their clients, manage their properties, market listings, and track their transactions.

The application is built with a Node.js backend and a React frontend. It uses the React-Redux library for state management, React-Router for routing, MUI for the UI components.

Auth0 is used for authentication and authorization, AWS SDK for interacting with AWS storage services, and knex is used for interacting with the database (PostgreSQL).

OpenAI for natural language processing (description and email generation) as well as sendGrid Api for bulk email campaign.

The application also includes a WYSIWYG editor (tinymce) for creating comments and sending emails to clients.

---

### Future Updates

- WebSocket for real time interaction
- notifications

---

### Getting Started

- Download from Github or clone the repo and install dependancies:

```
npm install

cd client && npm install
```

Create a .env file based on the example file and do the same inside the client folder. You will have to register for the following api keys:

- Google
- Amazon AWS
- Auth0
- OpenAi
- SendGrid
- TineMCE

---

### User Stories

- User can register as an organization/brokerage
- User can invite other users into his organization
- Authorized user can create roles within his organization
- Authorized user can assign roles to other users within his organization
- Authorized user can remove users from his organization
- Users can see all property listings that belongs to his organization
- Users can Search and filter all listings within his organization
- Users can create a new listing which will belong to his organization
- Users can generate descriptions for their listing based on the provided information
- Authorized users can update or assign a listing to another user within his organization
- Authorized users can bulk update the status of listings within his organization
- Users can upload images for listings that belongs to his organization
- Users can upload and download files
- Users can leave a message/comment in the listing page
- Users can create and track transactions
- Users can create and track contacts/leads
- Users can generate and send emails to available contacts

### Tech Stack

- React, React-Redux, React-Router, MUI, Axios, OpenAI, Auth0, AWS SDK, SendGrid, tinymce, express-jwt, knex, PostgreSQL, Node, Express
