# E-commerce Backend README

---
Welcome to the E-Commerce API, a robust backend system for managing products, categories, tags, and their associations. This API is built using Node.js and Sequelize ORM, providing a scalable solution for e-commerce platforms.

---

## Table of Contents

- [Demo](#demo)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Associations](#associations)
- [API Routes](#api-routes)
- [Technologies](#technologies)
- [Installation](#installation)

## Demo
A demo video showcasing the functionality and capabilities of this e-commerce backend can be found

- https://github.com/Jakefred6/E-commerce-Back-End/blob/master/Develop/video/Walkthrough.mkv

#### OR 

<img src='Develop\video\Walkthrough.gif'>

## Usage

```terminal
npm start
````

This will run the server on `http://localhost:3001`. The app is using

## Project Structure

The project structure is as follows:

- `models`: Defines Sequelize models for database tables.
- `routes`: Defines API routes using Express.js and for handling business logic.
- `config`: Configuration files, including database configuration.
- `db`: Contains database schema and seed data.

## Database Models

### Category

- id (Integer, Primary Key)
- category_name (String)

### Product

- id (Integer, Primary Key)
- product_name (String)
- price (Decimal)
- stock (Integer, Default: 10)
- category_id (Integer, Foreign Key referencing Category)

### Tag

- id (Integer, Primary Key)
- tag_name (String)

### ProductTag

- id (Integer, Primary Key)
- product_id (Integer, Foreign Key referencing Product)
- tag_id (Integer, Foreign Key referencing Tag)

## Associations

- Product belongs to Category
- Category has many Product models
- Product belongs to many Tag models through ProductTag
- Tag belongs to many Product models through ProductTag

## API Routes

- `/api/products`: Product CRUD operations
- `/api/categories`: Category CRUD operations
- `/api/tags`: Tag CRUD operations
- `/api/product-tags`: ProductTag operations

## Technologies

Project is created with

Project is created with:  

- [Javascript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/en/)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Express](https://www.npmjs.com/package/express)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Installation

```terminal
npm init --y
```

```terminal
npm install express sequelize mysql2
```

Open up MySQL shell and input

```terminal
source db/schema.sql
```

and

```terminal
use ecommerce_db
```

In other terminal

```terminal
npm run seed
```

to start running application simply input

```terminal
npm run start
```

Server will be up on given port

Now we are able to test All routes in Insomnia core.

---
Feel free to explore and enhance the E-Commerce API for your specific needs!