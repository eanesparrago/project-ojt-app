# Parousia — project-ojt-app
OJT attendance web application — 𝗥𝗲𝗮𝗰𝘁, 𝗡𝗼𝗱𝗲.𝗷𝘀, 𝗘𝘅𝗽𝗿𝗲𝘀𝘀.𝗷𝘀, 𝗠𝗼𝗻𝗴𝗼𝗗𝗕,

![image](https://user-images.githubusercontent.com/36854142/55800085-735dc500-5b05-11e9-8678-53e022e4469d.png)
![image](https://user-images.githubusercontent.com/36854142/55800031-51644280-5b05-11e9-85fc-951d77d272fc.png)
![image](https://user-images.githubusercontent.com/36854142/55799917-0e09d400-5b05-11e9-8443-b925fe5f2cc3.png)

## What is this?
Parousia is an OJT attendance web application meant for company use. This is a project I built with the MERN stack for educational purposes. Much of the basic setup and techniques used in this app are based from Brad Traversy's devconnector project which I learned from one of his courses. This project isn't perfect — lots of mistakes here and there but it was a good learning experience.

## Demo Link
https://parousia-app.herokuapp.com/

## Built With
* React, Redux, React Router, styled-components
* Node.js, Express.js, Mongoose ODM
* MongoDB, MongoDB Atlas
* Heroku

## Features
1. Users Management
2. Groups Management
3. Announcements Management
4. Clock in and clock out
5. Tasks Management

## Random thoughts about this project
#### Building UI from scratch
A big challenge of this project is building the user interface from scratch. I can't say that all the solutions I've come up with are the best ones. Some are alright and some are built hastily. There's some parts that merits refactoring. I ended up not adding responsive support below tablet sizes. 

#### Multiple user roles
This app has four types of users (Administrator, Supervisor, Trainee, and Employee) with different functions and permissions. I'm not convinced that the techniques I used in this project are the most efficient. You'll find lots of conditional rendering in the client's code.

#### Backend is hard
Since this is only my second full-stack app I still struggle writing the backend. It goes without saying that this project isn't suitable for production use. I didn't want to work on this project any further so that I can relearn the techs I used better.

#### Redux is also hard
I'm not confident with the Redux side of this project. I only know the basics of Redux (with thunk) so it felt like I needed to learn the advanced parts and maybe some other libraries.

#### App structure
The app and folder structure changed a lot throughout this project. I ended up with something that feels sane. Using absolute imports is definitely useful in medium-sized apps. 

#### Zero tests
There is not a single test file in this project. It's something that I will learn soon..

## If you want to install
Run install in the root folder and in the client folder.
```
  npm install
```
You will need to add a MongoDB database configuration "keys_dev.js" file in server/config directory.


## Author
Leandro Esparrago
