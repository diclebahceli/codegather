import Link from "next/link";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import image from "./../../assets/6.png";

export default function Header() {
  return (
    <header
      className=" position-sticky sticky-top bg-darker p-3 d-flex flex-row align-items-center justify-content-around w-100 "
      style={{ height: "4.5rem" }}
    >
      <div className=" d-flex flex-row justify-content-center align-items-center">
        <Image alt="" src={image} width={100} height={100}></Image>
        <Link href="/" className="text-white fs-3 text-decoration-none ">
          Code Gather
        </Link>
      </div>
      <Navbar />
    </header>
  );
}
