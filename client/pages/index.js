import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);

  return <h1>LandingPage</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // Making requests from the server
    const baseUrl =
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";
    const { data } = await axios.get(`${baseUrl}/api/users/currentuser`, {
      headers: req.headers,
    });
    return data;
  } else {
    // Making requests from the browser
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
};

export default LandingPage;
