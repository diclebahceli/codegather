"use client";

import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {Logout} from "@/app/services/AuthService";
import {getUserById} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Navbar() {

  const path = usePathname();
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const context = useContext(AuthContext) as AuthContextType;


  useEffect(() => {
    const id = getWithExpiry("userId");
    setUserId(id as string);
  }, [path])

  const handleLogout = async () => {
    const user = await getUserById(userId)
    if (user.error || !user.data) {
      toast.error(user.error)
      return;
    }
    const result = await Logout(user.data.email)
    if (result.error) {
      toast.error(result.error)
      return;
    }
    router.replace("/pages/login", {scroll: false});
  }

  return (
    <div>
      {userId ? (
        <div className="d-flex flex-row align-items-center">
          {context.role === "Admin" ?
            <Link href={"/pages/admin"} scroll={false} className="text-white text-decoration-none mx-2 fs-5">Admin</Link>
            : null}
          <Link href={`/pages/ongoingCompetitions`} scroll={false} className="text-white text-decoration-none mx-4 fs-5">Ongoing Competitions</Link>
          <Link href={`/pages/profile/${userId}`} scroll={false} className="text-white text-decoration-none mx-4 fs-5">Profile</Link>
          <Link href={"#"} onClick={handleLogout} className="text-white text-decoration-none mx-4 fs-5">Logout</Link>
        </div>

      ) : (
        <Link href={"/pages/login"} scroll={false} className="text-white text-decoration-none mx-4 fs-5">Login</Link>

      )}

    </div>
  );

}
