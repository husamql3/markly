# Markly Monorepo

Welcome to the Markly monorepo! This repository contains the codebase for the Markly application, structured as a monorepo managed by Turborepo.

## Project Structure

This monorepo is organized into two main directories:

- `apps/`: Contains the user-facing applications.
  - `client/`: The frontend application built with React Router.
  - `server/`: The backend API server built with Express.
- `packages/`: Contains shared code and configurations used across the applications.
  - `@markly/jest-presets/`: Shared Jest configurations.
  - `@markly/lib/`: A shared library for common functionalities (e.g., environment variable parsing).
  - `@markly/typescript-config/`: Shared `tsconfig.json` files.
  - `@markly/utils/`: Shared utility functions (e.g., a logger).

Each application and package within the monorepo is a separate workspace.

## How it Works

This monorepo leverages [Turborepo](https://turborepo.com/) to manage builds, tests, and other tasks efficiently. Turborepo understands the dependencies between the workspaces and can run tasks in parallel and cache build outputs.

- The `client` app is a React application using React Router for routing. It interacts with the `server` API.
- The `server` app is an Express.js backend that provides API endpoints.
- Shared code, like utility functions or configuration files, resides in the `packages` directory and is consumed by the apps.
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.docker.com/compose/) are used to containerize the applications, making them easy to build and deploy consistently.

## Getting Started

To set up and run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd markly
    ```

2.  **Install dependencies:**
    This project uses pnpm as the package manager. Install dependencies at the root of the monorepo:

    ```bash
    pnpm install
    ```

3.  **Create Docker network:**
    A Docker network is needed for containers to communicate by name. The `|| true` prevents the command from failing if the network already exists.

    ```bash
    docker network create app_network || true
    ```

4.  **Build and run with Docker Compose:**
    Build the Docker images and start the containers defined in `docker-compose.yml`:

    ```bash
    docker-compose -f docker-compose.yml build
    docker-compose -f docker-compose.yml up -d
    ```

    The `client` application should be available at `http://localhost:3000` and the `server` API at `http://localhost:3001`.

5.  **Shutdown Docker containers:**
    To stop and remove the containers created by Docker Compose:
    ```bash
    docker-compose -f docker-compose.yml down
    ```

## Adding Dependencies to a Workspace

Dependencies are managed at the root of the monorepo using `pnpm`. To add a new dependency to a specific application or package (workspace), use the `--filter` flag with the `pnpm add` command:

```bash
# Add a regular dependency to the client application
pnpm add <package-name> --filter client

# Add a devDependency to the server application
pnpm add -D <dev-package-name> --filter server

# Add a dependency to the @markly/lib package
pnpm add <package-name> --filter @markly/lib
```

Replace `<package-name>` and `<dev-package-name>` with the actual package names you want to add, and `<workspace-name>` with the name of the app or package (e.g., `client`, `server`, `@markly/lib`, `@markly/utils`, etc.).

## Docker

This monorepo is configured to be built with Docker and Docker Compose. The `docker-compose.yml` file defines the `client` and `server` services.

To build all apps in this monorepo using Docker Compose (after installing dependencies and creating the network as described in Getting Started):

```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build
```

To start the containers defined in `docker-compose.yml`:

```bash
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000 for the client and http://localhost:3001 for the server status endpoint.

To shutdown all running containers started by Docker Compose:

```bash
docker-compose -f docker-compose.yml down
```

## Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

This example includes optional remote caching. In the Dockerfiles of the apps (`apps/client/Dockerfile` and `apps/server/Dockerfile`), uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build commands.

You can test this behavior using a command like:

```bash
docker build -f apps/client/Dockerfile . --build-arg TURBO_TEAM="your-team-name" --build-arg TURBO_TOKEN="your-token" --no-cache
```

## Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting (Note: `client` uses `prettier-plugin-tailwindcss`)
- [Biome](https://biomejs.dev/) for fast formatter and linter (configured in `client` and `server`)
- [TailwindCSS](https://tailwindcss.com/) for styling (`client`)
- [@t3-oss/env-core](https://env.t3.gg/) for type-safe environment variables (`lib`)
