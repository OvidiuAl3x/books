import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

function Filter({
  setSearch,
  authorParams,
  setAuthorParams,
  categoriesParams,
  setCategoriesParams,
  publishYearParams,
  setPublishYearParams,
}) {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Fetch books data
    axios
      .get(`http://localhost:5555/books`)
      .then(async (res) => {
        const bookData = await res.data.data;
        setData(bookData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch categories data
    axios
      .get(`http://localhost:5555/categories`)
      .then(async (res) => {
        const categoryData = await res.data.data;
        setCategory(categoryData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckboxChange = (paramArray, setParam, value) => {
    const updatedParams = [...paramArray];
    const index = updatedParams.indexOf(value);

    if (index !== -1) {
      updatedParams.splice(index, 1);
    } else {
      updatedParams.push(value);
    }

    setParam(updatedParams);
  };

  const handleCategoryChange = (categoryId) => {
    handleCheckboxChange(categoriesParams, setCategoriesParams, categoryId);
  };

  const handleYearChange = (year) => {
    handleCheckboxChange(publishYearParams, setPublishYearParams, year);
  };

  const handleAuthorChange = (author) => {
    handleCheckboxChange(authorParams, setAuthorParams, author);
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearchDebounced = debounce((value) => {
    setSearch(value);
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearchDebounced(value);
  };

  return (
    <div className="flex flex-col bg-slate-300 rounded-xl px-10 py-2 max-w-[300px] h-fit ml-2">
      <div className="flex items-center bg-white rounded-xl p-2 gap-2">
        <CiSearch />
        <input
          type="text"
          placeholder="Search"
          className="outline-none"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mt-2 flex flex-col gap-5">
        <div>
          <p className="font-semibold">Category</p>
          <div className="max-h-[200px] overflow-auto flex flex-col">
            {category.map((item) => (
              <label key={item._id}>
                <input
                  type="checkbox"
                  value={item._id}
                  className="mr-2"
                  onChange={() => handleCategoryChange(item._id)}
                  checked={categoriesParams.includes(item._id)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Author</p>
          <div className="max-h-[200px] overflow-auto flex flex-col">
            {Array.from(new Set(data.map((item) => item.author)))
              .sort((a, b) => a.localeCompare(b))
              .map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={item}
                    className="mr-2"
                    name="author"
                    onChange={() => handleAuthorChange(item)}
                    checked={authorParams.includes(item)}
                  />
                  {item}
                </label>
              ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Publish Year</p>
          <div className="max-h-[200px] overflow-auto flex flex-col">
            {Array.from(new Set(data.map((item) => item.publishYear)))
              .sort((a, b) => b - a)
              .map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={item}
                    className="mr-2"
                    onChange={() => handleYearChange(item)}
                    checked={publishYearParams.includes(item)}
                  />
                  {item}
                </label>
              ))}
          </div>
        </div>
        <div>
          <p className="font-semibold"></p>
        </div>
      </div>
    </div>
  );
}

export default Filter;
