import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DeleteBook = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const result = await Swal.mixin({
        customClass: {
          confirmButton:
            "border-2 bg-green-500 text-white py-[5px] px-[10px] ml-1 rounded-md",
          cancelButton:
            "border-2 bg-red-500 text-white py-[5px] px-[10px] mr-1 rounded-md",
        },
        buttonsStyling: false,
      }).fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:5555/books/${bookId}`, {
          method: "DELETE",
        });

        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your book has been deleted.",
            icon: "success",
          }).then(() => {
            onDelete();
          });
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your book is safe :)",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <MdOutlineDelete
      className="text-2xl text-red-600 cursor-pointer hover:scale-125 duration-300"
      onClick={handleDelete}
    />
  );
};

export default DeleteBook;
