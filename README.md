	# Inventory App

An app to keep track of your inventory of items.

## Backend Setup

* Install dependencies: `npm install`
* Create `.env` with your values
* Run the postgres db / adminer: `docker-compose up`
* Migrate the database: `npm run migrate`
* Seed the database: `npm run seed`

* Adminer will be running at http://localhost:8080