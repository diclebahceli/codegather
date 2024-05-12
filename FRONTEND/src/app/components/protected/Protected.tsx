'use client';
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import FullPageLoader from "../full_page_loader/FullPageLoader";

export default function Protected({children, protectedRoutes}:
  Readonly<{children: React.ReactNode, protectedRoutes: string[]}>) {

  const [tokn, setToken] = useState<string>();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const token = getWithExpiry("userId");
    if (token === null) {
      if (!protectedRoutes.some((route) => pathName.includes(route))){
        router.replace("/pages/login", {scroll: false})
        return;

      }
    }
    else {
      if(pathName === "/pages/login" || pathName === "/pages/register"){
        router.replace("/", {scroll: false})
        return;
      }
      setToken(token);
    }


  }, [pathName])

  if (tokn === undefined && protectedRoutes.some((route) => pathName.includes(route))) {
    return (
      <div className="h-100">
        <FullPageLoader />
      </div>
    )
  }
  return <>
    {children}
  </>;
}
