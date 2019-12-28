# StarWars
Python | Flask | PostgreSQL | JavaScript | Ajax. A web application which shows data from Star Wars Universum. 
Data, in JSON format, is retrieved from external API using AJAX. 
Created to practice MVC pattern, errors handling, logging.
Used JS error handling, dynamic DOM rendering, event-driving approach, callbacks, promises.


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info
StarWars:
* Shows on main page data retrived from Star Wars Api
* Displays details about planets' residents
* Displays form to register or login
* Gives possibility to vote on planet

## Technologies
* Python 3.7
* Flask
* Postgresql
* bcrypt
* JavaScript
* html, css

## Setup
Use requirements.txt to download all nedeed dependencies.
Use star_wars_data.sql script to create database.

## Code Examples
JS promises:
```javascript
function postDataModern(link, data, callback) {
    fetch(link, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json_response => callback(json_response))
        .catch(error => sendErrorLogsToServer(error.message + error.stack))
        .catch(error => console.log(error))
}
```
Dynamically rendering DOM elements:
```javascript
function createSmallModal(username, message) {
    let modalContainer = document.getElementById('small-modal');
    let modal = `
    <div class="info-modal-body">
        <div class="info-modal-title">
            <button class="info-modal-close" id="close-small-modal"><span>&times;</span></button>
            <span>Hello <strong>${username}</strong></span>
        </div>        
        <div class="info-modal-message">
            <span>${message}</span>
        </div>
    </div>
    `;
    modalContainer.insertAdjacentHTML("afterbegin", modal)
}
```

## Features
StarWars uses:
* Ajax fetching data
* Handling JSON format
* JS template strings
* Arrow functions
* Promises
* Callbacks
* Data validation on all applications levels

## Status
Project is finished.

## Contact
Created by [Magda Wąsowicz](mailto:mw23127@gmail.com) - feel free to contact me!
