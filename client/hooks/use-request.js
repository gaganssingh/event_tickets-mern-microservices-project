import { useState } from "react";
import axios from "axios";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops..</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
