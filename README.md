## Table of Contents

- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Associations](#associations)
- [API Routes](#api-routes)


## Usage
````
npm start
````
This will run the server on `http://localhost:3001`. The app is using

## Project Structure

The project structure is as follows:

* `src/controllers`: Contains controllers for handling business logic.
* `src/models`: Defines Sequelize models for database tables.
* `src/routes`: Defines API routes using Express.js.
* `src/config`: Configuration files, including database configuration.
* `db`: Contains database schema and seed data.

# Project Name README

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

