import { useEffect } from "react";
import { useRequest } from "../../hooks/use-request";

const Signout = () => {
  const { doRequest, error } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Request.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing out...</div>;
};

export default Signout;
