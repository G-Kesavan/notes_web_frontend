import React from "react";
import { initialOfName } from "../../utils/helper";

const Profile = ({ LogOut, userInfo }) => {
  return (
    <div className="flex gap-2 items-center justify-center z-0">
      <div className="p-0.5 z-0 overflow-hidden rounded-full">
        <div className="bg-blue-200 p-2 h-[5vh] w-[5vh] flex relative items-center justify-center rounded-full before:content-[''] before:flex before:absolute before:animate-spin before:rounded-2xl before:h-[100%] before:w-[120%] before:bg-gradient-to-t before:from-transparent before:via-blue-800 before:to-transparent before:z-[-1]">
          <h1>{initialOfName(userInfo?.fullName)}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-cente px-2.5">
        <p>{userInfo?.fullName}</p>
        <button className="underline cursor-pointer" onClick={LogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
