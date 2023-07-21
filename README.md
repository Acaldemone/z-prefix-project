# z-prefix-project
This repository was created to test my full stack development skills. 

## Overview

The Inventory Management System is a web application that allows users to manage their inventory of items. The system provides functionalities for accessing the inventory without being logged in, creating an account, and logging in. Once logged in, users can add, modify, and delete items from their inventory. The same functionality persists if you arent logged in.

## Features

Can create an account

Can log in: once logged in you will be taken to the user dashboard where options are limited due to technical issues.

Add Items: Any user can add an Item. (note Logged on users cannot add items at this time, It causes the server to crash)

Modify Items: Any user can modify an Item. 

Delete Items: Any user can delete an Item. 

Frontend and Backend Communications: The frontend communicates with the backend through various endpoints in the api.js file

## Getting Started

1. Clone the repository

        git clone git@github.com:Acaldemone/z-prefix-project.git     or use the link https://github.com/Acaldemone/z-prefix-project

2. cd in the appropriate folder in your terminal after cloning

3. Install dependancies

        npm install (may need to be installed in the front end and backend seperatly)

4. install database

        Have docker installed and open up a fresh ubuntu terminal and run the following commands:

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

         This pulls the Postgres image from the cloud and creates a container with necassary ports, password and name.

docker ps -a

        This lists the active container that are running.

docker exec -it <PSQL-Container-ID> bash

        Replace <PSQL-Container-ID> with the first 3 characters of the container ID. This will put you in the container root on the terminal.

psql -U postgres

        This will log you into Postgres as the postgres user

CREATE DATABASE inventory;

    This will create an empty database in the postgres container

/c inventory

    This will connect you to that Database

5. Migrate and seed knex data

RUN npx knex migrate:latest 

RUN npx knex seed:run

    The combination of these two commands will migrate the appropriate data tables and initial seed files.

6. Start server and React App

    RUN   npm start   in both BACKEND and FRONTEND folders

## Directions

Upon entering the application, you will be taken to the inventory landing page that will be populated with some input fields for adding items. Below that should be some items that were populated with the seed data. These items and the ones add here on can be edited with the labeled button and deleted with the delete button. Their is a create account button that allows users to create accounts and a login button that goes to the login screen. Once logged in, you will be transported to the users personal page but adding items here currently does not work. When this page is navigated away from, you must relog back in to go back to it. 
