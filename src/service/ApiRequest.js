import axios from "axios";

const BASE_REQUEST_URL = `http://localhost:3000/manga/`;

export const GetData = () => {
  return axios
    .get(BASE_REQUEST_URL)
    .then((res) => res.data)
    .catch((err) => console.warn(err));
};

export const GetDataID = ({ id }) => {
  return axios
    .get(BASE_REQUEST_URL`${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.warn(err));
};

export const CreateData = (payload) => {
  return axios
    .post(BASE_REQUEST_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((res) => res.data)
    .catch((err) => console.warn(err));
};

export const UpdateData = (payload) => {
  return axios
    .put(BASE_REQUEST_URL`${payload.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const DeleteData = (payload) => {
  return axios
    .delete(BASE_REQUEST_URL`${payload.id}`)
    .then((res) => res.data)
    .catch((err) => err.data);
};
