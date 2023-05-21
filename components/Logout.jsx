"use client";

import { useRouter } from "next/navigation";
import { logout } from "../utils/data";
import { useEffect, useState } from "react";

const Logout = () => {
  const [error, setError] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    const innerLogout = async () => {
      const { success, error } = await logout();
      if (!success) {
        setError(error.message);
      }
      setTimeout(() => router.replace("/"), error ? 4000 : 2000);
    };
    innerLogout();
  }, []);

  return (
    <div className="my-10">
      <h3 className="my-10 h3 text-4xl text-center font-extrabold">
        Logging out, please wait...
      </h3>
      ;{error && <p style={{ color: "#C20000" }}>Error: {error}</p>}
    </div>
  );
};

export default Logout;
