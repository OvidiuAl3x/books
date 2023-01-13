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
    .then((res) => res.data)
    .catch((err) => console.warn(err));
};

export const CreateData = async (payload) => {
  const response = await fetch(BASE_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong");
};

// Update Product
export const UpdateData = async (payload) => {
  const response = await fetch(BASE_REQUEST_URL`${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong");
};

// Delete Product
export const DelteData = async (id) => {
  const response = fetch(BASE_REQUEST_URL`${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong");
};
