import axios from "axios";

export const buildClient = ({ req }) => {
  // Check if the request is being made from the browser or the server
  if (typeof window === "undefined") {
    // Case: request being made from the server
    const baseURL =
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";

    return axios.create({
      baseURL,
      headers: req.headers,
    });
  } else {
    // Case: request being made from the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
