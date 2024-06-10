import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {GetUserById} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import FullPageLoader from "../full_page_loader/FullPageLoader";

export default function CompetitionProtected({children, compId}: Readonly<{children: React.ReactNode; compId: string}>) {
  const context = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  const [authrorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (compId != "" && context.user.id !== "") {
      if (!context.user.competitions?.some((comp) => comp.id === compId)) {
        router.replace("/pages/competitions", {scroll: false});
        return;
      }
      setAuthorized(true);
    }


  }, [compId, context])

  if (authrorized) {
    return <>{children}</>;
  }

  return (
    <div className="h-100">
      <FullPageLoader />
    </div>
  )

}
