import React from "react";
import Card from "../../components/card/Card";
import {RegisterForm} from "./components/register_form/RegisterForm";

export default function Register() {
  return (
    <div className="position-fixed w-100 h-100">
      <div className="d-flex justify-content-center align-items-center text-center vh-100 bg-dark ">
        <div className="d-flex flex-row align-items-center justify-content-evenly h-75 col-10">
          <div className="me-5">
            <h1 className="display-1 fw-bold text-white fs-xl">Join </h1>
            <h1 className="display-1 fw-bold m-2 p-2 text-end text-white">
              Us{" "}
            </h1>
          </div>
          <div className="col-3">
            <Card >
              <div className="pt-5 d-flex flex-column justify-content-center h-100">
                <h2 className="fw-bold fs-2 mb-3 text-white">Register</h2>
                <RegisterForm />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};
