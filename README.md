### Up and running with command:

**> npm run dev**

This is a demo project which built with Vue.JS, Vue-router and Vuex, Node and npm modules to setup local server.

## Getting Started

The project is a Node project.

Please make sure that you have it installed it on your local machine.

To install all necessary npm modules run:
`npm install`

Start up the server by running
`npm start`

Now you should have access to local server at: `http://localhost:8080/`

## What is implemented:

### 1. A product listing page

- Main page is populated with products using AJAX - data set `src/data/products.json`
- Each product includes image thumbnail, product name, product price (current, was and discount price)
- An interactive Favourite icon on each product
- It is fully responsive
- A toggle option between list and grid view
- A filtering by price, size
- Sorting by price (ascending), price (descending) and name (ascending)

### 2. Contact page with Form Validation

- A form with following fields:
  - name: text only, no case sensitive
  - surname: text only, no case sensitive
  - email: alphanumeric, no case sensitive must contain `@` symbol and domain name
  - phone: can contain `+` (only in front of the number) and `space` characters and numbers only
  - password: must be at least 8 long and contain at least 1 special character
- Error messages for each invalid field, all fields are required
- Only vanilla JS validation, no plugins or HTML5 API
