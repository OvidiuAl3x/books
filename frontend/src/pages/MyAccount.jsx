import React, { useState } from "react";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Account from "../components/Account";
import ChangePassword from "../components/ChangePassword";

const Page_Account = "account";
const Page_Password = "password";

function MyAccount() {
  const [page, setPage] = useState(Page_Account);

  return (
    <div className="flex items-center justify-center m-auto h-[80vh] gap-[10em]">
      <div>
        <div className="mb-10 flex items-center flex-col">
          <img
            src="https://placehold.co/150x150/png"
            alt=""
            className="rounded-full"
          />
          <p className="text-center text-2xl ">Username</p>
        </div>
        <div>
          <div
            className="flex items-center gap-2 m-2 p-2 bg-zinc-300 cursor-pointer hover:translate-x-2 duration-300 w-[250px]"
            onClick={() => setPage(Page_Account)}
          >
            <FaUser className="text-lg" />
            <p className="text-lg">Account</p>
            <FaArrowRight className="ml-auto" />
          </div>
          <div
            className="flex items-center gap-2 m-2 p-2 bg-zinc-300 cursor-pointer hover:translate-x-2 duration-300"
            onClick={() => setPage(Page_Password)}
          >
            <FaLock className="text-lg" />
            <p className="text-lg">Change Password</p>
            <FaArrowRight className="ml-auto" />
          </div>
          <div className="flex items-center gap-2 m-2 p-2 bg-zinc-300 cursor-pointer hover:translate-x-2 duration-300">
            <MdDelete className="text-xl" />
            <p className="text-lg">Delete Account</p>
            <FaArrowRight className="ml-auto" />
          </div>
        </div>
      </div>

      {/* Page Account */}
      {page === Page_Account && <Account />}

      {/* Page Password */}
      {page === Page_Password && <ChangePassword />}
    </div>
  );
}

export default MyAccount;
