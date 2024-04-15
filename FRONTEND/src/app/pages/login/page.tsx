// pages/LoginPage.js
import React from "react";
import Card from "../../components/card/Card";
import LoginForm from "./components/login_form/LoginForm";

export default function LoginPage() {

  return (
    <div className="flex-col">
      <div className="d-flex justify-content-center align-items-center text-center vh-100 bg-dark row-10">
        <div className="d-flex flex-row align-items-center justify-content-center h-75">
          <div className="col me-5">
            <h1 className="display-1 fw-bold text-white">Welcome </h1>
            <h1 className="display-1 fw-bold m-2 p-2 text-end text-white">
              Back{" "}
            </h1>
          </div>
          <div className="col h-75">
            <Card >
              <div className="pt-5">
                <h2 className="fw-bold fs-2 mb-3">Login</h2>
                <LoginForm/>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};
