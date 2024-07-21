import { Sidebar } from "flowbite-react";
import React from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
} from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  });

  const handleSignOut = async () => {
    dispatch(signoutUserStart());
    try {
      const res = await fetch("api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signoutUserFailure());
        console.log(data.message);
      } else {
        dispatch(signoutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
