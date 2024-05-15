// pages/LoginPage.js
import React from "react";
import Card from "../../components/card/Card";
import LoginForm from "./components/login_form/LoginForm";
import Image from "next/image";
import image from "./../../assets/2.png";

export default function LoginPage() {
  return (
    <div className="position-fixed h-100 w-100">
      <div className="d-flex justify-content-center align-items-center text-center vh-100 ">
        <div className="d-flex flex-row align-items-center justify-content-evenly h-75 col-10">
          <div className="">
            <h1 className="display-1 fw-bold text-white fs-l">Welcome </h1>
            <h1 className="display-1 fw-bold m-2 p-2 text-end text-white ">
              Back
            </h1>
          </div>
          <Image
            alt="login background image"
            src={image}
            layout="fill"
            objectFit="cover"
            className=" z-n1"
          ></Image>
          <div className="col-3">
            <Card>
              <div className="pt-5 d-flex flex-column justify-content-center h-100">
                <h2 className="fw-bold fs-2 mb-3 text-white">Login</h2>
                <LoginForm />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
