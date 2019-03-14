# Router.jn React Client

## Installation
1. Start with React Auth template from GA (https://git.generalassemb.ly/ga-wdi-boston/react-auth-template)
2. Change api url in arc/auth/api.js to be dynamic based on deployment/development environments
3. Follow deployment recommendations from (https://github.com/gitname/react-gh-pages)

## Deployed apps and repositories
| Resource   | URL            |
|------------|----------------|
| client deployed    | https://jennasaurusrex.github.io/router-client/#/             |
| client app repo   | https://github.com/jennasaurusrex/router-client             |
| server deployed | https://router-jn.herokuapp.com/            |
| server api repo  | https://github.com/jennasaurusrex/router-API     |

## About the app
router.jn is an app created out of necessity. The idea for this app stemmed from the lack of websites that can log road trips you've taken or plan to take. You can add places to travel to, expenses along the way, and add/delete todos that you plan on accomplishing in your travels.

## Technologies Used
- React.js
- React Router
- JavaScript
- Material UI
- Bootstrap
- Sass
- Webpack
- Node Package Manager
- Rails
- Ruby

## Unsolved Problems
- Incorporate working google maps API into front end
- Incorporate AWS to upload photos taken
- Fix tables in rails to CRUD on expenses, add a photo table.
- Add sharing with social media

## ERD, Wireframes, and User Stories
[Link to gallery](https://imgur.com/a/Ht3TE7x)

## Route Catalog
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/trips`               | `trips#index`     |
| POST   | `/trips`               | `trips#create`    |
| GET    | `/trips/:id`           | `trips#show`      |
| PATCH  | `/trips/:id`           | `trips#update`    |
| POST   | `/trips/:id/todo/:id`               | `todo#create`    |
| DELETE   | `/trips/:id/todo/:id`  | `todo#destroy`   |
