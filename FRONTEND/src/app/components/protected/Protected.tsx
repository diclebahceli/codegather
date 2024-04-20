import {getWithExpiry} from "@/app/utils/StorageGetter";
import {redirect} from "next/navigation";

export default function Protected({children}: Readonly<{children: React.ReactNode}>) {
  if (getWithExpiry("accessToken") === null) {
    redirect("/pages/login")
  }

  return (
    <div className="h-100 bg-dark">
      {children}
    </div>
  );
}
