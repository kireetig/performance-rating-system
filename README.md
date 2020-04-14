# Performance-rating-system
This application is used for rating performance by group of people. This is developed using react and node js 

## How It works
1. Admin has to create account (employee/participants of review no need to create).
2. Once Admin logins in he sees all projects, he has created.
3. By click in on new project/(Review) he goes to create a project.
4. Give Project details (can add candidates/participants for review now or later).
5. Once created from home page. He can view and edit project details.
6. Employees how rate someone are called "Rater" and Employee getting rated are called "Ratee"
7. Can add Raters only after project is created. when click on participants you can see all people how will be rating him/her.
8. New Rater is added by clicking on "+" button inside collapse content. where modal opens and show list of all (participants/Employee) in project.
9. Update project to refect changes.
10. When click on invite all. An email will be sent to participant asking them to attend review.
11. When clicked on link then will be transfered to system when they attend review and rate (at present questions and answer choices are static).
12. Onces submitted Review. Can see Report of there answers in project details.
13. Can't edit participant details as of now. Can only delete and re-enter

## Tech stack
Frontend - React js
Backend - node js
DB - Mongodb

## Things to do
1. Admin can upload questions (can give type of answers expected like text filed or multiple choose, if multiple choose profile posibile options)
2. Can Download Report

## Assumptions
1. Admin are only users of the system.
2. Admin can create various projects. (so they can use each project from different department or team).

## how to run
1. Open cmd/bash and go to each of root, server and web folder and run "npm i"
2. in root of this project if run "npm run dev" both backend and frontend server will be running.
3. frontend runs on "http://localhost:3000/"
4. backend runs on "http://localhost:8000/"
5.