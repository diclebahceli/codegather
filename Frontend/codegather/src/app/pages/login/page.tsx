"use client";
// pages/LoginPage.js
import React from "react";
import InputField from "../../components/input_field/InputField";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Header from "@/app/components/header/Header";
import styles from "./page.module.css";

const login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //event.preventDefault();
    // Form submission logic...
  };

  return (
    <div className="flex-col">
      <div className="row-5">
        <Header />
      </div>

      <div className="d-flex justify-content-center align-items-center text-center vh-100 bg-black row-10">
        <div className="d-flex flex-row align-items-center justify-content-center h-75">
          <div className="col me-5">
            <h1 className="display-1 fw-bold text-light">Welcome </h1>
            <h1 className="display-1 fw-bold m-2 p-2 text-end text-light">
              Back{" "}
            </h1>
          </div>
          <div className="col h-75">
            <Card>
              <div className="pt-5">
                <h2 className="fw-bold fs-2 mb-3">Login</h2>
                <div className={styles.input}>
                  <InputField type="text" name="email" label="email" />
                </div>
                <div className={styles.input}>
                  <InputField
                    type="password"
                    name="floatingPassword"
                    label="Password"
                  />
                </div>

                <div className="m-3">
                  <Button>
                    <span>Login</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
