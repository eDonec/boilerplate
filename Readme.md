<div  align="center">

<img  src="readme-assets/edonec-logo.svg"  alt="logo"  width="200"  height="auto" />

<h1>The Ultimate boilerplate</h1>

<p>

A boilerplate for microsirves nodejs architecture

</p>

<!-- Links to be added -->

<!-- <h4>

<a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>

<span> · </span>

<a href="https://github.com/Louis3797/awesome-readme-template">Documentation</a>

<span> · </span>

<a href="https://github.com/Louis3797/awesome-readme-template/issues/">Report Bug</a>

<span> · </span>

<a href="https://github.com/Louis3797/awesome-readme-template/issues/">Request Feature</a>

</h4>
-->
</div>

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [:notebook_with_decorative_cover: Table of Contents](#notebook_with_decorative_cover-table-of-contents)

  - [:star2: About the Project](#star2-about-the-project)

  - [:camera: Screenshots](#camera-screenshots)

  - [:space_invader: Tech Stack](#space_invader-tech-stack)

  - [:dart: Features](#dart-features)

  - [:key: Environment Variables](#key-environment-variables)

- [:hammer_and_wrench: Getting Started](#toolbox-getting-started)

  - [:bangbang: Prerequisites](#bangbang-prerequisites)

  - [:gear: Installation](#gear-installation)

  - [:microscope: Running Tests](#test_tube-running-tests)

  - [:running: Run Locally](#running-run-locally)

  - [:triangular_flag_on_post: Deployment](#triangular_flag_on_post-deployment)

  - [:eyes: Usage](#eyes-usage)

  - [:earth_africa: Roadmap](#compass-roadmap)

- [:warning: License](#warning-license)

<!-- About the Project -->

## :star2: About the Project

<!-- Screenshots -->

### :camera: Screenshots

<div  align="center">

<img  src="readme-assets/home-page.png"  alt="screenshot" />

</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>

<summary>Client</summary>

<ul>

<li><a  href="https://www.typescriptlang.org/">Typescript</a></li>

<li><a  href="https://nextjs.org/">Next.js</a></li>

<li><a  href="https://reactjs.org/">React.js</a></li>

<li><a  href="https://tailwindcss.com/">TailwindCSS</a></li>

</ul>

</details>

<details>

<summary>Server</summary>

<ul>

<li><a  href="https://www.typescriptlang.org/">Typescript</a></li>

<li><a  href="https://expressjs.com/">Express.js</a></li>

<li><a  href="https://socket.io/">SocketIO</a></li>

<li><a  href="https://www.prisma.io/">Mongoose</a></li>

</ul>

</details>

<details>

<summary>MongoDB available Databases per microservice</summary>

<ul>

<li><a  href="https://www.mongodb.com/">auth</a></li>

</ul>

</details>

<details>

<summary>DevOps</summary>

<ul>

<li><a  href="https://www.docker.com/">Docker</a></li>

<li><a  href="https://www.jenkins.io/">Docker compose</a></li>

</ul>

</details>

<!-- Features -->

### :dart: Features (so far)

- Authentication

  - Role management
  - Token management

- Forms
  - React hook form components
  - Raw form components

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file for every app

`PORT`

### :key: Environment Variables per project

#### CRA

`PORT`

#### express

`PORT`
`DATABASE_URI`
`ACCESS_TOKEN_SECRET_KEY`
`REFRESH_TOKEN_SECRET_KEY`
`TOKEN_EXPIRES_IN`
`REFRESH_TOKEN_EXPIRES_IN`
`NUMBER_OF_AUTH_TRIALS`

<!-- Getting Started -->

## :hammer_and_wrench: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash

npm install --global yarn

```

<!-- Installation -->

### :gear: Installation

Install project with yarn

```bash

yarn

```

<!-- Installation -->

### :gear: Adding dependency to a project

Install project with yarn

```bash

yarn workspace <project-name> add [-D] <dependency>

```

<!-- Running Tests -->

### :microscope: Running global Tests

To run tests, run the following command

```bash

yarn test

```

### :microscope: Running project Tests

To run tests, run the following command

```bash

yarn workspace <project> test -w

```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

Go to the project directory

Install dependencies

Start the server

```bash

yarn start

```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

Work in progress...

<!-- Usage -->

## :eyes: Usage

Work in progress...

<!-- Roadmap -->

## :earth_africa: Roadmap

Work in progress...

<!-- License -->

## :warning: License

This project is under the strict ownership of Donec no usage of this boilerplate is alowed out of work scope without a written consent. Any usage of this project outside of the allowed parameters will be subject of legal pursuit
