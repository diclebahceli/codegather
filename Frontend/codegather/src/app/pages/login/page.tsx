"use client";
// pages/LoginPage.js
import React from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Card from '../../components/Card';

const login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //event.preventDefault();
    // Form submission logic...
  };

  return (
    <div>
      <h2>Login</h2>
      <Card>
          <InputField type="text" name="username" label="Username" />
          <InputField type="password" name="password" label="Password" />
          <Button >
            Login
          </Button>
      </Card>
    </div>
  );
};

export default login;
