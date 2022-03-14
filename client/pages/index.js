import { buildClient } from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser", currentUser);

  return <h1>LandingPage</h1>;
};

LandingPage.getInitialProps = async (context) => {
  // context is the default first obj received by .getInitialProps()
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
