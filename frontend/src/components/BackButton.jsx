import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <BsArrowLeft className="text-2xl" />
    </div>
  );
}

export default BackButton;
