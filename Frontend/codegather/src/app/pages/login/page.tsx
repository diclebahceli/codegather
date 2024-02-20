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
    <div>
      <Header />
      <div className="d-flex align-items-center  vh-100">
        <div
          className="container text-center vh-100 "
          style={{ margin: "30% 0 0 0" }}
        >
          <div className="d-flex flex-row align-items-center ">
            <div className="col">
              <h1 className="display-1 fw-bold ">Welcome </h1>
              <h1 className="display-1 fw-bold m-2 p-2 text-end ">Back </h1>
            </div>
            <div className="col">
              <div className={styles.card}>
                <Card>
                  <h2>Login</h2>
                  <div className={styles.input}>
                    <InputField type="text" name="username" label="Username" />
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
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
