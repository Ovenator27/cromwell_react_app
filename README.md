# Cromwell React App

## Project summary

A demonstration of a simple registration, login and landing page app, makes use of a backend API for post requests to create new users and send login requests. 

JWT authentication tokens are issued on successful validation of credentials and used to allow users into protected routes to view My account page, when not logged in this simply redirects to login page.

This project utilises an API stored in Supabase and hosted on Render, the repo can be found at https://github.com/Ovenator27/Cromwell_API.

## Local setup

1. Fork or clone the repo from https://github.com/Ovenator27/cromwell_react_app
2. Run npm install in the terminal to install dependencies
3. Run npm run dev to preview live in the browser, the server takes some time to spin up on first use so may take some time to respond to the first request

## Minimum version requirements

Node.js : v21.6.1