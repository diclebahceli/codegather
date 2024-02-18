"use client";
// pages/LoginPage.js
import React from "react";
import InputField from "../../components/input_field/InputField";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Header from "@/app/components/header/Header";

const login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //event.preventDefault();
    // Form submission logic...
  };

  return (
    <div>
      <Header />
      <div className="container text-center">
        <div className=" d-flex flex-row align-items-center h-100">
          <div className="col">
            <h1>Welcome Back</h1>
          </div>
          <div className="col">
            <Card>
              <h2>Login</h2>
              <InputField type="text" name="username" label="Username" />
              <InputField type="password" name="password" label="Password" />
              <Button>
                <span>Login</span>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
