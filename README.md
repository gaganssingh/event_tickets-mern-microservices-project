## Configure a service:

#### Creating a basic server

1. Create a directory for the service at the root of the project: `mkdir auth`
2. Inside the service directory, init a node project and install basic dependencies:

```
cd auth/
npm init -y
npm i express @types/express typescript ts-node-dev
```

3. At the root of the service's directory, generate a typescript config file: `tsc --init`
4. Setup a basic server:

```
cd auth/
mkdir src
touch src/index.ts
```

#### Dockerizing the service

5. Add start script in package.json `"start": "ts-node-dev src/index.ts"` and run `npm start` in terminal to test if it works.
6. Create a docker image config file `Dockerfile` at the root of the service. Add the appropriate `.dockerignore` file.
7. Build a docker image using this service and run the image to test if it works successfully.

#### Continuous development using Kubernetes & Skaffold

8. Create the Kubernetes Deployment & Service config file:

```
mkdir infra/k8s
touch infra/k8s/auth-depl.yaml
```

9. Create a `skaffold.yaml` config file to facilitate continuous development:
   - Automatically: By running `skaffold init` command at the root of the project.
   - Manually: Creating the `skaffold.yaml` config file manually and adding the config.
10. Test the configuration by running: `skaffold dev`
