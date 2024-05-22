"use client";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {hasPermission} from "@/app/utils/RoleChecker";
import {usePathname, useRouter} from "next/navigation";
import {useContext, useEffect} from "react";
import FullPageLoader from "../full_page_loader/FullPageLoader";



export default function RoleProtection({children, protectedRoutes, requiredRoles}:
  {children: React.ReactNode, protectedRoutes: string[], requiredRoles: string[]}
) {
  const pathName = usePathname();

  const context = useContext(AuthContext) as AuthContextType;

  const hasAccess = () => {
    if (protectedRoutes.some((route) => pathName.includes(route))) {
      return hasPermission(context.roles, requiredRoles);
    }
    return true;
  }


  useEffect(() => {
    if (!hasAccess()) {
      router.replace("/unauthorized");
    }

  }, [pathName])
  const router = useRouter();


  if (!hasAccess()) {
    return <div className="h-100">
      <FullPageLoader />
    </div>
  }

  return <>
    {children}
  </>

}
