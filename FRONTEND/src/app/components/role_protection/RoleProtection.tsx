"use client";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {hasPermission} from "@/app/utils/RoleChecker";
import {usePathname, useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import FullPageLoader from "../full_page_loader/FullPageLoader";


export interface RoleRouteConstraint {
  protectedRoutes: string[];
  requiredRoles: string[];
}

export default function RoleProtection({children, constraints}:
  {children: React.ReactNode, constraints: RoleRouteConstraint[]}
) {
  const pathName = usePathname();
  const router = useRouter();

  const context = useContext(AuthContext) as AuthContextType;

  const hasAccess = () => {
    const constraint =
      constraints.find((constraint) => constraint.protectedRoutes.some((route) => pathName.includes(route)));
    if (constraint != undefined) {
      return hasPermission(context.roles, constraint.requiredRoles)
    }
    return true;
  }
  useEffect(() => {
    if (!hasAccess() && context.user.id !== "") {
      router.replace("/unauthorized");
    }

  }, [pathName, context])


  if (!hasAccess()) {
    return <div className="h-100">
      <FullPageLoader />
    </div>
  }

  return <>
    {children}
  </>

}
