import React from "react";
import { IoIosSettings } from "react-icons/io";

function Account() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center font-bold mb-10 gap-2">
        <IoIosSettings className="text-xl" />
        <h1 className="text-2xl">Account</h1>
      </div>
      <div className="flex flex-col gap-6">
        <label className="flex flex-col">
          Username
          <input
            type="text"
            placeholder="username"
            className="outline-none border-2 border-zinc-300 px-2 py-2 w-[300px]"
          />
        </label>
        <label className="flex flex-col">
          First Name
          <input
            type="text"
            placeholder="First Name"
            className="outline-none border-2 border-zinc-300 px-2 py-2 w-[300px]"
          />
        </label>
        <label className="flex flex-col">
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            className="outline-none border-2 border-zinc-300 px-2 py-2 w-[300px]"
          />
        </label>
        <button
          type="button"
          className="w-fit bg-zinc-300  mx-auto my-5 p-2 rounded-lg hover:-translate-y-2 duration-300"
        >
          Update Account
        </button>
      </div>
    </div>
  );
}

export default Account;
