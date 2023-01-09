import axios from "axios";

export const GetData = async () => {
    const response = await fetch(`http://localhost:3000/manga`);
    if (response.ok) {
        return await response.json();
      }
      throw new Error("something went wrong");
}