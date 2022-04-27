# How to create a Docker image for a new application

## Table of content

- [How to create a Docker image for a new application](#how-to-create-a-docker-image-for-a-new-application)
  - [Table of content](#table-of-content)
  - [The base configuration](#the-base-configuration)
    - [TL&DR The final base image](#tldr-the-final-base-image)
    - [Multy layer approach](#multy-layer-approach)
      - [Turbo base image](#turbo-base-image)
      - [Copier image](#copier-image)
      - [The pruner image](#the-pruner-image)
      - [The installer image](#the-installer-image)
  - [Express Js](#express-js)
    - [The package builder image](#the-package-builder-image)
    - [The last image (The runner image)](#the-last-image-the-runner-image)
    - [TL&DR the final express image](#tldr-the-final-express-image)
  - [Next Js](#next-js)
    - [Next js Env Problem](#next-js-env-problem)
    - [Next js Env Solution](#next-js-env-solution)
    - [The installer / collector image](#the-installer--collector-image)
    - [TL&DR Next js dockerfile](#tldr-next-js-dockerfile)
    - [TL&DR Next Js dockerfile.compose](#tldr-next-js-dockerfilecompose)
  - [CRA Apps](#cra-apps)

## The base configuration

For each image we will not start from scratch as we have identefied some common configuration that we can use across all images.

### TL&DR The final base image

```dockerfile
# Create an image with the necessary files
FROM alpine AS copier
WORKDIR /app
COPY ./.git ./.git
COPY ./apps ./apps
COPY ./.turbo ./.turbo
COPY ./packages ./packages
COPY ./turbo.json ./turbo.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock



# Create an image with the pruned microservice
FROM nader2560/turborepo-base AS pruner

ARG MICROSERVICE_NAME="auth"

WORKDIR /app
COPY --from=copier /app .
RUN turbo prune --scope=${MICROSERVICE_NAME} --docker


# Create an image with the installed dependacies
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install
```

### Multy layer approach

For each image we will use multy layers in order to optimize Docker caching for faster build time especially in CI/CD.

#### Turbo base image

We first startup with extending the `node:alpine` image. We then simply install turbo globally.

```dockerfile
# Create a base image with turbo as global binary
FROM node:alpine AS turbobase
RUN apk update
WORKDIR /app
RUN yarn global add turbo
```

This image has been deployed to [the docker public regestry](https://hub.docker.com/r/nader2560/turborepo-base/) under the name `nader2560/turborepo-base`.

#### Copier image

After that we will create a new image that will copy the files from the project.

For this image we will just extend the `alpine` base docker image, as this layer will only do copying.

```dockerfile
# Create an image with the necessary files
FROM alpine AS copier
WORKDIR /app
COPY ./.git ./.git
COPY ./apps ./apps
COPY ./.turbo ./.turbo
COPY ./packages ./packages
COPY ./turbo.json ./turbo.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

```

#### The pruner image

This one is responsible of extracting only the files/packages that are needed for the application.

For this we will use the `turbo prune --scope=<app-name> --docker` command.

We added an argument to the docker image for better standardization. That will be the only value to change in this layer.

This image will take on where the first image (`Turbo base image`) left off, so extending the same image.

```dockerfile
# Create an image with the pruned microservice
FROM nader2560/turborepo-base AS pruner

ARG MICROSERVICE_NAME="auth"

WORKDIR /app
COPY --from=copier /app .
RUN turbo prune --scope=${MICROSERVICE_NAME} --docker
```

#### The installer image

As per [the turbo repo documentation](https://turborepo.org/docs/reference/command-line-reference#--docker) the output of the pruner image is:

```directory
.
├── full                                # Folder full source code for all package needed to build the target
│   ├── package.json
│   └── apps
│   |   └── <scoped-app>
│   └── packages
│       ├── <package-1 used by scoped-app>
│       ├── <package-2 used by scoped-app>
│       └── <package-3 used by scoped-app>
├── json                                # Folder containing just package.jsons for all targets in the subworkspace
│   ├── package.json
│   └── apps
│   |   └── <scoped-app>
│   |       └── package.json
│   └── packages
│       ├── <package-1 used by scoped-app>
│       │   └── package.json
│       ├── <package-2 used by scoped-app>
│       │   └── package.json
│       └── <package-3 used by scoped-app>
│           └── package.json
└── yarn.lock                           # The pruned lockfile for all targets in the subworkspace
```

Using that information we then only need to copy the json folder as well as tha yarn.lock in order to install all the necessary dependencies for the app to run.

```dockerfile
# Create an image with the installed dependacies
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install
COPY  .internal ./.internal
```

**The rest of the layers will be on a case by case basis and will be described bellow.**

## Express Js

As per the [prebuild and postbild docs](prebuild-postbuild.md), One of the main things that we need to do prior to building the image is to build the independant packages.

After setting up the base image (as described above) we move on the builder image

### The package builder image

We need to copy the necessary files from the previous images as well as the .internal folder from the project.

Then we simply use the turbo build command with the filter option to build the packages.

```dockerfile
# Create an image for the build
FROM node:alpine AS package-builder

RUN apk update
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/.turbo ./.turbo
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
ENV NODE_ENV production
COPY --from=installer /app/.internal ./.internal
RUN yarn build:packages
```

### The last image (The runner image)

We added an argument to the docker image for better standardization. That will be the only value to change in this layer.

We left the build as the last layer and not one that contains a final copy of the build and this is **intentional**. The reasoning behind is that we will need to build these images for different use cases and we will need to have a different build for each of them that will contain new environment variables.

And to be able to defer the environment variables creation to the docker-compose.yml (or the kubernetes) file that will be the main file describing all of our distributed system.

```dockerfile
# Create an image for the build
FROM package-builder AS runner

ARG MICROSERVICE_NAME="auth"

RUN apk update
WORKDIR /app
COPY --from=package-builder /app .

RUN yarn build --filter=${MICROSERVICE_NAME}

```

### TL&DR the final express image

```dockerfile
# Create an image with the necessary files
FROM alpine AS copier
WORKDIR /app
COPY ./.git ./.git
COPY ./apps ./apps
COPY ./.turbo ./.turbo
COPY ./packages ./packages
COPY ./turbo.json ./turbo.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock



# Create an image with the pruned microservice
FROM nader2560/turborepo-base AS pruner

ARG MICROSERVICE_NAME="auth"

WORKDIR /app
COPY --from=copier /app .
RUN turbo prune --scope=${MICROSERVICE_NAME} --docker


# Create an image with the installed dependacies
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install
COPY  .internal ./.internal

# Create an image for the build
FROM node:alpine AS package-builder

RUN apk update
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/.turbo ./.turbo
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
COPY --from=installer /app/.internal ./.internal
ENV NODE_ENV production
RUN yarn build:packages

# Create an image for the build
FROM package-builder AS runner

ARG MICROSERVICE_NAME="auth"

RUN apk update
WORKDIR /app
COPY --from=package-builder /app .

RUN yarn build --filter=${MICROSERVICE_NAME}

```

## Next Js

Environment are a huge issue in these project types.

### Next js Env Problem

- The environment variables need to be present in the build time in order for the next framework to integrate them in the final output.
- Once the build is done setting up the env variables will do basically nothing.
- The other issue is that setting up enviroment variables in the docker-compose.yml will not be availablo for the docker build file hence we are trying to have a ready image to be pulled from a certain regestry, that image will be already built.

### Next js Env Solution

The idea is to create an intermediat docker image that have the project files setup and installed and pushed to the regestry **THE IMAGE MUST NOT BE BUILT**. Then another dockerfile using that image as an entrypoint, importing all the environment variables as **ARGUMENTS** and then setting them to the **ENV**.

inside the docker file:

```dockerfile
ARG NEXT_PUBLIC_HELLO
ENV NEXT_PUBLIC_HELLO=${NEXT_PUBLIC_HELLO}
```

inside the docker-compose.yml:

```yaml
client:
build:
  context: ./.docker
  dockerfile: Dockerfile.client.save
  args:
    - NEXT_PUBLIC_HELLO="I am a variable"
```

**PS**: The args attribute is not on the same level as the environement attribute. It **SHOULD** be nested in the build section.

Finally we carry on with the build process as normal.

### The installer / collector image

Using the same starting point as mentioned above. We will add a small layer to it that will only copy all the resulting files from the installer and export that layer to the regestry.

```dockerfile

# Create an image for the build
FROM node:alpine AS builder

RUN apk update
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/.turbo ./.turbo
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
ENV NODE_ENV production
COPY --from=installer /app/.internal ./.internal
```

This should do it as the final image that will not be called directly in the docker-compose.yml.

We will then create another Dockerfile that takes on from this image, builds and copies only the necessary files to the last layer.

Say we call the image in our regestry as **edonec/client**.

The builder layer should look like this.

Obviously the argument `MCIROSERVICE_NAME` needs to change to the actual application name within the project.

```dockerfile
FROM edonec/client AS builder
WORKDIR /app
ARG MCIROSERVICE_NAME="client"
ARG NEXT_PUBLIC_HELLO
ENV NEXT_PUBLIC_HELLO=${NEXT_PUBLIC_HELLO}
RUN yarn build --filter=${MCIROSERVICE_NAME}
```

Finally a runner image that will copy the files from the builder layer.

Again the argument `MCIROSERVICE_NAME` needs to change to the actual application name within the project.

```dockerfile
FROM node:alpine AS runner
WORKDIR /app
ARG MCIROSERVICE_NAME="client"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /app
ENV NODE_ENV production
# Next.js collects completely anonymous telemetry data about general usage.
# The next line disables it
ENV NEXT_TELEMETRY_DISABLED 1

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/standalone/apps/${MCIROSERVICE_NAME} ./
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/standalone/node_modules ./node_modules
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/standalone/package.json ./
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/static ./build/static
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/next.config.js ./
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/public ./public
```

### TL&DR Next js dockerfile

```dockerfile

# Create an image with the necessary files
FROM alpine AS copier
WORKDIR /app
COPY ./.git ./.git
COPY ./apps ./apps
COPY ./.turbo ./.turbo
COPY ./packages ./packages
COPY ./turbo.json ./turbo.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock



# Create an image with the pruned microservice
FROM nader2560/turborepo-base AS pruner

ARG MICROSERVICE_NAME="client"

WORKDIR /app
COPY --from=copier /app .
RUN turbo prune --scope=${MICROSERVICE_NAME} --docker


# Create an image with the installed dependacies
FROM node:alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install
COPY  .internal ./.internal

# Create an image for the build
FROM node:alpine AS builder

RUN apk update
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/.turbo ./.turbo
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
ENV NODE_ENV production
COPY --from=installer /app/.internal ./.internal
```

### TL&DR Next Js dockerfile.compose

```dockerfile
FROM client AS builder
WORKDIR /app
ARG MICROSERVICE_NAME="client"
ARG NEXT_PUBLIC_HELLO
ENV NEXT_PUBLIC_HELLO=${NEXT_PUBLIC_HELLO}
RUN yarn build --filter=${MICROSERVICE_NAME}

# ADD your runner image here which will be the last image in the chain

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app
ARG MCIROSERVICE_NAME="client"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /app
ENV NODE_ENV production
# Next.js collects completely anonymous telemetry data about general usage.
# The next line disables it
ENV NEXT_TELEMETRY_DISABLED 1

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/standalone/apps/${MCIROSERVICE_NAME} ./
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/standalone/node_modules ./node_modules
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/standalone/package.json ./
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/build/static ./build/static

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/next.config.js ./
COPY --from=builder /app/apps/${MCIROSERVICE_NAME}/public ./public

```

## CRA Apps

Following the same logic as for the Next apps.

The last builder layer for the image registry is only missing the `yarn build` command and it looks like this.

Bear in mind that we **MUST** include in the final build the nginx configuration file.

And as always change the argument `MCIROSERVICE_NAME` to the actual application name within the project.

```dockerfile
FROM node:alpine AS builder
ARG MICROSERVICE_NAME="dashboard"

RUN apk update
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/.turbo ./.turbo
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY .gitignore .gitignore
ENV NODE_ENV production
COPY --from=installer /app/.internal ./.internal
COPY ./nginx ./nginx/.
COPY ./apps/${MICROSERVICE_NAME}/nginx/default.conf ./nginx/conf.d/default.conf

```

For the composer image we endup with two layers:

One for building the image that takes on from the latest step in the regestry image and simply builds the image while adding the env variables to the final output.

```dockerfile
# Create an image for the build
FROM dashboard AS builder

ARG REACT_APP_HELLO
ENV REACT_APP_HELLO=${REACT_APP_HELLO}
ARG MICROSERVICE_NAME="dashboard"
WORKDIR /app
RUN yarn build --filter=${MICROSERVICE_NAME}
```

Hence the build output for the SPA create react apps is only an HTML file with a bunch of js included the final runner image needs not to be a node js extention but only an nginx image that will be serving the static files.

```dockerfile

FROM nginx:alpine AS runner

ARG MICROSERVICE_NAME="dashboard"

COPY --from=builder /app/nginx /etc/nginx/.

COPY --from=builder /app/apps/dashboard/build /usr/share/nginx/html/dashboard

```
