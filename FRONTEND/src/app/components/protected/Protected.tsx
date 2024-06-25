'use client';
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {usePathname, useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import FullPageLoader from "../full_page_loader/FullPageLoader";
import RoleProtection, {RoleRouteConstraint} from "../role_protection/RoleProtection";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";
import {GetUserRoles, GetUserById} from "@/app/services/UserService";

export default function Protected({children, protectedRoutes}:
  Readonly<{children: React.ReactNode, protectedRoutes: string[]}>) {

  const [tokn, setToken] = useState<string>();
  const router = useRouter();
  const pathName = usePathname();
  const context = useContext(AuthContext) as AuthContextType;
  const id = getWithExpiry("userId");

  useEffect(() => {
    const token = getWithExpiry("userId");
    if (token === null) {
      if (protectedRoutes.some((route) => pathName.includes(route))) {
        router.replace("/pages/login", {scroll: false})
        return;
      }
    }
    else {
      if (pathName === "/pages/login" || pathName === "/pages/register") {
        router.replace("/", {scroll: false})
        return;
      }
      setToken(token);
    }

    if (context.roles === undefined || context.roles.length === 0) {
      fetchRoles();
    }
    fetchUser();


  }, [pathName, context])

  const fetchUser = async () => {
    if (!id) return;

    // if user is already set, no need to fetch again
    if (context.user.userName !== "") {
      return;
    }
    // fetch user
    try {
      const user = await GetUserById(id);
      if (user.error || !user.data) {
        localStorage.clear();
        toast.error(user.error);
        return;
      }
      context.setTheUser(user.data);
    } catch (e: Error | any) {
      toast.error(e);
    }
  };

  const fetchRoles = async () => {
    if (!id) return;
    if (context.roles !== undefined && context.roles.length > 0) return;
    try {
      const result = await GetUserRoles(id);
      if (result.error || !result.data) {
        toast.error(result.error);
        return;
      }

      context.setTheRoles(result.data);
    } catch (e: Error | any) {
      toast.error(e);
    }
  };


  const constraints: RoleRouteConstraint[] = [
    {
      protectedRoutes: ["/admin/user"],
      requiredRoles: ["Admin"]
    },
    {
      protectedRoutes: ["/admin/dashboard"],
      requiredRoles: ["Admin", "Manager"]
    },
    {
      protectedRoutes: ["/admin/competition"],
      requiredRoles: ["Admin", "Manager"]
    }


  ];

  if (tokn === undefined && protectedRoutes.some((route) => pathName.includes(route))) {
    return (
      <div className="h-100">
        <FullPageLoader />
      </div>
    )
  }


  else {
    return <>
      <RoleProtection constraints={constraints}>
        {children}

      </RoleProtection>
    </>;

  }
}
