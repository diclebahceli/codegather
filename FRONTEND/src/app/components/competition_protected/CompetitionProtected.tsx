import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {getUserById} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import FullPageLoader from "../full_page_loader/FullPageLoader";

export default function CompetitionProtected({children, compId}: Readonly<{children: React.ReactNode; compId: string}>) {
  const context = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  const [authrorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(getWithExpiry("userId") as string);
      if (user.error || !user.data) {
        toast.error(user.error);
        return;
      }
      context.setTheUser(user.data);
    };


    if (context.user.userName === "")
      fetchUser();

    if (compId != "" && context.user.id !== "") {
      if (!context.user.competitions?.some((comp) => comp.id === compId)) {
        router.replace("/pages/ongoingCompetitions", {scroll: false});
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
