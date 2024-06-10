"use client";

import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {User} from "@/app/models/User";
import {Logout} from "@/app/services/AuthService";
import {GetUserRoles, GetUserById} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const path = usePathname();
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const context = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const id = getWithExpiry("userId");
    setUserId(id as string);
    setUserName(context.user.userName)

  }, [path, context.user.userName]);
  //for editing the user and renaming

  const handleLogout = async () => {
    const result = await Logout(context.user.email);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    context.logout();
    router.replace("/pages/login", {scroll: false});
  };

  return (
    <div>
      {userId ? (
        <div className="d-flex flex-row align-items-center">
          {context.roles !== undefined && context.roles.includes("Admin") || context.roles.includes("Manager") ? (
            <Link
              href={"/pages/admin/dashboard"}
              scroll={false}
              className="text-white text-decoration-none mx-4 fs-5"
            >
              Admin
            </Link>
          ) : null}
          <Link
            href={`/pages/competitions`}
            scroll={false}
            className="text-white text-decoration-none mx-4 fs-5"
          >
            Competitions
          </Link>
          <Link
            href={`/pages/myCompetitions`}
            scroll={false}
            className="text-white text-decoration-none mx-4 fs-5"
          >
            My Competitions
          </Link>
          <Link
            href={`/pages/profile/${userName}`}
            scroll={false}
            className="text-white text-decoration-none mx-4 fs-5"
          >
            Profile
          </Link>
          <Link
            href={"#"}
            onClick={handleLogout}
            className="text-white text-decoration-none mx-4 fs-5"
          >
            Logout
          </Link>
        </div>
      ) : (
        <Link
          href={"/pages/login"}
          scroll={false}
          className="text-white text-decoration-none mx-4 fs-5"
        >
          Login
        </Link>
      )}
    </div>
  );
}
