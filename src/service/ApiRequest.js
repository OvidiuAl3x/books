import axios from "axios";

const BASE_REQUEST_URL = `http://localhost:3000/books`;

export const GetData = () => {
  return axios
    .get(BASE_REQUEST_URL)
    .then((res) => res.data)
    .catch((err) => console.warn(err));
};


export const GetDataID = async (id) => {
  const response = await fetch(`http://localhost:3000/books/${id}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error("something went wrong");
};

export const CreateData = async (payload) => {
  const response = await fetch(`http://localhost:3000/books`, {
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
  const response = await fetch(`http://localhost:3000/books/${payload.id}`, {
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
export const DeleteData = async (id) => {
  const response = fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error("Something went wrong");
};


export const GetDataGenres = () => {
  return axios
    .get('http://localhost:3000/genres')
    .then((res) => res.data)
    .catch((err) => console.warn(err));
};