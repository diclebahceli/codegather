import Link from "next/link";
import Navbar from "../navbar/Navbar";

export default function Header() {

  return (
    <header className=" position-sticky sticky-top bg-darker p-3 d-flex flex-row align-items-center justify-content-around w-100 " style={{height: "4.5rem"}}>
      <Link href="/" className="text-white fs-2 text-decoration-none">
        Code Gather
      </Link>
      <Navbar/>


    </header>
  );
}
