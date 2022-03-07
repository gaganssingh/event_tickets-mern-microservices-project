## Configure a new service:

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

#### Setup Ingress-Nginx to allow outside-in communication:

11. Install the kubernetes ingress-nginx controller service by running the latest quick start command from the [official installation page](https://kubernetes.github.io/ingress-nginx/deploy/).
12. Create the config file: `infra/k8s/ingress-srv.yaml`
13. Update the hosts file to access the application on a web browser:

- Update the hosts file:
  - MacOS/Linus: /etc/hosts
  - Windows: C:\Windows\System32\drivers\etc\hosts
- Add to the hosts file:
  - 127.0.0.1 ticketing.dev

14. Visit the application on the browser: `ticketing.dev`. If chrome shows an unsafe error, type `thisisunsafe` anywhere on the screen.

### IMPORTANT: Cleanup after finished development

1. Upon termination of the skaffold service, skaffold will automatically cleanup all services, deployments and pods. Nothing to do manually.
2. Delete the hosts assignment from the `...etc/hosts/` file.
