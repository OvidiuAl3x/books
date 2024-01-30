import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import DeleteBook from "../components/DeleteBook";

const useStyles = {
  root: {
    "& .MuiDataGrid-window": {
      scrollbarColor: "darkgray darkgray", // scrollbar color (for Firefox)
      scrollbarWidth: "thin", // scrollbar width (for Firefox)
      "&::-webkit-scrollbar": {
        width: "12px", // scrollbar width (for WebKit browsers)
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "darkgray", // thumb color
        borderRadius: "6px", // thumb border radius
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "lightgray", // track color
      },
    },
  },
};

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then(async (res) => {
        const booksWithCategories = await Promise.all(
          res.data.data.map(async (book, index) => {
            const categoryDetailsArray = await Promise.all(
              (book.categories || []).map(async (categoryId) => {
                return await getCategoryDetails(categoryId);
              })
            );

            const categoryNames = categoryDetailsArray
              .map((categoryDetails) => categoryDetails.name)
              .join(", ");

            return {
              ...book,
              id: index + 1, // Assuming your book has _id
              category: categoryNames || "Uncategorized",
            };
          })
        );

        setBooks(booksWithCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getCategoryDetails = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/categories/${categoryId}`
      );
      return response.data; // Assuming your category details are returned here
    } catch (error) {
      console.error("Error fetching category details:", error.message);
      return {};
    }
  };

  const handleDelete = () => {
    window.location.reload(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "image",
      headerName: "Book Cover",
      width: 150,
      renderCell: (params) => (
        <img
          src={
            params.value
              ? `http://localhost:5555/uploads/${params.value}`
              : "https://placehold.co/200x200.png"
          }
          alt="Book Cover"
          className="max-w-[100%] h-auto hover:scale-150 duration-300"
        />
      ),
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "publishYear", headerName: "Publish Year", width: 100 },
    { field: "category", headerName: "Category", width: 250 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
      valueGetter: (params) =>
        format(new Date(params.row.createdAt), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 250,
      valueGetter: (params) =>
        format(new Date(params.row.updatedAt), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center gap-x-4">
          <Link to={`/books/details/${params.row._id}`}>
            <BsInfoCircle className="text-2xl text-green-800 hover:scale-125 duration-300" />
          </Link>
          <Link to={`/books/edit/${params.row._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600 hover:scale-125 duration-300" />
          </Link>
          <DeleteBook bookId={params.row._id} onDelete={handleDelete} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="text-center">
        <h1 className="text-3xl my-8">Books Table</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full sm:w-[85%] m-auto">
          <div className="flex">
            <Link to="/books/create" className="ml-auto">
              <MdOutlineAddBox className="text-sky-800 text-4xl hover:scale-110 duration-300" />
            </Link>
          </div>

          <DataGrid
            rows={books}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
            disableSelectionOnClick
          />
        </div>
      )}
    </div>
  );
};

export default BooksTable;
