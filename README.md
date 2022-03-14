## Configure a new service:

#### Creating a basic server

1. Create a directory for the service at the root of the project: `mkdir <SERVICE_NAME>`.
2. Inside the service directory, init a node project and install basic dependencies:

```
cd <SERVICE_NAME>/
npm init -y
npm i express @types/express typescript ts-node-dev
```

3. At the root of the service's directory, generate a typescript config file: `tsc --init`.
4. Setup a basic server:

```
cd <SERVICE_NAME>/
mkdir src
touch src/index.ts
```

#### Adding testing using Jest & Supertest:

5. Install development dependencies: `npm i -D jest @types/jest ts-jest supertest @types/supertest mongodb-memory-server`.
6. Add the jest setup configuration file in: `src/test/setup.ts`.
7. Add jest configuration in `package.json` to enable jest's typescript support and point to the jest setup file:

```
"jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "setupFilesAfterEnv": [
      "./src/test/setup.ts"
    ]
}
```

8. Add the jest test script in the package.json file: `"test": "jest --watchAll --no-cache"`.
9. Add a test file as required: `src/routes/__test__/signup.test.ts`.

#### Dockerizing the service

10. Add start script in package.json `"start": "ts-node-dev src/index.ts"` and run `npm start` in terminal to test if it works.
11. Create a docker image config file `Dockerfile` at the root of the service. Add the appropriate `.dockerignore` file.
12. Build a docker image using this service and run the image to test if it works successfully.

#### Continuous development using Kubernetes & Skaffold

13. Create the Kubernetes Deployment & Service config file:

```
mkdir infra/k8s
touch infra/k8s/<SERVICE_NAME>-depl.yaml
```

14. Create a `skaffold.yaml` config file to facilitate continuous development:

- Automatically: By running `skaffold init` command at the root of the project.
- Manually: Creating the `skaffold.yaml` config file manually and adding the config.

#### Setting up secrets, if required (e.g. JWT secret, API Keys etc.)

15. In the terminal, run: `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mysecretkey`.
16. Update the service's deployment config to add a reference to the secret. Use the name `jwt-secret` as the reference.

#### Test run the deployment:

17. Test the configuration by running: `skaffold dev`

#### Setup Ingress-Nginx to allow outside-in communication:

18. Install the kubernetes ingress-nginx controller service by running the latest quick start command from the [official installation page](https://kubernetes.github.io/ingress-nginx/deploy/).
19. Create the config file: `infra/k8s/ingress-srv.yaml`
20. Update the hosts file to access the application on a web browser:

- Update the hosts file:
  - MacOS/Linus: /etc/hosts
  - Windows: C:\Windows\System32\drivers\etc\hosts
- Add to the hosts file:
  - 127.0.0.1 ticketing.dev

21. Visit the application on the browser: `ticketing.dev`. If chrome shows an unsafe error, type `thisisunsafe` anywhere on the screen.

#### Adding a React/Next app

22. Create a `client` directory at the root level.
23. Install react dependencies `npm install react react-dom next`.
24. Add the `Dockerfile` & `.dockerignore` config files in the client directory.

#### Dockerizing MongoDB

1. Create a deployment & service configuration for mongodb: `infra/k8s/<SERVICE_NAME>-mongo-depl.yaml`.
2. Start the cluster using `skaffold dev` & check if all pods are running using `kubectl get pods`.
3. Install the package `mongoose` from npm and configure the startup script in `index.ts` for mongoose-to-mongodb connection:

```
await mongoose.connect(`mongodb://<SERVICE_NAME>-mongo-srv:27017/<DATABASE_NAME>`);
```

### IMPORTANT: Cleanup after finished development

1. Upon termination of the skaffold service, skaffold will automatically cleanup all services, deployments and pods. Nothing to do manually.
2. Delete the hosts assignment from the `...etc/hosts/` file.
3. Delete any obsolete secrets assigned on kubectl.

### General Commands

- Create a new kubectl secret: `kubectl create secret generic <SECRET_NAME> --from-literal=<KEY_NAME>=<KEY_VALUE>`.
- List all kubectl secrets on your system with: `kubectl get secrets`.
- Delete a kubectl secret using: `kubectl delete secret <SECRET_NAME>`.
