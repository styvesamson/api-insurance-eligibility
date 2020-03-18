# Nodejs Expressjs MongoDB  API Project Structure
[![Author](http://img.shields.io/badge/author-@yvestoupe-blue.svg)](https://www.linkedin.com/in/yves-toupe/)    [![GitHub license](https://img.shields.io/github/license/maitraysuthar/rest-api-nodejs-mongodb.svg)](https://github.com/styvesamson/api-insurance-eligibility/blob/master/LICENSE)  ![GitHub repo size](https://img.shields.io/github/repo-size/styvesamson/api-insurance-eligibility)

NodeJs API for a sample Insurance eligibility calculation developed with Node.js, Express, and MongoDB

## Getting started


This is a web  API written in  NodeJS (JavaScript ES2015).

This project will run on **NodeJs** using **MongoDB** as database. Project is open for suggestions, Bug reports and pull requests. 

## Advertise for Job/Work Contract

I am looking for a good job or work contract. You can contact me directly on my email ([yvestoupe@gmail.com](mailto:yvestoupe@gmail.com "yvestoupe@gmail.com")) or you can download my CV from my personal  [website](https://yvestoupe.com/). Looking forward. Thanks :smile:

## Features

-   Basic Authentication (Register/Login with hashed password)
-   Account confirmation with 4 (Changeable) digit OTP.
-   Email helper ready just import and use.
-   JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
-   Pre-defined response structures with proper status codes.
-   Included CORS.
-    **CRUD** operations.
-   Validations added.
-   Included API collection for Postman.
-   Light-weight project.
-   Test cases with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
-   Code coverage with [Istanbuljs (nyc)](https://istanbul.js.org/).
-   Included CI (Continuous Integration) with [Travis CI](https://travis-ci.org).
-   Linting with [Eslint](https://eslint.org/).

## Software Requirements

-   Node.js **8+**
-   MongoDB **3.6+** (Recommended **4+**)

## How to install

### Installation prerequisites

1. Install NodeJs (https://nodejs.org/en/download/)
2. Install MongoDB (https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)

###  Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/styvesamson/origin-test.git ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.
## Project  structure
```sh
.
├── app.js
├── package.json
├── bin
│   └── www
├── controllers
│   ├── AuthController.js
│   └── CustomerController.js
├── models
│   ├── CustomerModel.js
│   └── UserModel.js
├── routes
│   ├── api.js
│   ├── auth.js
|   ├── customer.js
│   └── index.js
├── middlewares
│   ├── jwt.js
├── helpers
│   ├── apiResponse.js
│   ├── constants.js
│   ├── mailer.js
│   └── utility.js
├── test
│   ├── testConfig.js
│   ├── auth.js
│   └── customer.js
└── public
    ├── index.html
    └── stylesheets
        └── style.css
```
## How to run

### Running  API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```
**Note:**  `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.


## Running Insurance Score Calculation

### Steep 1 : Authentication 
1- Submit a `Register`  Postman  request providing  your own registration data, you will receive a email to confirm  your account

2- Submit a `Verify Confirm OPT` Postman  request providing the 4 digit OPT code you received the email the system sent to you  

3- Submit  a `Login` request once your account is validated .  Once Logged in you all receive a response that contain a token like this 
`{
     "status": 1,
     "message": "Login Success.",
     "data": {
         "_id": "5e6d45c77bb3e147676a34c8",
         "firstName": "yves",
         "lastName": "toupe",
         "email": "yvestoupe@gmail.com",
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkNDVjNzdiYjNlMTQ3Njc2YTM0YzgiLCJmaXJzdE5hbWUiOiJ5dmVzIiwibGFzdE5hbWUiOiJ0b3VwZSIsImVtYWlsIjoieXZlc3RvdXBlQGdtYWlsLmNvbSIsImlhdCI6MTU4NDU0NTIzNCwiZXhwIjoxNjE2MDgxMjM0fQ.5nk2nHHNpJ3z8iH8HxWjAqdl4Nk0Y78Ai0Ltq9Qfq6k"
     }
 }`
 
 For the Score calculation request  you may need to provide the token received 

### Caculate the Insurance Score

Provide the data for the request  `Calculate Score` and submit it providing your  token on Postman Request heder  (Bearer Token) 

Exemple of the structure of expected data on your request body 
`{
   "age": 35,
   "dependents": 2,
   "house": {"ownership_status": "owned"},
   "income": 0,
   "marital_status": "married",
   "risk_questions": [0, 1, 0],
   "vehicle": {"year": 2018}
 }`
 
 
 Expected response
 
 `{
      "status": 1,
      "message": "Your risk profile is for each line of insurance :",
      "data": {
          "auto": "regular",
          "disability": "ineligible",
          "home": "regular",
          "life": "ineligible"
      }
  }`



## Tests

### Running  Test Cases

```bash
npm test
```

You can set custom command for test at `package.json` file inside `scripts` property. You can also change timeout for each assertion with `--timeout` parameter of mocha command.

### Creating new tests

If you need to add more test cases to the project just create a new file in `/test/` and run the command.

## ESLint

### Running  Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.