import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const register = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let header = {
        "Content-Type": "application/json",
      };
      let response = await axios.post(`${BACKEND_URL}/register`, data, {
        headers: header,
      });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const signIn = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let header = {
        "Content-Type": "application/json",
      };
      let response = await axios.post(`${BACKEND_URL}/signin`, data, {
        headers: header,
      });
      return resolve(response.data);
    } catch (err) {
      return reject(err);
    }
  });
};
