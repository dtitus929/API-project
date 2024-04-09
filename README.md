# AirBnB Clone

AirCnC is a full stack clone project built while attending App Academy coding bootcamp.  It involved coding a back-end utilizing an Express server framework with a Sequelize ORM. The front-end was built using React and makes use of Redux as a data store.  No styling frameworks were used... just standard CSS.

This project was a great first step in learning how to put together a fully functional RESTful back-end API and connecting it to a clean, responsive and intuitive front-end.

https://davet-airbnb.onrender.com/
* This site may take a minute to spin up.  Give it a minute. 😀 
  
![aircnc-example-pics](https://user-images.githubusercontent.com/111056707/226110094-e2269dfc-a242-4c68-9645-2f3040b67dd8.png)
  
## Technology

* Front-end:
  * React
  * Redux
* Back-end:
  * Express
  * Sequelize
* Database:
  * SQLite (Development)
  * PostgreSQL (Production)
  
## Setup Instructions

The structure for this app includes a root package.json for remotely deploying the application as a Node.js server.  The backend and frontend folders contain package.json files for setting up both the back-end and front-end servers.

#### Launching the Full Application Locally

1. Download the application as a zip file from GitHub.
2. From within the backend folder install the dependent npm packages: `npm install`
3. Migrate the Sequelize database schema: `npx dotenv sequelize db:migrate`
4. Generate Sequelize seed data for testing: `npx dotenv sequelize db:seed:all`
5. Start the back-end server: `npm start`
6. From within the frontend folder install the dependent npm packages: `npm install`
7. Start the front-end server: `npm start`

