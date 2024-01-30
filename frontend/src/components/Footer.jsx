import React from "react";
import { Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-slate-300 mt-10 mb-0">
      <div className="flex flex-wrap justify-around mb-5  lg:px-5 lg:pt-5 ">
        <div>
          <div className="flex flex-col flex-wrap justify-center items-center lg:items-start text-center lg:text-justify max-w-[35em] mb-5">
            <Link
              to="/"
              className="flex items-center flex-wrap gap-3 mr-10 w-fit"
            >
              <ImBooks className="text-5xl text-blue-800" />
              <p className="text-xl font-bold">BookBreeze</p>
            </Link>

            <p className="text-balance">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              quisquam amet fugiat, at id mollitia explicabo non provident atque
              nihil impedit consequatur corrupti sed vitae beatae nostrum quos
              voluptatum fuga!
            </p>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start">
            <p className="font-bold">Follow Us</p>
            <div className="flex text-4xl gap-3">
              <FaFacebookSquare className="cursor-pointer m-2 p-1 rounded-md text-blue-700 hover:bg-blue-300 duration-300" />
              <FaInstagram className="cursor-pointer m-2 p-1 rounded-md text-rose-500 hover:bg-rose-300  duration-300" />
              <FaLinkedin className="cursor-pointer m-2 p-1 rounded-md text-blue-800 hover:bg-blue-300 duration-300" />
              <FaYoutube className="cursor-pointer m-2 p-1 rounded-md text-red-600 hover:bg-red-300 duration-300" />
              <FaTwitter className="cursor-pointer m-2 p-1 rounded-md text-blue-500  hover:bg-blue-300 duration-300" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-lg font-medium">Quick Links</p>
          <div className="flex gap-5 md:flex-col flex-wrap">
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Books</p>
            <p>Login</p>
            <p>Sign Up</p>
            <p>FAQ</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-t-2 border-blue-400">
        <p className="py-2 px-5">
          Books Website &copy; 2023 All Rights Reserved
        </p>
        <p className="py-2 px-5">Made by Ovidiu Ciobanu</p>
      </div>
    </div>
  );
}

export default Footer;
