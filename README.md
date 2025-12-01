# 3D Print Storefront
Express.js/SQLite/bootstrap project for the HarvardX CS50's Introduction to Computer Science final project.

## Description: 

The first thing you must do when 3D printing something is to choose the appropriate filament. These come in different colors and have different properties: brittle, heat resistant, soft, hard. Wouldn’t it be cool for your customers to choose the filament they want and then have a preview of how it looks like before they order a custom 3D print? That’s what this website is all about.

In more technical terms, this is a full-stack web application of an online storefront to buy 3D printed goods. It is built with the MVC architecture, which allows separation of concerns, maintainability and scalability. The front end uses Bootstrap to create a responsive and modern-looking website.

The model uses the Sequelize library to create a SQLite3 library that works inside a Node application. The database represents user accounts and 3D products offered by the platform. Of particular interest, is the use of JSON arrays to represent available filament types and their associated preview images. Instead of storing rigid sets of fixed images path or manually coding every product variation, the application makes use of a data structure like this one:

```
available_filaments: [
	{ filament: "PLA Color", images: ["kamo_color_1.png", "kamo_color_2.png"] },
	{ filament: "PLA Matte", images: ["kamo_matte_1.png", "kamo_matte_2.png"] },
	{ filament: "PET", images: ["kamo_pet_1.png", "kamo_pet_2.png"] }
]
```

This approach has some advantages. First it allows scalability. It doesn’t matter how many filament options or preview images are provided; the product will work as long as it has at least one filament and one image. Second, this approach provides clear separation between the EJS templates and the database itself, dispensing the need to hardcode anything.

In fact, the webpages themselves are created using dynamic Express JS templates, which allow dynamic HTML generation based on the data contained within the database and controller. This means that the website supports a large and variable number of products and customization options. In fact there is almost no hardcoding at all in this website other than the bootstrap carousel in the homepage, everything else is dynamic!

Another useful feature of the Express framework used in this project are the EJS partials, which help maintain consistency throughout the entire application with reusable template fragments. There are partials for the HTML head, header and footer. This avoids repetition and makes the website more consistent and maintainable.

For the frontend, this application makes use of the Bootstrap CSS framework. This facilitates the design of minimalist and modern-looking webpages. More importantly, it provides a way to easily create adaptative webpages. The pages make use of containers and Bootstrap classes to ensure that the application is usable and looks good both in desktop and mobile devices.

Also contained inside this project is everything you need to create a sample database and test most of its functionalities, including some sample preview images and a seeding script that can generate a sample database with some placeholder products.

The application also supports a simple account signup and login system. You can create an account and set up a password, which will have a predetermined account balance. 


## Limitations: 
The application has several limitations. The account creation process and session configuration lacks proper authentication, confirmation and security in this prototype and it is for demonstration purposes only. The model is also a barebones implementation. The User table only stores username, password and account balance. The handling of purchases and orders is also not included and needs to be implemented in a functional version of this application, as well as the option to add money to the account balance.
  
## Prerequisites:

- Node.js (v18+ recommended)
- npm (comes with Node.js)

## Usage:
To seed a placeholder database run:  
`node seed.js`

To start a server:  
`npm start`

Open the app in your browser:  
`http://localhost:3000`
