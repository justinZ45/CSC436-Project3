"use client";

import useUser from "../app/hooks/useUser";
import Link from "next/link";
import { getCurrentUser } from "@/utils/data";
import { useEffect, useState } from "react";

const HeaderAction = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const { data } = await getCurrentUser();

      if (data !== null) {
        setName(data.meta.name);
      }
    };
    fetchName();
    console.log(name);
  }, []);

  const { user, loading } = useUser();

  if (loading) {
    return <p>Loading</p>;
  }

  if (!user) {
    // user is not logged in
    return (
      <ul className="mr-auto flex flex-col lg:flex-row " data-te-navbar-nav-ref>
        <li className="mb-4 lg:mb-0 lg:pr-4 " data-te-nav-item-ref>
          {name}
        </li>
        <li className="mb-4 lg:mb-0 lg:pr-4 " data-te-nav-item-ref>
          <Link href="/">Home</Link>
        </li>
        <li className="mb-4 lg:mb-0 lg:pr-4" data-te-nav-item-ref>
          <Link href="/login">Login</Link>
        </li>

        <li className="mb-4 lg:mb-0 lg:pr-4" data-te-nav-item-ref>
          <Link href="/signup">Register</Link>
        </li>

        <li className="mb-4 lg:mb-0 lg:pr-4" data-te-nav-item-ref>
          <Link href="/login">Create</Link>
        </li>

        <li className="mb-4 lg:mb-0 lg:pr-4" data-te-nav-item-ref>
          <Link href="/login">My Lists</Link>
        </li>
      </ul>
    );
  }
  // user is logged in
  return (
    <ul className="mr-auto flex flex-col lg:flex-row" data-te-navbar-nav-ref>
      <div className="mb-4 lg:mb-0 lg:pr-10">{name}</div>
      <li className="mb-4 lg:mb-0 lg:pr-10" data-te-nav-item-ref>
        <Link href="/">Home</Link>
      </li>
      <li className="mb-4 lg:mb-0 lg:pr-10" data-te-nav-item-ref>
        <Link href="/">Login</Link>
      </li>
      <li className="mb-4 lg:mb-0 lg:pr-10" data-te-nav-item-ref>
        <Link href="/">Register</Link>
      </li>

      <li className="mb-4 lg:mb-0 lg:pr-10" data-te-nav-item-ref>
        <Link href="logout">Logout</Link>
      </li>

      <li className="mb-4 lg:mb-0 lg:pr-10" data-te-nav-item-ref>
        <Link href="/list/create">Create</Link>
      </li>

      <li className="mb-4 lg:mb-0 lg:pr-10" data-te-nav-item-ref>
        <Link href={`/user/${user.id}`}>My Lists</Link>
      </li>
    </ul>
  );
};

export default HeaderAction;
