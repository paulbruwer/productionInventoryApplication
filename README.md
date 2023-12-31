# Description

Production inventory application.
This is an easy to use and compact web application designed to simplify the tracking of goods production in a small production environment.

The app logs:
incoming raw materials.
Consumption of raw materials during production.
Adding finished from production floor to stock
and finished good dispatched from the stock.

# Installation Guide For dev version

    - pull repo from github
    - in command line navigate to repo location
    - run "npm install" to install dependencies
    - navigate to "frontend" folder
    - run "npm install" to install frontend dependencies
    - navigate back to route
    - run "npm run dev" to start application

For API security JSON WEB TOKEN is used with encryption key "secretKey".
If you want to change this key navigate to /routes/middelware.js and change the key in both LoginUser and CheckJWTToken

# Guide for use

## Login

    From the home screen, log into the application.
    test accounts:
        (admin) username: paul@mail.com, password: 1234
        (receiving) username: chris@mail.com, password: abcd
        (production) username: mark@mail.com, password: m@rk
        (dispatch) username: jennifer@mail.com, password: pass

    All users log in using the login page. After being logged in, depending on the user's permissions,
    the user will only be able to view information from the page they are allowed access.

    For example.
        Mark has only permission to view the production page.
        He can view production logs and add new batches to this database collection.
        He will not be able to view information on any other page, nor will he be able to submit any
        data on those pages on their respective database collections.

    Admin users can view and manipulate all pages

    Navigate the pages of choice using the tabs above:

## Receiving:

        - Enter Batch number
        - Select product code from the drop down
        - Enter quantity
        - Click Submit to add item

## Production:

        - Enter Batch number
        - Select Product code from the drop down
        - Enter quantity
        - Click submit to add item

## Dispatch:

        - First select item from drop down
        - enter a quantity for this item
        - click add to add this item to the list
        - repeat steps for any additional items on this dispatch action
        - enter dispatch number last
        - click submit to add to database
        - click cancel to clear list

## Admin

        - On the Left navigate to the data base collection from which you want to delete an item
        - Enter the reference number (batch number or dispatch number) of the listed item
        - All the field for that item should appear in the fields below
        - To edit any of the fields, edit the text and click "Edit"
        - click Delete to delete an item from the database
        - on the right navigate through all the collections of the database you want to view

# Testing:

## Frontend:

    To run all test for the frontend, navigate to "/frontend" and type "npm run test" in the CLI

## Backend:

    To run all test for the backend, navigate to the project folder and type "npm test" in the CLI

# WebStack:

## Frontend dependencies:

    - bootstrap
    - jest
    - react
    - react-data-table-component
    - react-dom
    - react-router-dom
    - react-scripts
    - react-test-renderer

## Backend Dependencies:

    - body-parser
    - chai
    - chai-http
    - concurrently
    - cookie-parser
    - debug
    - express
    - jsonwebtoken
    - mocha
    - mongoose
    - morgan
    - nodemon
    - supertest

## Database technologies:

MongoDB and Mongoose

# System architecture:

This application will be developed using the MERN-stack, i.e. MongoDB, Express, React(Create React app), Node.
Styled with react-bootstrap and css

MongoDB hosts 6 collections in a database:

    Users:
        {
            "username":String,
            "password":String,
            "permissions":Array
        }

    Receiving (by batch nr):
        {
            "Batch nr": String,
            "Product code": String,
            "Quantity": integer,
            "Date entered": date
        }

    Raw materials in stock :
        {
            "Product code": String,
            "Quantity": integer,
            "Date Updated": date
        }

    Finished Goods manufactured (by batch nr):
        {
            "Product code": String,
            "Batch nr": String,
            "Quantity": Integer,
            "Date Updated": Date
        }

    Finished goods in stock:
        {
            "Product code":String,
            "Composition":Object,
            "Quantity":Integer,
            "Date": Date
        }

    Dispatch goods (by dispatch nr):
        {
            "Dispatch nr":String,
            "Goods pulled": Object,
            "User who dispatched": String,
            "Date": Date
        }

The express server contains 5 routes:
index: For signing in users
Receiving: Receiving goods required for production
production: Converting raw materials into finished goods
dispatch: for taking finished goods out of stock
admin:
remove faulty database entries
view stock balance reports

React front-end features:
a login page
Good receiving page
production page
dispatch page
dispatch page
admin page

# User Stories

Admin: - I would like to be able to erase any mistakes made by other users of the app - I would like to to all records and totals of materials and products

Production Manager: - I would like to be able to enter a number of products manufacture in a certain batch.
This must update the raw materials by removing the appropriate ingredients from stock. - I would like to see a record of all manufacturing processes

Good receiving: - I need a simple method of keeping record of all materials received

Dispatch team: - I need a simple way of keeping record of all items leaving the stores

# System requirements

Functional Requirements:

1. User Registration and Authentication:

   - users can Log in securely
   - users can only view and use pages the have permission for

2. Good receiving:

   - Users can enter raw materials into database by batch number
   - Fields for Batch number, product code, quantity
   - Admin should be able to remove entries here in case of mistake

3. Production:

   - User can add finished goods to stock on hand
   - System will remove correct quantities from raw materials
   - admin can remove these entries by batch number

4. Dispatch:

   - Users can take stock items out of stock by dispatch number
   - system will add a dispatch entry and take stock from inventory
   - admin can remove these entries

5. Report:
   - Display list of all raw materials along with total for physical stock take
   - Display list of all finished products along with totals for physical stock take
   - Only admin has access to this function.

Non-Functional Requirements:

1. Performance:

   - Low latency and fast response times.
   - Scalability to handle a growing number of users and tasks.
   - Minimum downtime and high availability.

2. Security:

   - User authentication and authorization.

3. Usability:

   - Intuitive user interface and user experience.
   - Cross-browser compatibility.

4. Reliability:

   - Error handling and logging.
   - Data integrity and reliability.

5. Support and Maintenance:

   - Help desk or support system for user assistance.
   - Regular updates and bug fixes.

6. Hosting and Infrastructure:

   - Server hosting with cloud service.
   - Server and database requirements.

7. Documentation:
   - Comprehensive user and administrator documentation.
   - API documentation for developers.

# How this app stands out from competitors:

    Current other platforms that are designed for this purpose include, but is not limited to accounting software
    such as Pastel and SAP.
    These platforms include much more complex database structures and many more feature than this app can provide.
    They also require a great deal of training to use and require large annual fees to maintain a license for use.

    This app is for small production outfits, who cannot afford the complexities and price of the larger platforms,
    but who still need a tool to help streamline production data capture.
