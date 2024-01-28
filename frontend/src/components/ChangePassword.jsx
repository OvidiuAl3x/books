import React from "react";
import { FaLock } from "react-icons/fa";

function ChangePassword() {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex items-center justify-center font-bold mb-10 gap-2">
        <FaLock className="text-xl" />
        <h1 className="text-2xl">Change Password</h1>
      </div>
      <div className="flex flex-col gap-6">
        <label className="flex flex-col">
          Old Password
          <input
            type="passoword"
            className="outline-none border-2 border-zinc-300 px-2 py-2 w-[300px]"
          />
        </label>
        <label className="flex flex-col">
          New Password
          <input
            type="passoword"
            className="outline-none border-2 border-zinc-300 px-2 py-2 w-[300px]"
          />
        </label>
        <label className="flex flex-col">
          Confirm New Password
          <input
            type="password"
            className="outline-none border-2 border-zinc-300 px-2 py-2 w-[300px]"
          />
        </label>
        <button
          type="submit"
          className="w-fit bg-zinc-300  mx-auto my-5 p-2 rounded-lg hover:-translate-y-2 duration-300"
        >
          Update Password
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
